import type {
  FinderNormalizedParameter,
  FinderParameter,
  FinderParameterMetric,
} from "./product-finder-demo";

type MetricDefinition = {
  metric: FinderParameterMetric;
  label: RegExp;
  valueUnit: RegExp;
  unitPattern?: string;
  unit: string;
  convert?: (value: number, rawValue: string) => number;
};

const definitions: MetricDefinition[] = [
  { metric: "payloadKg", label: /负载|载荷|payload|load capacity/i, valueUnit: /\b(?:kg|g)\b/i, unitPattern: "kg|g", unit: "kg", convert: massToKg },
  { metric: "massKg", label: /质量|重量|净重|自重|mass|weight/i, valueUnit: /\b(?:kg|g)\b/i, unitPattern: "kg|g", unit: "kg", convert: massToKg },
  { metric: "torqueNm", label: /扭矩|torque/i, valueUnit: /(?:(?:m|u)?n\s*[·.\-]?\s*m|kg\s*[·.\-]?\s*cm)/i, unitPattern: "(?:m|u)?N\\s*[·.\\-]?\\s*m|kg\\s*[·.\\-]?\\s*cm", unit: "N·m", convert: torqueToNm },
  { metric: "forceN", label: /抓力|夹持力|夹持.*力|闭合力|指尖力|作用力|脱开力|输出力|力量程|力范围|拉力|允许力|预加载力|保护力|主轴.*力|grasp force|grip(?:ping)? force|closing force|fingertip force|breakaway force|force range|output force|pulling force|permissible force|preload force|protective force|spindle force/i, valueUnit: /\b(?:kn|n)\b/i, unitPattern: "kN|N", unit: "N", convert: forceToN },
  { metric: "reachMm", label: /臂展|工作半径|最大可达|工作距离|reach|working radius|working distance/i, valueUnit: /\b(?:mm|cm|m)\b/i, unitPattern: "mm|cm|m", unit: "mm", convert: lengthToMm },
  { metric: "heightMm", label: /身高|站立高度|高度|height/i, valueUnit: /\b(?:mm|cm|m)\b/i, unitPattern: "mm|cm|m", unit: "mm", convert: lengthToMm },
  { metric: "dimensionsMm", label: /尺寸|外形|dimensions?|size/i, valueUnit: /\b(?:mm|cm|m)\b/i, unitPattern: "mm|cm|m", unit: "mm", convert: lengthToMm },
  { metric: "travelMm", label: /行程|stroke|travel/i, valueUnit: /\b(?:mm|cm|m)\b/i, unitPattern: "mm|cm|m", unit: "mm", convert: lengthToMm },
  { metric: "gripRangeMm", label: /夹持范围|外夹范围|内撑范围|外夹直径|内撑直径|抓取范围|最大开口|工件直径|直径行程|grip(?:ping)? range|external grip|internal grip|grip diameter|maximum opening|object diameter|diametral stroke/i, valueUnit: /\b(?:mm|cm|m)\b/i, unitPattern: "mm|cm|m", unit: "mm", convert: lengthToMm },
  { metric: "speedMps", label: /移动速度|行走速度|最高速度|运动速度|夹持速度|闭合速度|手指速度|主轴.*速度|travel speed|walking speed|maximum speed|motion speed|grip(?:ping)? speed|closing speed|finger speed|spindle speed/i, valueUnit: /(?:mm\s*\/\s*s|cm\s*\/\s*s|m\s*\/\s*s|km\s*\/\s*h)/i, unitPattern: "km\\s*\\/\\s*h|mm\\s*\\/\\s*s|cm\\s*\\/\\s*s|m\\s*\\/\\s*s", unit: "m/s", convert: linearSpeedToMps },
  { metric: "speedRpm", label: /转速|旋转速度|speed|rpm/i, valueUnit: /(?:rpm|r\s*\/\s*min)/i, unitPattern: "rpm|r\\s*\\/\\s*min", unit: "rpm" },
  { metric: "angularSpeedRadps", label: /角速度|关节速度|angular[- ]?speed|joint speed|velocity limit/i, valueUnit: /rad\s*\/\s*s/i, unitPattern: "rad\\s*\\/\\s*s", unit: "rad/s" },
  { metric: "flowLpm", label: /流量|airflow|flow(?: rate)?/i, valueUnit: /(?:l\s*\/\s*min|slpm|gpm)/i, unitPattern: "L\\s*\\/\\s*min|SLPM|GPM", unit: "L/min", convert: flowToLpm },
  { metric: "pressureBar", label: /压力|气压|pressure/i, valueUnit: /(?:mpa|kpa|bar|psi)/i, unitPattern: "MPa|kPa|bar|psi", unit: "bar", convert: pressureToBar },
  { metric: "vacuumPercent", label: /真空度|真空.*(?:范围|水平|等级)|maximum vacuum|vacuum (?:range|level)/i, valueUnit: /%/, unitPattern: "%", unit: "%" },
  { metric: "durationS", label: /夹持时间|抓取时间|释放时间|脱离时间|处理时间|供钉时间|grip(?:ping)? time|release time|detachment time|processing time|feed time/i, valueUnit: /(?:ms|s|sec|min)/i, unitPattern: "ms|s|sec|min", unit: "s", convert: durationToSeconds },
  { metric: "noiseDb", label: /噪声|noise/i, valueUnit: /(?:dba|db)/i, unitPattern: "dBA|dB", unit: "dBA" },
  { metric: "cycleLife", label: /循环寿命|更换寿命|设计寿命|cycle life|tool-change life|design life/i, valueUnit: /(?:次|循环|cycles?)/i, unitPattern: "次循环|循环|次|cycles?", unit: "cycles" },
  { metric: "ipRating", label: /防护等级|ip (?:classification|rating)|ingress protection/i, valueUnit: /ip\s*\d+/i, unit: "IP" },
  { metric: "angleDeg", label: /角度|倾斜精度|视场角|关节范围|angle|tilt|field of view|joint range/i, valueUnit: /(?:°|deg|\brad\b)/i, unitPattern: "°|deg|rad", unit: "°", convert: angleToDegrees },
  { metric: "humidityPercent", label: /湿度|humidity/i, valueUnit: /%/, unitPattern: "%", unit: "%" },
  { metric: "enduranceH", label: /续航|运行时间|工作时间|endurance|runtime|operating time|battery range/i, valueUnit: /(?:小时|分钟|\bh\b|\bhr\b|\bmin\b)/i, unitPattern: "小时|分钟|hr|h|min", unit: "h", convert: durationToHours },
  { metric: "dof", label: /自由度|dof|degrees? of freedom/i, valueUnit: /\d/, unit: "DoF" },
  { metric: "axes", label: /轴数|测量轴|axes|axis count/i, valueUnit: /\d/, unit: "axes" },
  { metric: "voltageV", label: /电压|voltage/i, valueUnit: /\b(?:kv|v)\b/i, unitPattern: "kV|V", unit: "V", convert: voltageToV },
  { metric: "currentA", label: /电流|current/i, valueUnit: /\b(?:ma|a)\b/i, unitPattern: "mA|A", unit: "A", convert: currentToA },
  { metric: "powerW", label: /功率|power/i, valueUnit: /\b(?:kw|w)\b/i, unitPattern: "kW|W", unit: "W", convert: powerToW },
  { metric: "capacityAh", label: /电池容量|容量|battery capacity|capacity/i, valueUnit: /(?:mah|ah)/i, unitPattern: "mAh|Ah", unit: "Ah", convert: capacityToAh },
  { metric: "energyWh", label: /能量|energy/i, valueUnit: /(?:kwh|wh)/i, unitPattern: "kWh|Wh", unit: "Wh", convert: energyToWh },
  { metric: "samplingHz", label: /采样率|输出频率|sampling|sample rate|output rate/i, valueUnit: /(?:mhz|khz|hz)/i, unitPattern: "MHz|kHz|Hz", unit: "Hz", convert: frequencyToHz },
  { metric: "frequencyHz", label: /通信频率|刷新率|帧率|频率|communication rate|update rate|frame rate|frequency/i, valueUnit: /(?:mhz|khz|hz|fps)/i, unitPattern: "MHz|kHz|Hz|fps", unit: "Hz", convert: frequencyToHz },
  { metric: "accuracyMm", label: /重复精度|定位精度|精度|repeatability|positioning accuracy|accuracy/i, valueUnit: /\b(?:cm|mm|µm|um)\b/i, unitPattern: "cm|mm|µm|um", unit: "mm", convert: precisionToMm },
  { metric: "resolutionMm", label: /空间分辨率|分辨率|resolution/i, valueUnit: /\b(?:cm|mm|µm|um)\b/i, unitPattern: "cm|mm|µm|um", unit: "mm", convert: precisionToMm },
  { metric: "reductionRatio", label: /减速比|传动比|reduction ratio|gear ratio/i, valueUnit: /(?:\d\s*:\s*1|\bratio\b)/i, unit: ":1" },
  { metric: "temperatureC", label: /工作温度|运行温度|operating temperature|temperature range/i, valueUnit: /(?:°\s*c|℃)/i, unitPattern: "°\\s*C|℃", unit: "°C" },
];

