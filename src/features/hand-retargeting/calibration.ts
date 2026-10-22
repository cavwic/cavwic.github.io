/** Multi-frame morphology calibration. Dimensions are MediaPipe estimates, not metrology. */
import { landmarkChains, modelKinematicsId, normalizeLandmarks, robotModel, type Handedness, type Vec3 } from './engine.ts';

export const calibrationPhases = ['open', 'fist', 'pinch'] as const;
export type CalibrationPhase = typeof calibrationPhases[number];
export type CalibrationProvenance = 'camera' | 'imported' | 'synthetic';
type PhaseValues<T> = Record<CalibrationPhase, T>;

export interface CalibrationProfile {
  version: 2;
  /** Includes thumb-chain and palm-coordinate semantics, not just link lengths. */
  modelId: string;
  name: string;
  createdAt: string;
  provenance: CalibrationProvenance;
  handedness: Handedness;
  palmWidthM: number;
  referencePalmWidthM: number;
  normalizationScale: number;
  fingerScales: number[];
  rawMedianFingerLengthsM: number[];
  rawMedianBoneLengthsM: number[];
  targetFingerLengthsM: number[];
  /** Wrist-relative, canonical palm coordinates at the fixed multi-frame scale. */
  openPose: Vec3[];
  closedPose: Vec3[];
  pinchPose: Vec3[];
  openFingerCurlRad: number[];
  closedFingerCurlRad: number[];
  pinchGapM: number;
  sampleCounts: PhaseValues<number>;
  quality: {
    palmWidthRelativeMad: number;
    boneLengthRelativeMad: number[];
    phaseSpanMs: PhaseValues<number>;
    rejectedFrames: number;
  };
}

export class CalibrationError extends Error {
  readonly code: string;
  readonly diagnostics: unknown;
  constructor(code: string, message: string, diagnostics?: unknown) {
    super(message);
    this.name = 'CalibrationError';
    this.code = code;
    this.diagnostics = diagnostics;
  }
}

export interface CalibrationPhaseStatus {
  phase: CalibrationPhase;
  acceptedFrames: number;
  requiredFrames: number;
  rejectedFrames: number;
  ready: boolean;
  lastReason: string;
}
export interface CalibrationFrameResult {
  accepted: boolean;
  code: string;
  reason: string;
  status: CalibrationPhaseStatus;
}
export interface CalibrationSessionOptions {
  name: string;
  provenance: CalibrationProvenance;
  handedness?: Handedness;
  minFramesPerPhase?: number;
  /** Supplying an ISO date makes synthetic regression fixtures reproducible. */
  createdAt?: string;
}
interface Frame {
  time: number;
  raw: Vec3[];
  palmWidth: number;
  bones: number[];
}

const MIN_FRAMES = 20;
const MIN_SPAN_MS = 250;
const MAX_FRAMES = 240;
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
const norm = (a: Vec3) => Math.hypot(...a);
const distance = (a: Vec3, b: Vec3) => norm(sub(a, b));
const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b), mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
const mad = (values: number[], center = median(values)) => median(values.map(v => Math.abs(v - center)));
const phaseObject = <T>(make: () => T): PhaseValues<T> => ({ open: make(), fist: make(), pinch: make() });
const isHand = (value: unknown): value is Handedness => value === 'Left' || value === 'Right';
const isSource = (value: unknown): value is CalibrationProvenance => typeof value === 'string' && ['camera', 'imported', 'synthetic'].includes(value);
const isPhase = (value: unknown): value is CalibrationPhase => calibrationPhases.includes(value as CalibrationPhase);
const isFinitePoints = (value: unknown): value is Vec3[] => Array.isArray(value) && value.length === 21
  && Array.from(value).every(p => Array.isArray(p) && p.length === 3
    && Array.from(p).every(v => typeof v === 'number' && Number.isFinite(v)));
