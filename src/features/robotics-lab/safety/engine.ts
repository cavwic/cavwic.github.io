/** Educational software interlock. Not a safety-rated controller or hardware emergency stop. */
export type State = 'DISARMED' | 'ARMED' | 'FAULT';
export interface Limits { qMin: number; qMax: number; currentMax: number; temperatureMax: number; timeout: number }
export const defaultLimits: Limits = { qMin: -1.2, qMax: 1.2, currentMax: 3, temperatureMax: 70, timeout: 0.3 };
export interface SafetyEvent { t: number; type: string; detail: string }
export interface Snapshot { now: number; state: State; enabled: boolean; target: number; feedback: number; current: number; temperature: number; estop: boolean; faults: string[]; readiness: string[]; ages: Record<string, number | null> }
export class SafetyKernel {
  limits: Limits;
  state: State = 'DISARMED';
  now = 0; target = 0; feedback = 0; current = 0; temperature = 25; estop = true;
  faults: string[] = []; events: SafetyEvent[] = [];
  private stamps: Record<string, number | null> = { command: null, feedback: null, current: null, temperature: null, estop: null };
  private invalid = new Set<string>();
  constructor(limits: Limits = defaultLimits) { this.limits = { ...limits }; if (Object.values(limits).some(v => !Number.isFinite(v)) || limits.qMin >= limits.qMax || limits.currentMax <= 0 || limits.temperatureMax <= -50 || limits.timeout <= 0) throw new Error('Invalid safety limits'); this.log('STARTUP', 'Output inhibited; fresh inputs and explicit arm required'); }
  private log(type: string, detail: string) { this.events.push({ t: this.now, type, detail }); if (this.events.length > 2000) this.events.shift(); }
  private trip(code: string) { if (!this.faults.includes(code)) { this.faults.push(code); this.log('FAULT', code); } this.state = 'FAULT'; }
  advance(now: number): void {
    if (!Number.isFinite(now) || now < this.now) { this.invalid.add('clock'); this.trip('INVALID_CLOCK'); return; }
    this.invalid.delete('clock'); this.now = now;
    if (this.state === 'ARMED') for (const [channel, time] of Object.entries(this.stamps)) if (time === null || now - time > this.limits.timeout + 1e-9) this.trip(`TIMEOUT_${channel.toUpperCase()}`);
  }
  command(q: number, now = this.now): void {
    this.advance(now);
    if (!Number.isFinite(q) || q < this.limits.qMin || q > this.limits.qMax) { this.invalid.add('command'); this.trip(!Number.isFinite(q) ? 'NONFINITE_COMMAND' : 'COMMAND_LIMIT'); return; }
    this.invalid.delete('command'); this.target = q; this.stamps.command = this.now;
  }
  jointState(q: number, now = this.now): void {
    this.advance(now);
    if (!Number.isFinite(q) || q < this.limits.qMin || q > this.limits.qMax) { this.invalid.add('feedback'); this.trip(!Number.isFinite(q) ? 'NONFINITE_FEEDBACK' : 'FEEDBACK_LIMIT'); return; }
    this.invalid.delete('feedback'); this.feedback = q; this.stamps.feedback = this.now;
  }
  currentSample(current: number, now = this.now): void {
    this.advance(now);
    if (!Number.isFinite(current)) { this.invalid.add('current'); this.trip('INVALID_CURRENT'); return; }
    this.invalid.delete('current'); this.current = current; this.stamps.current = this.now;
    if (Math.abs(current) >= this.limits.currentMax) this.trip('OVERCURRENT');
  }
  temperatureSample(temperature: number, now = this.now): void {
    this.advance(now);
    if (!Number.isFinite(temperature) || temperature < -50) { this.invalid.add('temperature'); this.trip('INVALID_TEMPERATURE'); return; }
    this.invalid.delete('temperature'); this.temperature = temperature; this.stamps.temperature = this.now;
    if (temperature >= this.limits.temperatureMax) this.trip('OVERTEMPERATURE');
  }
  telemetry(current: number, temperature: number, now = this.now): void { this.currentSample(current, now); this.temperatureSample(temperature, now); }
  emergencyStop(active: boolean, now = this.now): void { this.advance(now); this.estop = active; this.stamps.estop = this.now; if (active) this.trip('ESTOP'); }
  reasons(): string[] {
    const reasons: string[] = [];
    if (this.estop) reasons.push('ESTOP_ACTIVE');
    if (Math.abs(this.current) >= this.limits.currentMax) reasons.push('CURRENT_HIGH');
    if (this.temperature >= this.limits.temperatureMax) reasons.push('TEMPERATURE_HIGH');
    for (const [channel, stamp] of Object.entries(this.stamps)) if (stamp === null) reasons.push(`MISSING_${channel.toUpperCase()}`); else if (this.now - stamp > this.limits.timeout + 1e-9) reasons.push(`STALE_${channel.toUpperCase()}`);
    for (const channel of this.invalid) reasons.push(`INVALID_${channel.toUpperCase()}`);
    return reasons;
  }
  arm(now = this.now): boolean { this.advance(now); const reasons = this.reasons(); if (this.state !== 'DISARMED' || this.faults.length || reasons.length) { this.log('ARM_REJECTED', [...this.faults, ...reasons].join(', ') || this.state); return false; } this.state = 'ARMED'; this.log('ARMED', 'Explicit arm accepted'); return true; }
  reset(now = this.now): boolean { this.advance(now); const reasons = this.reasons(); if (this.state !== 'FAULT' || reasons.length) { this.log('RESET_REJECTED', reasons.join(', ') || 'No latched fault'); return false; } this.faults = []; this.state = 'DISARMED'; this.log('RESET', 'Cleared latch; still inhibited until explicit arm'); return true; }
  disarm(now = this.now): void { this.advance(now); if (this.state === 'ARMED') { this.state = 'DISARMED'; this.log('DISARMED', 'Operator disarm'); } }
  snapshot(): Snapshot { const enabled = this.state === 'ARMED' && this.reasons().length === 0; return { now: this.now, state: this.state, enabled, target: enabled ? this.target : this.feedback, feedback: this.feedback, current: this.current, temperature: this.temperature, estop: this.estop, faults: [...this.faults], readiness: this.reasons(), ages: Object.fromEntries(Object.entries(this.stamps).map(([k, v]) => [k, v === null ? null : this.now - v])) }; }
}
export type FaultCase = 'normal' | 'estop' | 'timeout' | 'overcurrent' | 'overtemperature' | 'nonfinite' | 'limit' | 'feedback';
export interface Frame extends Snapshot { t: number; command: number; actual: number; effort: number }
export interface FaultRun { scenario: FaultCase; frames: Frame[]; events: SafetyEvent[]; faultAt: number | null; outputDisabledAt: number | null; latencyMs: number | null; provenance: string }
/** Local synchronous fault injection. Does not publish ROS messages or prove wall-clock reaction time. */
export function runFault(scenario: FaultCase): FaultRun {
  const k = new SafetyKernel(), frames: Frame[] = []; let q = 0, faultAt: number | null = null, disabled: number | null = null;
  for (let i = 0; i <= 300; i++) {
    const t = i * .02, injected = t >= 2 && t < 3, desired = .7 * Math.sin(1.5 * t);
    k.advance(t);
    if (!(scenario === 'timeout' && injected)) k.command(injected && scenario === 'nonfinite' ? NaN : injected && scenario === 'limit' ? 2.5 : desired);
    k.jointState(injected && scenario === 'feedback' ? 2 : q);
    k.telemetry(injected && scenario === 'overcurrent' ? 4.2 : .6, injected && scenario === 'overtemperature' ? 85 : 35);
    k.emergencyStop(scenario === 'estop' && injected);
    if (i === 0) k.arm();
    if (i === 160) k.reset(); // Clears valid recovered inputs, but deliberately does NOT re-arm.
    if (i === 200) k.arm();
    const s = k.snapshot(), effort = s.enabled ? Math.max(-.5, Math.min(.5, 2 * (s.target - q))) : 0;
    if (s.enabled) q += Math.max(-.03, Math.min(.03, s.target - q)); // illustrative first-order tracking, not a physical model
    if (scenario !== 'normal' && i === 100) faultAt = t;
    if (faultAt !== null && disabled === null && !s.enabled) disabled = t;
    frames.push({ ...s, t, command: desired, actual: q, effort });
  }
  return { scenario, frames, events: k.events, faultAt, outputDisabledAt: disabled, latencyMs: faultAt !== null && disabled !== null ? (disabled - faultAt) * 1000 : null, provenance: 'local synchronous 20 ms fault injection; response includes simulated watchdog age; not ROS network, hardware latency or safety certification' };
}