// Aliases describe the same quantity; arm span and obstacle clearance are not reach/body height.
const metricAliases: Partial<Record<FinderParameterMetric, RegExp>> = {
  payloadKg: /承载|(?:arm|hand|finger|grasp|lifting|unit|overall).*load|load.*(?:hands|claim)/i,
  massKg: /体重/i,
  forceN: /握力|抓握力|力传感量程|力\/矩|finger force|gripper force|grip strength|force per finger|tensile force|force.sensor range|force\/torque|payload\/grip/i,
  torqueNm: /力矩|力\/矩|permissible moment/i,
  reachMm: /垂直可达|操作半径|工作可达|工作范围|working[- ]range|working[- ]distance|single.arm span/i,
  dimensionsMm: /厚度|宽度|长度|肩宽|(?:腿|臂).*长|thickness|\bwidth\b|\blength\b|(?:sensor|published) (?:height|envelope)|optical format/i,
  travelMm: /偏心轨道|升降高度差/i,
  gripRangeMm: /抓握直径|grasp diameter|maximum (?:jaw opening|gripper width)/i,
  speedMps: /步速|步行速度|底盘速度|最高速度|最大速度|base speed|mov(?:ing|ement) speed|end.effector speed/i,
  angularSpeedRadps: /关节.*速度|关节.*转速|joint.*speed/i,
  durationS: /供钉时间/i,
  noiseDb: /声压级|sound pressure level/i,
  ipRating: /防水防尘/i,
  angleDeg: /视场|爬坡|坡度|斜坡|俯仰角|弯曲角|侧摆角|展开角|\bfov\b|angular precision|spread|slope|knee range|sensing field/i,
  enduranceH: /运行时长|工作时长|使用时间|battery life/i,
  voltageV: /供电|电源|power.supply|external.power|\bsupply\b|\bpower\b/i,
  powerW: /功耗|电源|供电|\bsupply\b/i,
  samplingHz: /采样频率|采样率|采样.*频率|sampling.*frequency/i,
  frequencyHz: /速率|rotation rate|control rate|closed.loop rate|capture rate|scan rate|computation rate|data rate|dynamic.signal rate|sampling rate|output rate/i,
  accuracyMm: /重复定位|精密度|准确度|precision/i,
  cycleLife: /开合寿命/i,
};