const boneLengths = (p: Vec3[]) => landmarkChains.flatMap(c => [0, 1, 2].map(i => distance(p[c[i]], p[c[i + 1]])));
const fingerLengths = (bones: number[]) => [0, 1, 2, 3, 4].map(f => bones.slice(f * 3, f * 3 + 3).reduce((a, b) => a + b, 0));
const angle = (a: Vec3, b: Vec3) => Math.acos(Math.max(-1, Math.min(1,
  a.reduce((sum, v, i) => sum + v * b[i], 0) / (norm(a) * norm(b)))));
const curls = (p: Vec3[]) => landmarkChains.map(c => {
  const v = [0, 1, 2].map(i => sub(p[c[i + 1]], p[c[i]]));
  return angle(v[0], v[1]) + angle(v[1], v[2]);
});
const extensions = (p: Vec3[], lengths: number[]) => landmarkChains.map((c, f) => distance(p[c[0]], p[c[3]]) / lengths[f]);
const validIsoDate = (value: unknown): value is string => typeof value === 'string'
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
const reject = (code: string, message: string, diagnostics?: unknown): never => { throw new CalibrationError(code, message, diagnostics); };

function inspectFrame(points: unknown, handedness: unknown): Frame {
  if (!isHand(handedness)) return reject('INVALID_HANDEDNESS', '需要明确的 Left 或 Right 手别。');
  if (!isFinitePoints(points)) return reject('INVALID_LANDMARKS', '需要 21 个有限的三维 world 关键点。');
  const normalized = normalizeLandmarks(points, handedness);
  if (!normalized.valid) return reject('DEGENERATE_PALM', '掌坐标系退化，需完整露出手腕与掌部。');
  const palmWidth = normalized.palmWidthM, palmLength = distance(points[0], points[9]);
  if (palmWidth < .025 || palmWidth > .14 || palmLength < .025 || palmLength > .18)
    return reject('IMPLAUSIBLE_DIMENSIONS', '掌部估计尺寸异常；输入须为米制 world 关键点。');
  const across = sub(points[5], points[17]), distal = sub(points[9], points[0]);
  const cosine = across.reduce((sum, v, i) => sum + v * distal[i], 0) / (palmWidth * palmLength);
  if (Math.abs(cosine) > .95) return reject('DEGENERATE_PALM', '掌部参考轴近似共线。');
  const bones = boneLengths(points);
  if (bones.some(v => v < .003 || v > .09) || fingerLengths(bones).some(v => v < .025 || v > .22))
    return reject('IMPLAUSIBLE_BONES', '指节估计长度异常或关键点重叠。');
  return { raw: points.map(p => [...p]) as Vec3[], palmWidth, bones, time: 0 };
}

/** Checks geometry, rather than trusting a gesture label supplied by the caller. */
function checkPose(phase: CalibrationPhase, points: Vec3[]): void {
  const lengths = fingerLengths(boneLengths(points)), extension = extensions(points, lengths), bend = curls(points);
  if (phase === 'open') {
    const palmAxis = sub(points[9], points[0]), palmLength = norm(palmAxis);
    const forward = landmarkChains.slice(1).map((chain, f) => {
      const direction = sub(points[chain[3]], points[chain[0]]);
      return direction.reduce((sum, v, i) => sum + v * palmAxis[i], 0) / (palmLength * lengths[f + 1]);
    });
    if (extension.slice(1).some(v => v < .90) || bend.slice(1).some(v => v > .80)
      || forward.some(v => v < .30) || extension[0] < .78 || bend[0] > 1.35)
      return reject('POSE_NOT_OPEN', '张手阶段请伸直四指并展开拇指。', { extension, bend });
  } else if (phase === 'fist') {
    if (extension.slice(1).some(v => v > .79) || bend.slice(1).some(v => v < 1.15))
      return reject('POSE_NOT_FIST', '握拳阶段四指需明显屈曲，不能使用张手帧。', { extension, bend });
  } else {
    const palmWidth = distance(points[5], points[17]), gap = distance(points[4], points[8]);
    if (gap > Math.min(.022, .25 * palmWidth))
      return reject('POSE_NOT_PINCH', '捏合阶段请让拇指与食指指尖靠近。', { gap, maximumGap: Math.min(.022, .25 * palmWidth) });
  }
}