type GenericUnitDefinition = {
  valueUnit: RegExp;
  unitPattern: string;
  unit: string;
  convert?: (value: number, rawValue: string) => number;
};

const genericUnitDefinitions: GenericUnitDefinition[] = [
  { valueUnit: /\b(?:Gbit|Mbit|kbit|bit)\s*\/\s*s\b/, unitPattern: "Gbit\\s*\\/\\s*s|Mbit\\s*\\/\\s*s|kbit\\s*\\/\\s*s|bit\\s*\\/\\s*s", unit: "bit/s", convert: (value, unit) => value * (/^Gbit/.test(unit) ? 1e9 : /^Mbit/.test(unit) ? 1e6 : /^kbit/.test(unit) ? 1e3 : 1) },
  { valueUnit: /\bGB\s*\/\s*s\b/, unitPattern: "GB\\s*\\/\\s*s", unit: "GB/s" },
  { valueUnit: /\bMiB\b/, unitPattern: "MiB", unit: "GiB", convert: value => value / 1024 },
  { valueUnit: /\bMB\b/, unitPattern: "MB", unit: "GB", convert: value => value / 1000 },
  { valueUnit: /\bGiB\b/, unitPattern: "GiB", unit: "GiB" },
  { valueUnit: /\bGB\b/, unitPattern: "GB", unit: "GB" },
  { valueUnit: /\bTOPS\b/i, unitPattern: "TOPS", unit: "TOPS" },
  { valueUnit: /\bGFLOPS\b/i, unitPattern: "GFLOPS", unit: "GFLOPS" },
  { valueUnit: /\bTFLOPS\b/i, unitPattern: "TFLOPS", unit: "TFLOPS" },
  { valueUnit: /\bGHz\b/i, unitPattern: "GHz", unit: "Hz", convert: frequencyToHz },
  { valueUnit: /(?:cycles?|picks?)\s*\/\s*min/i, unitPattern: "cycles?\\s*\\/\\s*min|picks?\\s*\\/\\s*min", unit: "/min" },
  { valueUnit: /(?:mm\s*\/\s*s|cm\s*\/\s*s|m\s*\/\s*s|km\s*\/\s*h)/i, unitPattern: "km\\s*\\/\\s*h|mm\\s*\\/\\s*s|cm\\s*\\/\\s*s|m\\s*\\/\\s*s", unit: "m/s", convert: linearSpeedToMps },
  { valueUnit: /(?:(?:m|u)?n\s*[·.\-]?\s*m|kg\s*[·.\-]?\s*cm)/i, unitPattern: "(?:m|u)?N\\s*[·.\\-]?\\s*m|kg\\s*[·.\\-]?\\s*cm", unit: "N·m", convert: torqueToNm },
  { valueUnit: /(?:l\s*\/\s*min|slpm|gpm)/i, unitPattern: "L\\s*\\/\\s*min|SLPM|GPM", unit: "L/min", convert: flowToLpm },
  { valueUnit: /(?:mpa|kpa|bar|psi)/i, unitPattern: "MPa|kPa|bar|psi", unit: "bar", convert: pressureToBar },
  { valueUnit: /(?:°\s*c|℃)/i, unitPattern: "°\\s*C|℃", unit: "°C" },
  { valueUnit: /\b(?:kg|g)\b/, unitPattern: "kg|g", unit: "kg", convert: massToKg },
  { valueUnit: /\b(?:kn|n)\b/i, unitPattern: "kN|N", unit: "N", convert: forceToN },
  { valueUnit: /\b(?:mm|cm|m)\b/i, unitPattern: "mm|cm|m", unit: "mm", convert: lengthToMm },
  { valueUnit: /(?:rpm|r\s*\/\s*min)/i, unitPattern: "rpm|r\\s*\\/\\s*min", unit: "rpm" },
  { valueUnit: /rad\s*\/\s*s/i, unitPattern: "rad\\s*\\/\\s*s", unit: "rad/s" },
  { valueUnit: /(?:dba|db)/i, unitPattern: "dBA|dB", unit: "dBA" },
  { valueUnit: /(?:次|循环|cycles?)/i, unitPattern: "次循环|循环|次|cycles?", unit: "cycles" },
  { valueUnit: /(?:ms|sec|\bs\b|\bmin\b)/i, unitPattern: "ms|sec|s|min", unit: "s", convert: durationToSeconds },
  { valueUnit: /(?:mhz|khz|hz|fps)/i, unitPattern: "MHz|kHz|Hz|fps", unit: "Hz", convert: frequencyToHz },
  { valueUnit: /(?:kwh|wh)/i, unitPattern: "kWh|Wh", unit: "Wh", convert: energyToWh },
  { valueUnit: /(?:mah|ah)/i, unitPattern: "mAh|Ah", unit: "Ah", convert: capacityToAh },
  { valueUnit: /\b(?:kw|w)\b/i, unitPattern: "kW|W", unit: "W", convert: powerToW },
  { valueUnit: /\b(?:mv|kv|v)\b/i, unitPattern: "mV|kV|V", unit: "V", convert: voltageToV },
  { valueUnit: /\b(?:ma|a)\b/i, unitPattern: "mA|A", unit: "A", convert: currentToA },
  { valueUnit: /%/, unitPattern: "%", unit: "%" },
  { valueUnit: /(?:°|deg)/i, unitPattern: "°|deg", unit: "°" },
  { valueUnit: /\bcc\b/i, unitPattern: "cc", unit: "cc" },
  { valueUnit: /\bmp\b/i, unitPattern: "MP", unit: "MP" },
  { valueUnit: /\bpixels\b/i, unitPattern: "pixels", unit: "MP", convert: value => value / 1e6 },
  { valueUnit: /\bcounts?\b/i, unitPattern: "counts?", unit: "count" },
  { valueUnit: /\bg\b/i, unitPattern: "G", unit: "G" },
];

function unitNear(rawValue: string, token: RegExp) {
  const match = rawValue.match(token);
  return match?.[0]?.toLocaleLowerCase() ?? "";
}

function massToKg(value: number, rawValue: string) {
  return unitNear(rawValue, /\b(?:kg|g)\b/i) === "g" ? value / 1000 : value;
}

function torqueToNm(value: number, rawValue: string) {
  if (/^mN\s*[·.]?\s*m$/i.test(rawValue)) return value / 1000;
  if (/^[µμu]N\s*[·.]?\s*m$/i.test(rawValue)) return value / 1_000_000;
  return /kg\s*[·.\-]?\s*cm/i.test(rawValue) ? value * 0.0980665 : value;
}

function forceToN(value: number, rawValue: string) {
  return unitNear(rawValue, /\b(?:kn|n)\b/i) === "kn" ? value * 1000 : value;
}

function lengthToMm(value: number, rawValue: string) {
  const unit = unitNear(rawValue, /\b(?:mm|cm|m)\b/i);
  if (unit === "m") return value * 1000;
  if (unit === "cm") return value * 10;
  return value;
}

function linearSpeedToMps(value: number, rawValue: string) {
  if (/km\s*\/\s*h/i.test(rawValue)) return value / 3.6;
  if (/mm\s*\/\s*s/i.test(rawValue)) return value / 1000;
  if (/cm\s*\/\s*s/i.test(rawValue)) return value / 100;
  return value;
}