function normalizedAtScale(raw: Vec3[], hand: Handedness, scale: number): Vec3[] {
  // Pass the actual, already checked hand. Never replace a mismatched label with Right.
  const normalized = normalizeLandmarks(raw, hand);
  if (!normalized.valid) return reject('DEGENERATE_PALM', '无法建立掌坐标系。');
  // Remove the per-frame scale fit, retaining only its rigid/canonical palm frame.
  return normalized.points.map(p => mul(p, scale / normalized.scale));
}

export class HandCalibrationSession {
  private options!: CalibrationSessionOptions;
  private hand?: Handedness;
  private frames: PhaseValues<Frame[]> = phaseObject(() => []);
  private rejects: PhaseValues<number> = phaseObject(() => 0);
  private reasons: PhaseValues<string> = phaseObject(() => '等待采集');
  private lastTimestamp = -Infinity;
  readonly requiredFrames!: number;

  constructor(options: CalibrationSessionOptions) {
    if (!options || typeof options.name !== 'string' || !options.name.trim() || options.name.trim().length > 80)
      return reject('INVALID_NAME', '标定名称需为 1～80 个字符。');
    if (!isSource(options.provenance)) return reject('INVALID_SOURCE', '必须声明 camera、imported 或 synthetic 来源。');
    if (options.handedness !== undefined && !isHand(options.handedness)) return reject('INVALID_HANDEDNESS', '手别无效。');
    const requested = options.minFramesPerPhase ?? MIN_FRAMES;
    if (!Number.isInteger(requested) || requested < MIN_FRAMES || requested > MAX_FRAMES)
      return reject('INVALID_FRAME_REQUIREMENT', '每阶段有效帧数必须为 20～240 的整数。');
    if (options.createdAt !== undefined && !validIsoDate(options.createdAt)) return reject('INVALID_DATE', '标定日期须为有效 ISO 时间。');
    this.options = { ...options, name: options.name.trim(), createdAt: options.createdAt ?? new Date().toISOString() };
    this.hand = options.handedness;
    this.requiredFrames = requested;
  }

  addFrame(phase: CalibrationPhase, points: Vec3[], hand: Handedness, timestampMs: number): CalibrationFrameResult {
    if (!isPhase(phase)) return reject('INVALID_PHASE', '未知标定阶段。');
    try {
      if (!Number.isFinite(timestampMs) || timestampMs < 0) reject('INVALID_TIMESTAMP', '帧时间须为非负有限毫秒数。');
      if (timestampMs <= this.lastTimestamp) reject('DUPLICATE_TIMESTAMP', '忽略重复或倒退的帧时间，不能重复计入同一帧。');
      if (timestampMs - this.lastTimestamp < 8) reject('FRAME_TOO_SOON', '相邻采样过密，请等待新的相机帧。');
      if (this.hand && hand !== this.hand) reject('HANDEDNESS_MISMATCH', '当前手别与本次标定不一致。');
      if (this.frames[phase].length >= MAX_FRAMES) reject('PHASE_FULL', '此阶段已达到采集上限。');
      const frame = inspectFrame(points, hand);
      checkPose(phase, frame.raw);
      const reference = this.allFrames();
      if (reference.length >= 5) {
        const centerPalm = median(reference.map(f => f.palmWidth));
        const centerBones = frame.bones.map((_, i) => median(reference.map(f => f.bones[i])));
        if (Math.abs(frame.palmWidth / centerPalm - 1) > .22
          || frame.bones.some((v, i) => Math.abs(v / centerBones[i] - 1) > .28))
          reject('BONE_LENGTH_OUTLIER', '骨长或掌宽较已采集帧突变，已排除本帧。');
      }
      frame.time = timestampMs;
      this.frames[phase].push(frame);
      this.lastTimestamp = timestampMs;
      this.hand ??= hand;
      this.reasons[phase] = '有效帧';
      return { accepted: true, code: 'ACCEPTED', reason: '有效帧', status: this.getPhaseStatus(phase) };
    } catch (error) {
      if (!(error instanceof CalibrationError)) throw error;
      this.rejects[phase]++;
      this.reasons[phase] = error.message;
      return { accepted: false, code: error.code, reason: error.message, status: this.getPhaseStatus(phase) };
    }
  }