function angleToDegrees(value: number, rawValue: string) {
  return /rad/i.test(rawValue) ? value * (180 / Math.PI) : value;
}

function flowToLpm(value: number, rawValue: string) {
  return /gpm/i.test(rawValue) ? value * 3.785411784 : value;
}

function pressureToBar(value: number, rawValue: string) {
  if (/mpa/i.test(rawValue)) return value * 10;
  if (/kpa/i.test(rawValue)) return value / 100;
  if (/psi/i.test(rawValue)) return value * 0.0689475729;
  return value;
}

function durationToSeconds(value: number, rawValue: string) {
  if (/ms/i.test(rawValue)) return value / 1000;
  if (/min/i.test(rawValue)) return value * 60;
  return value;
}

function durationToHours(value: number, rawValue: string) {
  return /分钟|\bmin\b/i.test(rawValue) ? value / 60 : value;
}

function voltageToV(value: number, rawValue: string) {
  const unit = unitNear(rawValue, /\b(?:mv|kv|v)\b/i);
  if (unit === "mv") return value / 1000;
  if (unit === "kv") return value * 1000;
  return value;
}

function currentToA(value: number, rawValue: string) {
  return unitNear(rawValue, /\b(?:ma|a)\b/i) === "ma" ? value / 1000 : value;
}

function powerToW(value: number, rawValue: string) {
  return unitNear(rawValue, /\b(?:kw|w)\b/i) === "kw" ? value * 1000 : value;
}

function capacityToAh(value: number, rawValue: string) {
  return /mah/i.test(rawValue) ? value / 1000 : value;
}

function energyToWh(value: number, rawValue: string) {
  return /kwh/i.test(rawValue) ? value * 1000 : value;
}

function frequencyToHz(value: number, rawValue: string) {
  if (/ghz/i.test(rawValue)) return value * 1_000_000_000;
  if (/mhz/i.test(rawValue)) return value * 1_000_000;
  if (/khz/i.test(rawValue)) return value * 1000;
  return value;
}

function precisionToMm(value: number, rawValue: string) {
  if (/(?:µm|um)/i.test(rawValue)) return value / 1000;
  return /cm/i.test(rawValue) ? value * 10 : value;
}

// Expand a central value and tolerance only when their units can be reconciled.
function expandTolerance(value: string) {
  return value.replace(/(-?\d+(?:\.\d+)?)\s*([A-Za-zµμ°]+)?\s*(?:±|\+\s*\/\s*-)\s*(\d+(?:\.\d+)?)\s*(%|[A-Za-zµμ°]+)/g,
    (original, centerText: string, centerUnit: string | undefined, deltaText: string, deltaUnit: string) => {
      if (deltaUnit === "%" && !centerUnit) return original;
      if (deltaUnit !== "%" && centerUnit && centerUnit.toLowerCase() !== deltaUnit.toLowerCase()) return original;
      const center = Number(centerText);
      const delta = deltaUnit === "%" ? Math.abs(center) * Number(deltaText) / 100 : Number(deltaText);
      const unit = centerUnit ?? deltaUnit;
      return `${center - delta} to ${center + delta} ${unit}`;
    });
}