  getPhaseStatus(phase: CalibrationPhase): CalibrationPhaseStatus {
    if (!isPhase(phase)) return reject('INVALID_PHASE', '未知标定阶段。');
    const frames = this.frames[phase], span = frames.length ? frames[frames.length - 1].time - frames[0].time : 0;
    return { phase, acceptedFrames: frames.length, requiredFrames: this.requiredFrames, rejectedFrames: this.rejects[phase],
      ready: frames.length >= this.requiredFrames && span >= MIN_SPAN_MS, lastReason: this.reasons[phase] };
  }

  private allFrames(): Frame[] { return calibrationPhases.flatMap(p => this.frames[p]); }

  private removeRobustOutliers(): void {
    const all = this.allFrames();
    if (all.length < 10) return;
    const palm = all.map(f => f.palmWidth), palmCenter = median(palm), palmMad = mad(palm, palmCenter);
    const centers = Array.from({ length: 15 }, (_, i) => median(all.map(f => f.bones[i])));
    const deviations = centers.map((center, i) => mad(all.map(f => f.bones[i]), center));
    for (const phase of calibrationPhases) {
      this.frames[phase] = this.frames[phase].filter(frame => {
        const outlier = Math.abs(frame.palmWidth - palmCenter) > Math.max(.10 * palmCenter, 4.5 * palmMad)
          || frame.bones.some((v, i) => Math.abs(v - centers[i]) > Math.max(.12 * centers[i], 4.5 * deviations[i]));
        if (outlier) { this.rejects[phase]++; this.reasons[phase] = '多帧稳健统计排除了骨长异常帧'; }
        return !outlier;
      });
    }
  }

  finish(): CalibrationProfile {
    this.removeRobustOutliers();
    const statuses = calibrationPhases.map(phase => this.getPhaseStatus(phase));
    if (statuses.some(s => !s.ready)) return reject('INSUFFICIENT_FRAMES', '三阶段各需至少 20 个有效帧，且各覆盖至少 250 ms；请补采不足阶段。', statuses);
    const hand = this.hand!;
    const all = this.allFrames(), widths = all.map(f => f.palmWidth), palmWidthM = median(widths);
    const bones = Array.from({ length: 15 }, (_, i) => median(all.map(f => f.bones[i])));
    const boneMad = bones.map((center, i) => mad(all.map(f => f.bones[i]), center) / center);
    const palmMad = mad(widths, palmWidthM) / palmWidthM;
    if (palmMad > .06 || boneMad.some(v => v > .08))
      return reject('UNSTABLE_GEOMETRY', '多帧骨长估计不稳定；请改善光照、减少遮挡并重新采集。', { palmMad, boneMad });
    const referencePalmWidthM = distance(robotModel.bases[1], robotModel.bases[4]);
    const scale = referencePalmWidthM / palmWidthM;
    const rawLengths = fingerLengths(bones), targetLengths = robotModel.lengths.map(v => v.reduce((a, b) => a + b, 0));
    const fingerScales = rawLengths.map((length, f) => targetLengths[f] / (length * scale));
    if (fingerScales.some(v => v < .4 || v > 2.5)) return reject('UNSTABLE_MORPHOLOGY', '分指比例超出本实验模型的有效范围。', { fingerScales });
    const pose = (phase: CalibrationPhase): Vec3[] => {
      const samples = this.frames[phase].map(frame => normalizedAtScale(frame.raw, hand, scale));
      return Array.from({ length: 21 }, (_, i) => [0, 1, 2].map(a => median(samples.map(p => p[i][a]))) as Vec3);
    };
    const openPose = pose('open'), closedPose = pose('fist'), pinchPose = pose('pinch');
    const openCurl = curls(openPose), closedCurl = curls(closedPose);
    if (closedCurl.slice(1).some((v, i) => v - openCurl[i + 1] < .75))
      return reject('INSUFFICIENT_MOTION_RANGE', '张手与握拳的屈曲差异不足。');
    const sampleCounts = phaseObject(() => 0), phaseSpanMs = phaseObject(() => 0);
    for (const phase of calibrationPhases) {
      const frames = this.frames[phase];
      sampleCounts[phase] = frames.length;
      phaseSpanMs[phase] = frames[frames.length - 1].time - frames[0].time;
    }
    const profile: CalibrationProfile = {
      version: 2, modelId: modelKinematicsId, name: this.options.name, createdAt: this.options.createdAt!, provenance: this.options.provenance, handedness: hand,
      palmWidthM, referencePalmWidthM, normalizationScale: scale, fingerScales,
      rawMedianFingerLengthsM: rawLengths, rawMedianBoneLengthsM: bones, targetFingerLengthsM: targetLengths,
      openPose, closedPose, pinchPose, openFingerCurlRad: openCurl, closedFingerCurlRad: closedCurl,
      pinchGapM: median(this.frames.pinch.map(frame => distance(frame.raw[4], frame.raw[8]))), sampleCounts,
      quality: { palmWidthRelativeMad: palmMad, boneLengthRelativeMad: boneMad, phaseSpanMs,
        rejectedFrames: calibrationPhases.reduce((sum, phase) => sum + this.rejects[phase], 0) },
    };
    const validation = validateCalibrationProfile(profile);
    if (!validation.valid) return reject('INVALID_PROFILE', '生成的标定统计未通过完整性检查。', validation.errors);
    return profile;
  }
}

export interface CalibrationValidation { valid: boolean; errors: string[]; profile?: CalibrationProfile }
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const legacyProfile = (value: unknown) => record(value) && value.version === 1;

export function validateCalibrationProfile(value: unknown): CalibrationValidation {
  const errors: string[] = [];
  const fail = (message: string) => { errors.push(message); };
  if (!record(value)) return { valid: false, errors: ['profile 必须是对象'] };
  if (legacyProfile(value)) return { valid: false, errors: ['LEGACY_PROFILE: version 1 的旧标定不适用于当前模型；请保留原 JSON 并重新采集。'] };
  const keys = ['version', 'modelId', 'name', 'createdAt', 'provenance', 'handedness', 'palmWidthM', 'referencePalmWidthM', 'normalizationScale',
    'fingerScales', 'rawMedianFingerLengthsM', 'rawMedianBoneLengthsM', 'targetFingerLengthsM', 'openPose', 'closedPose', 'pinchPose',
    'openFingerCurlRad', 'closedFingerCurlRad', 'pinchGapM', 'sampleCounts', 'quality'];
  if (Object.keys(value).some(key => !keys.includes(key)) || keys.some(key => !(key in value))) fail('profile 字段缺失或包含未知字段');
  const finite = (v: unknown, low: number, high: number): v is number => typeof v === 'number' && Number.isFinite(v) && v >= low && v <= high;
  const vector = (v: unknown, length: number, low: number, high: number) => Array.isArray(v) && v.length === length && Array.from(v).every(n => finite(n, low, high));
  if (value.version !== 2) fail('仅支持 version 2');
  if (value.modelId !== modelKinematicsId) fail('modelId 与当前运动学/坐标约定不一致');
  if (typeof value.name !== 'string' || !value.name.trim() || value.name.length > 80 || value.name !== value.name.trim()) fail('name 无效');
  if (!validIsoDate(value.createdAt)) fail('createdAt 无效');
  if (!isSource(value.provenance)) fail('provenance 无效');
  if (!isHand(value.handedness)) fail('handedness 无效');
  if (!finite(value.palmWidthM, .025, .14)) fail('palmWidthM 无效');
  if (!finite(value.referencePalmWidthM, .025, .14)) fail('referencePalmWidthM 无效');
  if (!finite(value.normalizationScale, .15, 6)) fail('normalizationScale 无效');
  if (!vector(value.fingerScales, 5, .4, 2.5)) fail('fingerScales 无效');
  if (!vector(value.rawMedianFingerLengthsM, 5, .025, .22)) fail('rawMedianFingerLengthsM 无效');
  if (!vector(value.rawMedianBoneLengthsM, 15, .003, .09)) fail('rawMedianBoneLengthsM 无效');
  if (!vector(value.targetFingerLengthsM, 5, .015, .30)) fail('targetFingerLengthsM 无效');
  if (!vector(value.openFingerCurlRad, 5, 0, Math.PI * 2)) fail('openFingerCurlRad 无效');
  if (!vector(value.closedFingerCurlRad, 5, 0, Math.PI * 2)) fail('closedFingerCurlRad 无效');
  if (!finite(value.pinchGapM, 0, .022)) fail('pinchGapM 无效');
  for (const key of ['openPose', 'closedPose', 'pinchPose']) {
    if (!isFinitePoints(value[key]) || (value[key] as Vec3[]).flat().some(v => Math.abs(v) > 1)) fail(`${key} 无效`);
  }
  const counts = value.sampleCounts;
  if (!record(counts) || Object.keys(counts).length !== 3 || calibrationPhases.some(p => !Number.isInteger(counts[p]) || !finite(counts[p], 20, MAX_FRAMES))) fail('sampleCounts 无效');
  const quality = value.quality;
  if (!record(quality) || Object.keys(quality).sort().join(',') !== 'boneLengthRelativeMad,palmWidthRelativeMad,phaseSpanMs,rejectedFrames') fail('quality 字段无效');
  else {
    if (!finite(quality.palmWidthRelativeMad, 0, .06) || !vector(quality.boneLengthRelativeMad, 15, 0, .08)) fail('quality 稳定性统计无效');
    if (!Number.isInteger(quality.rejectedFrames) || !finite(quality.rejectedFrames, 0, 1e9)) fail('quality.rejectedFrames 无效');
    const spans = quality.phaseSpanMs;
    if (!record(spans) || Object.keys(spans).length !== 3 || calibrationPhases.some(p => !finite(spans[p], MIN_SPAN_MS, 1e12))) fail('quality.phaseSpanMs 无效');
  }
  if (errors.length) return { valid: false, errors };
  const profile = value as unknown as CalibrationProfile;
  if (Math.abs(profile.normalizationScale * profile.palmWidthM - profile.referencePalmWidthM) > 1e-8) fail('scale 与掌宽不一致');
  const lengths = fingerLengths(profile.rawMedianBoneLengthsM);
  if (lengths.some((v, f) => Math.abs(v - profile.rawMedianFingerLengthsM[f]) > 1e-8)) fail('分指总长与指节总长不一致');
  if (profile.rawMedianFingerLengthsM.some((v, f) => Math.abs(v * profile.normalizationScale * profile.fingerScales[f] - profile.targetFingerLengthsM[f]) > 1e-8)) fail('分指比例与目标长度不一致');
  if (profile.pinchGapM > .25 * profile.palmWidthM + 1e-8) fail('捏合间隙与掌宽不一致');
  try {
    checkPose('open', profile.openPose); checkPose('fist', profile.closedPose); checkPose('pinch', profile.pinchPose);
    if ([profile.openPose, profile.closedPose, profile.pinchPose].some(p => norm(p[0]) > 1e-8)) fail('姿态原点必须为手腕');
    for (const [pose, expected] of [[profile.openPose, profile.openFingerCurlRad], [profile.closedPose, profile.closedFingerCurlRad]] as const)
      if (curls(pose).some((v, f) => Math.abs(v - expected[f]) > 1e-6)) fail('姿态屈曲统计不一致');
    if (profile.closedFingerCurlRad.slice(1).some((v, f) => v - profile.openFingerCurlRad[f + 1] < .75)) fail('张手与握拳差异不足');
  } catch (error) { fail(error instanceof Error ? error.message : '姿态几何无效'); }
  return errors.length ? { valid: false, errors } : { valid: true, errors: [], profile };
}