const relationFor = (label: string, value: string, values: number[]): FinderNormalizedParameter["relation"] => {
  const text = `${label} ${value}`;
  if (/-?\d+(?:\.\d+)?\s*(?:[A-Za-z°]+\s*)?(?:[–—~～]|至|\bto\b|-)\s*[+-]?\d/i.test(value) && values.length >= 2) return "range";
  if (/至少|不低于|最低|最小|minimum|at least|no less than|≥|>=/i.test(text) || /\bmin\b/i.test(label)) return "minimum";
  if (/最大|最高|最多|最长|上限|峰值|充电限制|不超过|maximum|max\b|\blimit\b|\bpeak\b|up to|no more than|≤|<=|</i.test(text)) return "maximum";
  if (/约|大约|approx|about|≈/i.test(text) || /^\s*~/.test(value)) return "approximate";
  if (values.length > 1) return "list";
  return "point";
};

const numericValues = (rawValue: string) => {
  const prepared = rawValue
    .replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, "")
    .replace(/[−]/g, "-");
  return [...prepared.matchAll(/-?\d+(?:\.\d+)?/g)]
    .map((match) => Number(match[0]))
    .filter(Number.isFinite);
};

const measuredValues = (rawValue: string, unitPattern: string, interfaceField = false) => {
  const number = "-?\\d+(?:\\.\\d+)?";
  // In interface descriptions, 1x24 V denotes one connector, not two voltage values.
  const separator = interfaceField ? "(?:\\s*(?:[–—~～,\\/]|\\bto\\b)\\s*)" : "(?:\\s*(?:[–—~～x×,\\/]|\\bto\\b)\\s*)";
  const expression = new RegExp(`(${number}(?:${separator}${number})*)\\s*(${unitPattern})(?![A-Za-z/])`, "gi");
  const values: Array<{ value: number; unit: string }> = [];

  const prepared = rawValue.replace(/[−]/g, "-").replace(/(\d)\s*(?:[-–—~～]|至)\s*(?=-?\d)/g, "$1 to ");
  for (const match of prepared.matchAll(expression)) {
    for (const value of numericValues(match[1])) {
      values.push({ value, unit: match[2] });
    }
  }

  return values;
};