export function importCalibrationProfile(json: string): CalibrationProfile {
  if (typeof json !== 'string' || json.length > 100_000) return reject('INVALID_JSON', '标定 JSON 无效或过大。');
  let value: unknown;
  try { value = JSON.parse(json); } catch { return reject('INVALID_JSON', '无法解析标定 JSON。'); }
  if (legacyProfile(value)) return reject('LEGACY_PROFILE', '旧版标定已停用；原 JSON 可保留备份，请用当前模型重新标定。');
  if (record(value) && value.version === 2 && value.modelId !== modelKinematicsId)
    return reject('MODEL_MISMATCH', '此标定对应其他模型或坐标约定，请重新标定。');
  const result = validateCalibrationProfile(value);
  if (!result.valid) return reject('INVALID_PROFILE', '标定文件未通过验证。', result.errors);
  // Importing a file never upgrades its recorded source from synthetic/imported to camera.
  return result.profile!;
}

export function exportCalibrationProfile(profile: CalibrationProfile): string {
  if (legacyProfile(profile)) return reject('LEGACY_PROFILE', '旧版标定请原样导出备份，不能伪装成当前版本。');
  const result = validateCalibrationProfile(profile);
  if (!result.valid) return reject('INVALID_PROFILE', '不能导出无效标定。', result.errors);
  return JSON.stringify(profile, null, 2);
}

export interface CalibratedLandmarks {
  normalizedPalmPoints: Vec3[];
  retargetPoints: Vec3[];
  /** Thumb minus index in the common palm frame, before per-finger/base transformations. */
  pinchTargetVector: Vec3;
}

export function applyCalibration(points: Vec3[], hand: Handedness, profile: CalibrationProfile,
  source: CalibrationProvenance): CalibratedLandmarks {
  if (legacyProfile(profile)) return reject('LEGACY_PROFILE', '旧版标定不能套用当前模型，请重新标定。');
  if (profile && profile.modelId !== modelKinematicsId) return reject('MODEL_MISMATCH', '标定对应的运动学或坐标约定已改变。');
  const validation = validateCalibrationProfile(profile);
  if (!validation.valid) return reject('INVALID_PROFILE', '标定未通过验证。', validation.errors);
  if (!isSource(source) || source !== profile.provenance) return reject('SOURCE_MISMATCH', '标定采样来源与当前输入不一致。');
  if (hand !== profile.handedness) return reject('HANDEDNESS_MISMATCH', '此标定不适用于当前左右手。');
  if (Math.abs(profile.referencePalmWidthM - distance(robotModel.bases[1], robotModel.bases[4])) > 1e-8
    || robotModel.lengths.some((v, f) => Math.abs(v.reduce((a, b) => a + b, 0) - profile.targetFingerLengthsM[f]) > 1e-8))
    return reject('MODEL_MISMATCH', '目标模型已改变，请重新标定。');
  const frame = inspectFrame(points, hand);
  if (Math.abs(frame.palmWidth / profile.palmWidthM - 1) > .30
    || frame.bones.some((v, i) => Math.abs(v / profile.rawMedianBoneLengthsM[i] - 1) > .40))
    return reject('GEOMETRY_MISMATCH', '当前手型估计与标定差异过大，请重新标定。');
  const normalizedPalmPoints = normalizedAtScale(points, hand, profile.normalizationScale);
  const retargetPoints = normalizedPalmPoints.map(p => [...p]) as Vec3[];
  landmarkChains.forEach((chain, f) => {
    const base = normalizedPalmPoints[chain[0]];
    chain.forEach(index => { retargetPoints[index] = add(base, mul(sub(normalizedPalmPoints[index], base), profile.fingerScales[f])); });
  });
  return { normalizedPalmPoints, retargetPoints, pinchTargetVector: sub(normalizedPalmPoints[4], normalizedPalmPoints[8]) };
}