export function normalizeFinderParameter(parameter: FinderParameter): FinderNormalizedParameter[] {
  if (parameter.status === "unknown") return [];
  if (/绝缘耐压|绝缘电阻|过载|冲突|insulation (?:high.voltage|voltage|resistance)|withstand|dielectric|overload|conflicting sources/i.test(parameter.label)) return [];
  if (/无线|语音模型|示例模型|公开模型数量|wireless|voice.model|example models|published model count|^variant$/i.test(parameter.label)) return [];
  if (/供电保护|保护条件|激光产品等级|^IMU device$|power protection|protection conditions|laser product class/i.test(parameter.label)) return [];
  if (/可选末端|optional end effector|控制功能|control functions|官方环境|official environment|保修|warranty|交付周期|lead.time|换型声明|changeover claim|^Fit Check$|有线网络|wired network|^腕部$|^wrist$|^冲击$|^shock$|Data per IMU sample/i.test(parameter.label)) return [];
  if (/建议\/极限负载|Nominal\/limit payload/i.test(parameter.label)) return [];
  if (/^Ethernet$/i.test(parameter.label) && /^RJ45$/i.test(parameter.value.trim())) return [];
  // IP codes are categorical; extended codes cannot be ordered as plain numbers.
  if (/\bIP\s*(?:X\d|\d[A-Z]|\d\d[A-Z])/i.test(parameter.value)) return [];
  if (/防水防尘|防护等级|ingress protection|ip rating/i.test(parameter.label) && /定制|可选|custom|optional|IP\d+\s*\/\s*IP\d+/i.test(parameter.value)) return [];
  // Datasheets commonly omit the space between a number and its unit.
  // Dimensionality and protocol versions are labels, not measured scalar values.
  let value = parameter.value.replace(/\b\d+D\b/gi, "dimensional")
    .replace(/\bUSB\s*\d+\.\d+(?:\.\d+)*(?:\s*Gen\s*\d+(?:x\d+)?)?(?![\d.]|\s*(?:[mk]?V|[mu]?A|[mk]?W)\b)/gi, "USB")
    .replace(/(?<=\d),(?=\d{3}(?:\D|$))/g, "").replace(/(?<=\d)(?=[A-Za-zµμ℃°])/g, " ").replace(/∶/g, ":");
  // Expand explicitly printed magnitude words before reading units, never model/version identifiers.
  value = value.replace(/(\d+(?:\.\d+)?)\s*(万|亿|million|billion|thousand)(?=\s*(?:次|像素|cycles?|measurements?|pixels?|$))/gi,
    (_, amount: string, scale: string) => `${Number(amount) * ({万:1e4,亿:1e8,million:1e6,billion:1e9,thousand:1e3}[scale.toLowerCase()] ?? 1)} `);
  value = value.replace(/(\d)\s*(?:次测量|次带负载测试|次|loaded cycles|cycles|measurements)(?=\s|[;；,，(（)]|$)/gi, '$1 cycles');
  value = value.replace(/(\d+(?:\.\d+)?)\s*像素/g, '$1 pixels').replace(/(\d+(?:\.\d+)?)\s*-degree\b/gi, '$1 deg');
  // Number words are expanded only in count/DoF descriptions, not arbitrary marketing prose.
  if (/^(?:Tactile sensors|Tactile arrays|Tactile coverage|Actuation|Finger DoF|Chassis wheels|Thumb transmission|Four-finger transmission|Gigabit Ethernet \(RJ45\)|Battery modules|Audio|Vision|Illumination|Microphone array|AI chips)$/i.test(parameter.label)) {
    const words: Record<string,number> = {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
    value = value.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/gi, word=>String(words[word.toLowerCase()]));
  }
  value = value.replace(/\bs\s*\/颗/g, 's per screw');
  if (/^XT30 external-power ports$/i.test(parameter.label)) value = value.replace(/^\s*\d+\s*,\s*/, '');
  if (/网页对比表最高.*分辨率|Web-comparison best .*resolution/i.test(parameter.label)) parameter = {...parameter,label:parameter.label.replace(/最高|\bbest\b/gi,'')};
  if (/尺寸|外形|dimensions?|size/i.test(parameter.label)) value = value.replace(/[长宽高]\s*(?=-?\d)/g, "");
  value = value.replace(/(?<=\d)\s*(?:…+|\.{2,})\s*(?=[+-]?\d)/g, ' to ').replace(/\bto\s*\+(?=\d)/g, 'to ');
  value = value.replace(/\bV\s*DC\b/gi, 'V').replace(/[µμ]/g,'u').replace(/\bmin\s*[-−⁻]\s*[1¹]/g,'rpm');
  // An @-qualified test distance is evidence context, not a second measured value.
  value = value.split(/\s*@\s*(?=\d)/)[0];
  value = expandTolerance(value);
  // Some source tables put a shared unit in the heading, not in numeric cells.
  // Only attach an explicitly printed unit to a purely numeric cell/range.
  const headingUnit = parameter.label.match(/[（(]\s*(kg|g|mm|cm|m|mA|A|kV|V|kW|W|mAh|Ah|kWh|Wh|MHz|kHz|Hz|rpm|N[·.]?m|N|°C|℃|%)\s*[）)]/i)?.[1]
    ?? parameter.label.match(/(?:^|\s)(°C|℃)(?:\s+(?:Max|Min))?\s*$/i)?.[1];
  if (headingUnit && /^[+\-\d.,\s~～–—x×/<>≤≥]+(?:\s+to\s+[+\-\d.]+)?$/.test(value.trim())) value = `${value} ${headingUnit}`;
  if (/精度|分辨率|accuracy|precision|repeatability|resolution/i.test(parameter.label)) value = value.replace(/(?:±|\+\s*\/\s*-)\s*(?=\d)/g, "");
  parameter = { ...parameter, value };
  const massAndSizeLabel = parameter.label.replace(/\b(?:excl(?:uding)?\.?|without)\s+(?:the\s+)?packaging\b|不(?:含|包括)包装/gi, '');
  const interfaceField = /接口|端口|连接器|interface|port\b|connector/i.test(parameter.label);
  const specific = definitions.flatMap((definition) => {
    if (!(definition.label.test(parameter.label) || metricAliases[definition.metric]?.test(parameter.label)) || !definition.valueUnit.test(parameter.value)) return [];
    if (definition.metric === "massKg" && /转子|定子|包装|rotor|stator|packag/i.test(massAndSizeLabel)) return [];
    if (definition.metric === "dimensionsMm" && /包装|packag/i.test(massAndSizeLabel)) return [];
    if (definition.metric === "heightMm" && /攀爬|台阶|越障|爬越|跨越|升降高度差|传感器外形高度|sensor height|climb|obstacle|step[- ]?(?:over|height)/i.test(parameter.label)) return [];
    if (definition.metric === "resolutionMm" && /距离|distance/i.test(parameter.label)) return [];
    if (definition.metric === "dof" && /(?:mm|cm|kg|\bm\b)/i.test(parameter.value)) return [];
    if (definition.metric === "samplingHz" && /输出|output/i.test(parameter.label) && !/采样|sampling|sample rate/i.test(parameter.label)) return [];
    if (definition.metric === "frequencyHz" && /采样|sampling|sample rate/i.test(parameter.label)) return [];
    if (definition.metric === "dimensionsMm" && /开口|gripper width/i.test(parameter.label)) return [];
    if (definition.metric === "payloadKg" && /\d\s*G\b/.test(parameter.value) && !/\bkg\b|\d\s*g\b/.test(parameter.value)) return [];
    if (definition.metric === "ipRating" && /定制|可选|custom|optional|IP\d+\s*\/\s*IP\d+/i.test(parameter.value)) return [];

    const measured = definition.metric === "reductionRatio"
      ? [...parameter.value.matchAll(/(\d+(?:\.\d+)?)\s*:\s*1(?!\d)/g)].map(match => ({ value: Number(match[1]), unit: ":1" }))
      : definition.unitPattern
      ? measuredValues(definition.metric === "forceN" ? parameter.value.replace(/-?\d+(?:\.\d+)?\s*(?:m|u)?N\s*[·.]\s*m/gi, '') : parameter.value, definition.unitPattern, interfaceField)
      : numericValues(parameter.value).map((value) => ({ value, unit: parameter.value }));
    if (!measured.length) return [];

    const converted = measured.map(({ value, unit }) => definition.convert?.(value, unit) ?? value);
    return [{
      metric: definition.metric,
      unit: definition.unit,
      values: converted,
      min: Math.min(...converted),
      max: Math.max(...converted),
      relation: relationFor(parameter.label, parameter.value, converted),
      sourceLabel: parameter.label,
    }];
  });
  if (specific.length) return specific;

  for (const definition of genericUnitDefinitions) {
    if (!definition.valueUnit.test(parameter.value)) continue;
    const measured = measuredValues(parameter.value, definition.unitPattern, interfaceField);
    if (!measured.length) continue;
    const converted = measured.map(({ value, unit }) => definition.convert?.(value, unit) ?? value);
    return [{
      metric: "genericNumber",
      unit: definition.unit,
      values: converted,
      min: Math.min(...converted),
      max: Math.max(...converted),
      relation: relationFor(parameter.label, parameter.value, converted),
      sourceLabel: parameter.label,
    }];
  }

  if (/型号|线序|接线|引线|连接器|model|wiring|wire|connector|part number|sensor type/i.test(parameter.label)) return [];
  const values = numericValues(parameter.value);
  if (!values.length) return [];
  return [{
    metric: "genericNumber",
    unit: "number",
    values,
    min: Math.min(...values),
    max: Math.max(...values),
    relation: relationFor(parameter.label, parameter.value, values),
    sourceLabel: parameter.label,
  }];
}

export function withParameterIndex(parameters: FinderParameter[], sourceUrl: string, sourceLabel: string) {
  return parameters.map((parameter) => {
    if (parameter.status === "unknown") return parameter;
    const sourced = {
      ...parameter,
      sourceUrl: parameter.sourceUrl ?? sourceUrl,
      sourceLabel: parameter.sourceLabel ?? sourceLabel,
    };
    return {
      ...sourced,
      // An explicit empty index can exclude a damage limit or an ambiguous source value.
      normalized: parameter.normalized ?? normalizeFinderParameter(sourced),
    };
  });
}
