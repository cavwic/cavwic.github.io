import { l, rows, type WaveFourteenProductSeed } from './verified-catalog-wave-fourteen-common';
export type Product15 = Omit<WaveFourteenProductSeed, 'companySlug'> & { companySlug: string };
type Field = [string, string, string, string?];
export const manualProducts15: Product15[] = [];
export const productId15 = (company: string, model: string) => `${company}-${model.toLowerCase().replace(/\+/g, '-plus-').replace(/\*/g, 'x').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
export function add15(company: string, model: string, url: string, kind: string, fields: Field[], zh: string, en: string, complete = false, locator = 'Official product specifications') {
  const motion = kind === 'integrated-joint';
  const hand = ['dexterous-hand', 'gripper', 'end-effector-general'].includes(kind);
  const software = ['development-tool', 'robot-model', 'application-software'].includes(kind);
  const robot = ['mobile-robot','humanoid-robot'].includes(kind);
  const component = ['structure','power-supply'].includes(kind);
  const primary = hand ? 'manipulator-end-effector' : motion ? 'motion-transmission' : software ? 'software-tools' : robot ? 'robot-platform' : kind==='structure'?'structure-thermal':kind==='power-supply'?'power-energy':['io-module','connector-cable'].includes(kind)?'communication-connectivity':'sensing';
  const type = hand ? l('灵巧手与末端执行器','Dexterous hand / end effector') : motion ? l('关节与执行模块','Joint / actuator module') : software ? l('机器人软件与开发工具','Robotics software / development tool') : robot ? l('机器人平台','Robot platform') : component ? l('机器人集成配套件','Robot integration component') : kind==='io-module'?l('数据采集与接口模块','Acquisition / interface module'):l('触觉与交互器件','Tactile / interaction device');
  const seed: Product15 = {
    id: productId15(company, model), companySlug: company, product: model, pageUrl: url,
    category: hand ? 'end-effector' : motion || component ? 'motion' : software ? 'model-software' : robot ? 'robot-platform' : 'perception',
    primary, subclass: kind, useCases: ['research', 'integration'],
    type, integration: l('接口、主机和选件按下列型号规格确认。', 'Confirm interfaces, host requirements and options against the model-specific fields below.'),
    verification: l('参数仅适用于引用来源的型号和配置；未知值不作满足筛选条件处理。', 'Values apply only to the cited model and configuration; unknown values do not satisfy numeric filters.'),
    rows: rows(url, l(`${model} 厂商资料`, `${model} manufacturer material`), l(locator, locator), fields),
    overview: [l(zh, en)], applications: [l('按所列测量、操作或开发能力评估目标任务，确认安装、环境和数据链路后再集成。', 'Evaluate the target task against the stated sensing, manipulation or development capabilities; confirm mounting, environment and data integration.')],
    coverage: complete ? 'official-complete' : fields.length ? 'official-partial' : 'capability-only',
  };
  if(kind==='connector-cable')seed.type=l('专用测量与机器人线缆','Measurement / robot cable');
  manualProducts15.push(seed);
  return seed;
}

const shadow = 'https://shadowrobot.com/dexterous-hand-series/';
for (const [name,act,joints,mass,fingers,tendon,stf] of [
  ['Dexterous Hand',20,24,4.3,5,40,5],['Dexterous Hand Lite',13,16,2.4,4,26,4],
  ['Dexterous Hand Extra Lite',10,12,2.1,3,20,3],['Dexterous Hand Super Lite',7,8,1.8,2,14,2],
] as const) add15('shadow-robot',name,shadow,'dexterous-hand',[
  ['主动自由度','Active degrees of freedom',`${act}`],['关节数','Joint count',`${joints}`],['手指数（含拇指）','Finger count including thumb',`${fingers}`],
  ['质量','Mass',`${mass} kg`],['驱动电机','Actuator count',`${act} DC`],['腱绳张力测量','Tendon sensing channels',`${tendon}`],
  ['STF 配置上限','Maximum STF configuration',`${stf}`],['IMU 数量','IMU count','1'],['控制频率','Control frequency','1000 Hz'],['通信接口','Interface','EtherCAT'],
],`腱绳传动的 ${fingers} 指研究灵巧手，${act} 个主动自由度；尺寸缩减同时改变关节与传感器数量。`,`${fingers}-finger tendon-driven research hand with ${act} active DoF; reduced configurations also change joint and sensor counts.`);
const dexUrl='https://shadowrobot.com/wp-content/uploads/2026/05/Shadow-DEX-EE-Series-Technical-Specifications.pdf';
for (const name of ['DEX-EE','DEX-EE Chiral']) add15('shadow-robot',name,dexUrl,'dexterous-hand',[
  ['外形尺寸','Dimensions','350 x 165 x 160 mm'],['手指数','Finger count','3'],['主动自由度','Active DoF','12'],['电机数量','Motor count','15; N+1 per finger'],
  ['单指质量','Single-finger mass','1.2 kg'],['整手质量','Hand mass','4.1 kg'],['指尖力','Fingertip force','at least 8 N'],['关节速度','Joint speed','up to 180 deg/s'],
  ['J0 关节范围','J0 joint range','-50 to 50 deg'],['J1 关节范围','J1 joint range','-80 to 45 deg'],['J2 关节范围','J2 joint range','0 to 80 deg'],['J3 关节范围','J3 joint range','-30 to 85 deg'],
  ['位置/扭矩控制频率','Position/torque control frequency','1000 Hz'],['腱绳力控制频率','Tendon force control frequency','10000 Hz'],['电机 PWM 频率','Motor PWM frequency','40000 Hz'],
  ['关节测量','Joint measurement','4 per finger; 1000 Hz; 0.022 deg'],['加速度测量','Acceleration measurement','3 axes; 1000 Hz; 0.061 mg'],['角速度测量','Angular-rate measurement','3 axes; 1000 Hz; 4.375 mdps'],
  ['腱绳力测量','Tendon force measurement','5 per finger; 1000 Hz; 4 mN'],['执行器状态反馈','Actuator feedback','5 sets; 1000 Hz; velocity/current/temperature/clutch slip'],
  ['近节触觉单元','Proximal taxels','22 per finger; 3-axis + temperature; 100 Hz; 12 bit'],['中节触觉单元','Middle taxels','14 per finger; 3-axis + temperature; 100 Hz; 12 bit'],
  ['远节触觉图像','Distal tactile image','1280 x 480; 50 FPS; USB 3.0'],['光学标记','Optical markers','approximately 500; up to 2180'],
  ['每指传感通道','Sensor channels per finger','155 plus video'],['通信接口','Interfaces','100 Mbps EtherCAT; USB 3.0; internal dual FAN 3 Mbps'],
  ['供电电压','Supply voltage','48 V'],['电源功率要求','Power supply requirement','200 W'],['安装接口','Mounting','ISO 9409-1-50-4-M6; four M6 screws; 50 mm PCD'],
],name==='DEX-EE'?'三指对称模块化研究手，手指与触觉模组可维护更换，面向重复抓取与学习实验。':'第三指偏置的 Chiral 构型，可选左右手及双手组合，面向工具操作、模仿学习和遥操作。',name==='DEX-EE'?'Symmetric three-finger research hand with replaceable fingers and tactile modules for repeated grasping and learning.':'Offset-third-finger Chiral configuration with left/right and bimanual options for tools, imitation learning and teleoperation.',true,'Specifications sections 3-8, pages 4-10; v1.0');
add15('shadow-robot','STF sensor','https://shadowrobot.com/sensors/','tactile-sensor',[
  ['触觉单元','Taxels','17; 3-axis'],['分辨率','Resolution','12 bit'],['力量程','Force range','0.2 to 20 N'],['输出频率','Output frequency','100 Hz'],
],'基于磁场变化的指尖触觉模组，输出局部三轴接触相关数据。','Magnetic fingertip tactile module providing local three-axis contact-related data.');
add15('shadow-robot','Optical tactile sensor','https://shadowrobot.com/sensors/','tactile-sensor',[
  ['力量程','Force range','0.01 to 80 N'],['图像分辨率','Image resolution','1280 x 480'],['量化分辨率','Quantization','10 bit'],['帧率','Frame rate','50 FPS'],
],'用双目视觉读取弹性皮肤变形的光学触觉模组。','Optical module using stereo imaging of compliant skin deformation.');
add15('shadow-robot','Shadow Hand Glove','https://shadowrobot.com/shadow-hand-glove/','position-motion-sensor',[
  ['磁传感器','Magnetic sensors','6'],['信号源','Source count','1'],['时延','Latency','4 ms; optional 1 ms at 960 Hz'],['更新频率','Update frequency','120 Hz; optional 960 Hz'],['位置精度','Position accuracy','0.5 mm'],
],'面向 Shadow 手遥操作的磁追踪手套。','Magnetically tracked operator glove for Shadow teleoperation.');
add15('shadow-robot','Teleoperation system','https://shadowrobot.com/teleoperation/','application-software',[], '把操作手套、机器人手与远端控制组合的系统方案；手臂及最终配置需按项目确认。','System combining operator gloves, robot hands and remote control; arms and final configuration are project-specific.');

const xela='https://xelarobotics.com/wp-content/uploads/2025/12/XELA-Robotics-Product-Catalog-2025-EN.pdf';
for(const [name,taxels,dimensions,wires] of [['uSPa 11',1,'7 x 7.3 x 4.7 mm',4],['uSPa 21',2,'6.3 x 11 x 4.7 mm',4],['uSPa 22',4,'11.1 x 11.1 x 4 mm',4],['uSPa 44',16,'22.6 x 24.6 x 5.5 mm',7],['uSPa 46',24,'30.6 x 50.6 x 4.9 mm',7]] as const) {
  const fields: Field[]=[['触觉单元','Taxels',`${taxels}`],['单元测量轴数','Axes per taxel','3'],['尺寸','Dimensions',dimensions],['导线数量','Wires',`${wires}`],['力分辨率','Force resolution','0.1 gf']];
  if(name==='uSPa 11')fields.push(['测量频率','Measurement frequency','500 Hz']);
  if(name==='uSPa 44')fields.push(['单元法向力量程上限','Normal force maximum per taxel','1500 gf']);
  add15('xela-robotics',name,`${xela}#page=7`,'tactile-sensor',fields,'平面三轴触觉阵列，法向及剪切测量以单元为单位；特定型号的量程和频率不外推。','Flat three-axis tactile array measuring normal and shear contact per taxel; model-specific ranges and rates are not extrapolated.',true,'2025 catalog pages 4-7');
}
for(const [name,taxels,fit] of [['uSCu ALHA',30,'Allegro Hand'],['uSPr HE35',15,'Hand-E'],['uSPr WSG 50',24,'WSG 50'],['uSPr 2F',24,'2F-85 / 2F-140'],['uSPr DS',30,'20 inside + 10 outside; thickness 10.7 mm'],['uSMu',36,'Bendable/cuttable between taxels']] as const) add15('xela-robotics',name,`${xela}#page=8`,'tactile-sensor',[
  ['触觉单元','Taxels',`${taxels}`],['测量轴数','Axes per taxel','3'],['配置','Configuration',fit],['力分辨率','Force resolution','0.1 gf'],
],'曲面、保护或可弯折触觉模组，按指定夹爪及安装位置选型。','Curved, protected or bendable tactile module selected for the specified gripper and mounting position.',true,'2025 catalog pages 8-9');
for(const [name,taxels,type] of [['Allegro Curved',368,'uSCu ALHA'],['Allegro Flat',312,'uSPa 44 / 46'],['2F-140',48,'uSPr 2F'],['2F-85',48,'uSPr 2F'],['LEAP Hand',368,'uSCu ALHA'],['EZGripper',48,'uSPa 46'],['Hand-E',30,'uSPr HE35'],['WSG 50',48,'uSPr WSG 50']] as const) add15('xela-robotics',`uSkin integration ${name}`,`${xela}#page=10`,'tactile-sensor',[
  ['触觉单元总数','Total taxels',`${taxels}`],['传感器模组','Sensor modules',type],['适配本体','Host integration',name],
],'第三方手或夹爪的 XELA 触觉集成组合，本体制造商仍为原厂。','XELA tactile integration for a third-party hand or gripper; the host manufacturer remains the original vendor.',true,'2025 catalog pages 10-11');
add15('xela-robotics','uAi',`${xela}#page=12`,'application-software',[
  ['系统','Operating systems','Windows; Linux'],['机器人接口','Robotics interfaces','ROS; ROS 2'],['已发布功能','Released functions','Visualization; contact position; recording; set-force grasping; temperature drift compensation'],['可选功能','Options','Magnetic compensation; individual taxel calibration'],['标定','Calibration','Standard universal parameters / individual calibration'],
],'触觉可视化、记录与处理软件；目录下一页的规划功能不属于已发布功能。','Tactile visualization, recording and processing; roadmap functions on the following catalog page are not treated as released.',true,'2025 catalog page 12');

const ability='https://www.psyonic.io/s/Robotics-Spec-Sheet_06-000006.pdf';
for(const [size,length,mass] of [['Large',186,470],['Small',180,440]] as const) add15('psyonic',`Ability Hand Robotics ${size}`,ability,'dexterous-hand',[
  ['尺寸','Dimensions',`${length} x 85 mm`],['质量','Mass',`${mass} g`],['拇指末端长度','Thumb tip length in Relax Grip','110 mm'],['掌围','Palm circumference','200 mm'],['腕部直径','Wrist diameter','34.9 mm'],['腕部尺寸','Wrist dimensions','54 x 47 mm'],
  ['安装螺纹','Mounting threads','4 x M5 x 0.8; bolts not included'],['包络抓力','Power grasp force','78 N'],['指尖夹持力','Pinch grasp force','8 N'],['侧捏力','Key grasp force','17 N'],['闭合时间','Closing time','0.2 s'],['最大速度','Maximum speed','462 deg/s fingers; 1848 deg/s thumb'],
  ['轴向承载','Axial load capacity','45.4 kg'],['拇指承载','Thumb load capacity','27.2 kg'],['主动自由度','Active DoF','6'],['触屏兼容','Touchscreen compatibility','Full finger surface'],['反驱','Backdrivability','Thumb rotator manually backdrivable; other fingers non-backdrivable'],
  ['控制模式','Control modes','Position; current; velocity; duty'],['电压','Operating voltage','6 to 12 V'],['电流','Current','14 A maximum; 74 mA quiescent'],['模拟输入电压','Analog input voltage','0 to 5 V'],['通信接口','Interfaces','I2C; BLE; UART; 5 V RS485'],['控制频率','Maximum control frequency','1000 Hz'],
  ['电池容量','Battery capacity','2200 mAh'],['电池尺寸','Battery dimensions','95 x 32 x 7 mm'],['充电','Charge','30 W; 12 V; 2.5 A'],['充电时间','Full charge time','1 hour'],['触觉传感器','Touch sensing','30 force-sensing resistors; 6 per digit'],['测量类型','Force measurement','Normal force'],
  ['防护等级','IP rating','IP64; wrist must not be exposed to water'],['内部最高温度','Maximum internal temperature','80 °C'],['工作与存储温度','Operating and storage temperature','-20 to 45 °C'],['软件接口','Software','Python; C++; ROS 2; Android/iOS setup app'],['仿真','Simulation','Isaac Sim; Isaac Lab; URDF visual/inertia/collision'],['第三方集成','Third-party integration','Manus Metaglove Pro; Universal Robots e-Series'],['建议台式电源','Recommended bench supply','at least 8.4 V and 10 A; supply rating is not hand operating voltage'],
],'六自由度电驱机器人手，含压力反馈；大小尺寸、抓力与结构承载分别记录。腕部防水限制与 IP64 同时适用。','Six-DoF robotic hand with pressure feedback. Size, grasp force and structural loads are distinct; wrist water restrictions apply alongside IP64.',true,'June 2026 robotics sheet REV B, pages 1-2');

for(const [model,url,dof,act,mass,pull,space,cpu] of [
  ['RH8D','rh8d-adult-robot-hand',19,8,620,2.5,1,'Arm Cortex M4'],['RH6D','rh5d-rh7d-childsize-robot-hand',15,6,305,.75,.45,'Arm Cortex M'],['RH4D','rh4d-advanced-manipulator',11,4,250,2.5,.5,'Arm Cortex M4'],
] as const) add15('seed-robotics',model,`https://www.seedrobotics.com/${url}`,'dexterous-hand',[
  ['机械自由度','Mechanical DoF',`${dof}`],['智能执行器数量','Smart actuator count',`${act}`],['质量','Mass',`${mass} g`],['竖直拉伸负载','Vertical pull payload',`${pull} kg`],['三维空间负载','3D-space payload',`${space} kg`],['电压','Supply voltage','9 to 24 V'],['处理器','Processor',`32-bit ${cpu}; coprocessor per actuator`],['接口','Interfaces','UART over RS485; full/half-duplex TTL; USB maintenance; Bluetooth optional'],['反馈','Feedback','Position; speed; current; temperature; overload; PWM'],['掌部感知','Palm sensing','Distance sensor; optional capacitive pads'],['软件','Software','ROS; PyPot; serial protocol'],
  ...(model==='RH4D' ? [['执行器扭矩','Actuator torque','up to 4.5 kg.cm'],['反馈频率','Feedback frequency','up to 120 Hz'],['安装适配器','Mounting adapter','ISO 9409-1-50 optional']] as Field[] : [['协议','Protocol','Dynamixel 1.0 / 2.0'],['仿真','Simulation','URDF']] as Field[]),
],model==='RH6D'?'儿童尺寸欠驱动手，当前型号替代旧 RH5D/RH7D。':'内置智能执行器的欠驱动手，抓取负载按姿态区分。',model==='RH6D'?'Child-sized underactuated hand replacing RH5D/RH7D.':'Underactuated hand with embedded smart actuators and pose-specific payload ratings.',true,'Current product page; brochure/manual may contain additional fields');
const rh8 = manualProducts15.find(product => product.companySlug === 'seed-robotics' && product.product === 'RH8D')!;
const rh8Payload = rh8.rows.find(field => field.label.en === '3D-space payload')!;
rh8Payload.label = l('三维空间负载（来源冲突）', '3D-space payload (conflicting sources)');
rh8Payload.value = l('产品页为 1 kg；官网首页为 750 g，配置差异未说明', 'Product page: 1 kg; homepage: 750 g; configuration difference unspecified');
rh8Payload.conditions = l('两个官方页面数值不一致，暂不用于数值筛选，需向厂商确认具体版本。', 'The two official pages disagree; excluded from numeric filtering pending manufacturer confirmation of the version.');
rh8.coverage = 'official-partial';
rh8.sourceLinks = [{label:l('官网首页负载对照','Homepage payload cross-check'),url:'https://www.seedrobotics.com/'}];
for(const [model,axes,standalone] of [['FTS-1',1,false],['FTS-3',3,false],['SINGLEX-1',1,true],['SINGLEX-3',3,true]] as const){
  const url=standalone?`http://storage.seedrobotics.com/SINGLEX/SINGLEX-${axes}%20${axes===1?'One':'Three'}%20Axis%20Pressure%20Sensor_RevA.pdf`:`http://storage.seedrobotics.com/fts_sensors/FTS${axes}%20${axes===1?'One':'Three'}%20Axis%20Pressure%20Sensor_RevD.pdf`;
  add15('seed-robotics',model,url,'tactile-sensor',[
    ['测量轴数','Measurement axes',`${axes}`],['接触面直径','Contact diameter','12 mm'],['受力方向','Force directions',axes===1?'Normal to surface':'Normal through 90-degree shear'],['标准力量程','Standard force range','0 to 10 N'],['扩展力量程','Extended force range','10 to 30 N'],['标准力分辨率','Standard force resolution','1 mN'],['扩展力分辨率','Extended force resolution','10 mN'],['标准范围非线性','Standard-range nonlinearity','2.5%'],['扩展范围非线性','Extended-range nonlinearity','5%'],['过载能力','Overload capacity','up to 50 N'],['典型迟滞','Typical hysteresis','<2%'],['采样频率','Sampling frequency','50 Hz'],['输出','Outputs',axes===1?'Z force in mN; raw counts approximately 200 per mN':'X/Y/Z force in mN; raw counts approximately 200 per mN'],['工作温度','Operating temperature','10 to 35 °C; nonlinearity may increase outside this range'],['电流','Current per sensor',`${standalone||axes===3?2:1} mA`],['供电','Power source','Acquisition board'],['接口','Interfaces','UART over RS422 full duplex; one DAQ stream'],
    ...(standalone?[
      ['外径','External diameter','20 mm per specification table; illustration inconsistently calls this a radius'],['安装','Mounting','Rear M1.6 mounting points'],['采集板容量','DAQ capacity','up to 5 sensors'],['传感器线缆','Sensor cable','200 mm standard; 300 mm maximum'],['主机线缆','Host cable','up to 5 m'],
    ] as Field[]:[['采集板','DAQ','One board groups sensors for one robot hand']] as Field[]),
  ],standalone?'独立封装触觉传感器，面向第三方机器人集成。标准和扩大量程具有不同分辨率与非线性指标。':'Seed 手部集成触觉传感器，通过共享采集板输出；标准和扩大量程分开记录。',standalone?'Self-contained tactile sensor for third-party integration. Standard and extended ranges have different resolution and nonlinearity.':'Tactile sensor integrated into Seed hands through a shared acquisition board, with distinct standard and extended measurement ranges.',true,standalone?'Visual review: Rev B, 23 December 2021, page 1 (download filename still says RevA)':'Visual review: Rev D, 14 December 2021, page 1');
}

const syn='https://www.synapxdynamics.ai/products/';
add15('synapx','OctoH-Hand',`${syn}octoh-hand`,'dexterous-hand',[
  ['总自由度','Total DoF','23'],['手部自由度','Hand DoF','20'],['小臂自由度','Forearm DoF','3'],['电机数量','Motor count','28'],['驱动方式','Transmission','Tendon-driven hand; direct-drive forearm'],['尺寸','Size','Adult hand reference; dimensions not quantified'],['触觉单元','Taxels','1900+'],['触觉阵列间距','Tactile array pitch','<=1 mm'],['重复定位精度','Repeatability','<=0.1 mm'],['MTBF','MTBF','1000 hours; manufacturer claim'],['感知模态','Sensing modalities','Joint angle; force; touch; vision'],['控制特性','Control features','Backdrivable; hybrid force/position control; replaceable gloves'],
],'小臂远置电机的仿生腱绳手，配合同构数采。精度与可靠性是厂商公布值，未作为独立试验结论。','Anthropomorphic tendon hand with forearm-mounted motors and matched data capture; accuracy and reliability remain manufacturer claims.',true,'Official technical specification block and product features');
add15('synapx','OctoS-Band',`${syn}octosense`,'sensor-general',[
  ['肌电通道','EMG channels','16'],['采样率','Sampling rate','2000 Hz'],['工作模式','Operating modes','Wired / wireless'],['续航','Endurance','>=4 h'],['质量','Mass','<80 g'],['IMU','IMU','9 axes'],
],'用于动作和发力数据采集的肌电手环。','EMG band for capturing hand movement and exertion signals.',true);
add15('synapx','OctoS-Glove',`${syn}octosense`,'position-motion-sensor',[
  ['自由度','DoF','20+'],['末端定位精度','End-point positioning accuracy','Sub-millimeter; exact value not stated'],['关节角分辨率','Joint angular resolution','0.05 deg'],['IMU','IMU','6 axes'],['腕部相机','Wrist camera','2 MP; global shutter'],['视场角','Field of view','200 x 150 deg'],['触觉分辨率','Tactile spatial resolution','1 mm'],['触觉单元','Taxels','1900'],['接触力分辨率','Contact force resolution','0.1 N'],['测量轴数','Force sensing axes','3'],
],'与灵巧手结构对应的外骨骼数采手套，集成视觉、姿态与触觉。','Exoskeleton capture glove structurally matched to the hand with vision, pose and touch.',true);
add15('synapx','OctoS-Ego',`${syn}octosense`,'vision-sensor',[
  ['相机数量','Camera count','4 fisheye'],['单相机分辨率','Resolution per camera','2 MP'],['快门','Shutter','Global'],['单目视场角','Single-camera field of view','200 x 150 deg'],['拼接视场角','Stitched field of view','330 x 150 deg'],['双目基线','Stereo baseline','60 mm'],['IMU','IMU','6 axes'],['输入','Input','Event touch switch'],
],'多鱼眼头环，用于第一视角行为采集和双目空间恢复。','Multi-fisheye head ring for egocentric capture and stereo spatial reconstruction.',true);
for(const [model,description,en,features] of [
  ['SYNWorld','具身世界基础模型','Embodied world foundation model','Vision/touch/force/language/state/action; pinhole and fisheye cameras; MoT architecture'],
  ['SYNAction','具身策略后训练','Embodied policy post-training','Supervised fine-tuning; DAgger; offline/online RL; full parameters/LoRA/Adapter'],
  ['SYNEval','分层具身评测','Layered embodied evaluation','Offline open-loop; simulated closed-loop; real-robot closed-loop; VLM reward feedback'],
  ['OctoS-Forge','数采数据生产平台','Capture data production platform','SYNStereo; SYNEMG; multimodal alignment; cleaning; semantic labels; versioning; lineage'],
] as const) add15('synapx',model,`${syn}${model==='OctoS-Forge'?'octosense':'octomind'}`,'robot-model',[
  ['公开功能','Published functions',features],
],description,en);

const qb='https://qbrobotics.com/';
add15('qbrobotics','qb SoftHand Industry',`${qb}product/qb-softhand-industry/`,'dexterous-hand',[
  ['机械自由度','Mechanical DoF','19'],['电机数量','Motor count','1'],['质量','Mass','0.99 kg'],['腕部安装范围','Wrist mounting range','0 to 90 deg'],['腕部安装分辨率','Wrist mounting resolution','7.5 deg'],['包络抓取负载','Power grasp payload','2 kg'],['夹持负载','Pinch payload','0.6 kg'],['悬挂负载','Hanging payload','5 kg'],['闭合时间','Closing time','1.2 s'],['展开重心 XYZ','Open center of mass XYZ','2.4 x 80.5 x 14.3 mm'],['闭合重心 XYZ','Closed center of mass XYZ','1.1 x 75.3 x 17.5 mm'],['工作温度','Operating temperature','-5 to 50 °C; nominal 20 °C'],['存储温度','Storage temperature','-20 to 50 °C'],['噪声','Noise','40 to 61 dB; nominal 52 dB'],['电压','Operating voltage','12 to 50 V; nominal 24 V'],['功耗','Power consumption','3 to 15 W; nominal 13 W'],['接口','Interfaces','EtherCAT; UDP; digital I/O; external driver'],['防护等级','IP rating','IP65'],['安装','Mounting','ISO 9409-1-50-4-M6; optional 31.5/40; SCHUNK SWS-005/011'],['版本','Versions','Left/right; mirror center-of-mass X'],['抓取测试条件','Grasp test conditions','Friction 0.8 +/-0.1, rubber/ABS; object diameter 15/30/45/60/75/90 mm; cylinder length 150 mm'],
],'单电机柔顺欠驱动工业手，负载随包络、夹持和悬挂方式变化。','Single-motor compliant industrial hand with grasp-mode-specific payloads.',true,'SHIN100 datasheet r112, March 2021 release 2.1.3');
manualProducts15.at(-1)!.sourceLinks=[{label:l('完整规格书','Full datasheet'),url:`${qb}wp-content/uploads/2022/08/SHIN100_datasheet_r112.pdf`}];
add15('qbrobotics','qb SoftClaw',`${qb}product/qb-softclaw/`,'gripper',[
  ['质量','Mass','0.78 kg'],['手指刚度','Finger stiffness','0.07 to 11.5 N/mm'],['夹持力','Gripping force','0.5 to 64 N'],['负载','Payload','3.7 kg'],['闭合时间','Closing time','0.5 s'],['最大开口','Maximum opening','100 mm'],['尺寸公差','Dimensional tolerance','+/-0.2 mm'],['重心 XYZ','Center of mass XYZ','-1 x 1 x 53 mm'],['工具中心点 XYZ','Tool center point XYZ','0 x 30 x 146 mm'],['工作温度','Operating temperature','-5 to 50 °C; nominal 20 °C'],['存储温度','Storage temperature','-20 to 50 °C'],['噪声','Noise','65 dB nominal; 86 dB maximum'],['电压','Operating voltage','23.1 to 24.8 V; nominal 24 V'],['功耗','Power consumption','3 to 22 W'],['接口','Interfaces','RS485; Ethernet/Wi-Fi with optional qbcontrol'],['安装','Mounting','ISO 9409-1-31.5-4-M5; 50-4-M6; Kinova Gen3'],['抓取测试条件','Grasp conditions','NBR/ABS friction 0.8 +/-0.1; object length 100 mm'],
],'可变刚度双指夹爪，指尖可更换，抓取范围与物体条件一并记录。','Variable-stiffness two-finger gripper with replaceable pads and object-dependent grasp performance.',true,'qbSoftClaw datasheet, April 2021 release 1.0.0');
manualProducts15.at(-1)!.sourceLinks=[{label:l('完整规格书','Full datasheet'),url:`${qb}wp-content/uploads/2022/08/qbSoftClaw-datasheet.pdf`}];
for(const [name,path,motors,mass,pinch,power,close] of [['qb SoftHand Research','qb-softhand-research',1,.77,1.1,'Not stated',1.1],['qb SoftHand2 Research','qb-softhand-2-research',2,.94,2,'3 kg',1]] as const) add15('qbrobotics',name,`${qb}product/${path}/`,'dexterous-hand',[
  ['机械自由度','Mechanical DoF','19'],['驱动电机','Motor count',`${motors}`],['质量','Mass',`${mass} kg`],['夹持负载','Pinch payload',`${pinch} kg`],['包络抓取负载','Power grasp payload',power],['闭合时间','Closing time',`${close} s`],['接口','Interfaces','USB; RS485'],['反馈','Feedback','Motor position and current'],
],'面向研究的欠驱动仿人手，主动驱动数与机械自由度分别记录。','Underactuated anthropomorphic research hand; actuator count and mechanical DoF are recorded separately.');

add15('sake-robotics','EZGripper Gen2','https://sakerobotics.com/','gripper',[
  ['开口宽度','Opening width','145 mm'],['包络负载','Enveloping payload','5 kg on 90 mm pipe'],['夹持负载','Pinch payload','2.5 kg on 90 mm pipe'],['质量','Mass','365 g; mount 35 g'],['夹持力','Grip force','35 N'],['执行器','Actuator','ROBOTIS MX64AR'],['电压','Voltage','12 V'],['接口','Interfaces','RS485; USB adapter'],['接触垫尺寸','Pad dimensions','30 x 50 mm'],['软件','Software','ROS 2; Python; C#; MuJoCo; URCaps'],
],'欠驱动柔顺夹爪；负载为官网特定管状工件口径，不代表任意物体。','Underactuated adaptive gripper; payload figures refer to the stated pipe, not arbitrary objects.',true);
add15('sake-robotics','EZGripper Set for Unitree G1','https://sakerobotics.com/store/#!/EZGripper-Set-for-Unitree-G1-Humanoid/p/818115566','gripper',[
  ['适配','Compatibility','Unitree G1'],['软件','Software','ROS 2; Python; DDS / DEX1'],
],'面向宇树 G1 的夹爪集成套件，不是新一代独立五指手。','Gripper integration set for Unitree G1, not a separate five-finger hand generation.');

const weart='https://weart.it/';
add15('weart','TouchDIVER Pro',`${weart}touchdiver-pro-haptic-gloves/`,'position-motion-sensor',[
  ['触觉作用点','Haptic actuation points','6; five fingers and palm'],['反馈模态','Feedback modalities','Force; texture; thermal'],['热反馈温度','Thermal output range','18 to 42 °C'],['手指追踪精度','Finger tracking accuracy','2 mm'],['质量','Mass','200 g'],['接口','Interfaces','Wi-Fi; BLE; tethered version'],['SDK','SDK','Unity; Unreal; C++; C#; Python'],['头显','Headsets','Meta Quest; Pico; HTC; Windows Mixed Reality'],['运行模式','Operating modes','PCVR; standalone'],['电池','Battery','Hot-swappable'],['尺寸','Sizing','One size, flexible materials'],['纹理库','Texture library','Included in SDK'],['销售配置','Sale configuration','Pair; SDK/middleware included; 1-year business warranty'],
],'五指及手掌多模态触觉手套，面向 XR、训练和遥操作。','Five-finger and palm multimodal haptic gloves for XR, training and teleoperation.',true,'Official technical sheet and package');
add15('tacterion','IPM 2.0','https://www.tacterion.com/ipm','tactile-sensor',[
  ['结构层数','Structure layers','3'],['分层结构','Layers','Interaction surface; sensor core; base'],['材料','Materials','Elastomers / 2K compounds'],['感知','Sensing','plyon flex; presence / hand detection'],['可选集成','Optional integration','Third-party lighting / haptic feedback'],['安装','Mounting','Screw; clamp; adhesive; custom geometry'],
],'用于曲面和工具握持界面的定制触觉集成模块，不对应固定通用量程。','Custom tactile integration module for curved surfaces and tool grips; no universal fixed force range.',true);
add15('tacterion','plyon stretch Devkit','https://www.tacterion.com/product/devkit','tactile-sensor',[
  ['控制板','Controller','D02'],['套件','Kit','Stretch samples; 20 jumper wires; USB-C cable'],['支持','Support','1 hour support session'],
],'柔性可拉伸感测开发套件，用于评估最终表面集成。','Stretchable sensing development kit for evaluating final-surface integration.');

add15('theo-hand','Pro20A','https://theo-hand.com/hand/details/Pro20A','dexterous-hand',[
  ['四指最大指尖力','Maximum fingertip force, four-finger label','32 N'],['主动自由度','Active DoF','20'],['最大负载','Maximum payload','30 kg'],['供电电压','Supply voltage','12 V'],['指尖重复定位精度','Fingertip repeatability','<=0.2 mm'],['最大抓取物长度','Maximum object length','140 mm'],['最小开合时间','Minimum open/close time','<=0.4 s'],['固件升级','Firmware upgrade','OTA'],['驱动方式','Actuation','Electric-cylinder direct drive'],['远端指间关节','DIP motion','Bidirectional DoF'],['拇指运动','Thumb motion','Lateral translation'],
],'二十主动自由度灵巧手，采用电缸直驱和可横移拇指；官网所称最大负载未附姿态和工件测试条件，不能等同于任意抓取负载。','Twenty-actuated-DoF hand with direct electric-cylinder drive and lateral thumb translation. The advertised maximum payload lacks pose and object test conditions and is not a universal grasp rating.',true,'Official Pro20A specification image: https://theo-hand.com/assets/views/Pro20A/spec-bg.webp; all 11 published items');

add15('weart','TouchDIVER G1','https://weart.it/haptic-vr-products/touchdiver-haptic-glove/','position-motion-sensor',[
  ['销售状态','Availability','Discontinued; manufacturer statement'],['反馈点','Actuation points','3: thumb, index, middle'],['质量','Mass','200 g'],['电池续航','Battery endurance','1 h'],['温度反馈范围','Thermal feedback range','15 to 42 °C'],['力反馈','Force feedback','5 N'],['力分辨率','Force resolution','0.05 N'],['反馈模态','Feedback modalities','Force; texture; temperature'],['连接方式','Connection','Bluetooth standalone; wired version'],['SDK','SDK','Unity; Unreal Engine'],['头显兼容','Headsets','Meta/Oculus; Pico; HTC; Windows Mixed Reality'],['纹理库','Texture library','Included'],['清洁','Cleaning','Easy-clean design; manufacturer description'],['认证声明','Manufacturer certification claims','CE; FCC; IEC 62368-1'],
],'已停产的三点触觉手套，保留参数用于历史设备识别和维护；不作为现售新品推荐。','Discontinued three-point haptic glove, retained for installed-system identification and maintenance rather than new-product availability.',true);
add15('weart','TouchKEY+','https://weart.it/haptic-vr-products/touchkey-multisensory-solution/','tactile-sensor',[
  ['输入方式','Input','Mouse-like planar tracking'],['反馈','Feedback','Shape/force; vibration; thermal'],['内容','Content','Digitized 2D/3D artworks; dynamic zoom'],['音频','Audio','Custom audio guide tied to exploration'],['公开应用','Public application','Civic Museums of Monza multisensory station'],
],'用于艺术品数字化无障碍体验的桌面多感官装置。公开页面提供交互功能，未提供可据以比较量程或精度的规格表。','Desktop multisensory device for accessible digital-art exploration; public material describes interaction functions but not a range/accuracy comparison sheet.');

const button='https://contactile.com/wp-content/uploads/2026/05/3DFBS-XXX-XXN-FXXX_Datasheet_Rev_1.pdf';
for(const [shape,d,length,pitch,mo,ms,md] of [
  ['10T',10,13.2,3.5,'5.6 mm','6.6 mm','1.5 mm clearance'],['10U',10,13.2,3.5,'5.6 mm','6.6 mm','M1.4 x 0.3 tapped'],
  ['12T',12,15.5,4,'6.5 mm','8.4 mm','1.7 mm clearance'],['12C',12,12,4,'Not applicable','Not applicable','Not applicable'],
  ['14T',14,19,5,'8.6 mm','10 mm','1.7 mm clearance'],['14C',14,14,5,'Not applicable','Not applicable','Not applicable'],
] as const) for(const [range,shear,resxy,resz] of [[12,4,'TBD','TBD'],[20,6,'+/-0.02 N','+/-0.04 N'],[50,15,'TBD','TBD']] as const) {
  const record=add15('contactile',`3DFBS-${shape}-${range}N-FXXX`,button,'force-torque-sensor',[
    ['测量轴数','Measurement axes','3'],['X/Y 力量程','X/Y force range',`+/-${shear} N`],['Z 力量程','Z force range',`0 to ${range} N`],['X/Y 力分辨率','X/Y force resolution',resxy],['Z 力分辨率','Z force resolution',resz],
    ['直径 D','Diameter D',`${d} mm`],['长度 L','Length L',`${length} mm`],['高度 H','Height H','3.6 mm'],['触头参数 P','Contact geometry P',`${pitch} mm`],['安装 TS','Mount TS',d===10?'Not applicable':'9.4 mm'],['安装 TT','Mount TT',d===10?'Not applicable':'M1.6 x 0.35, depth 2.5 mm'],['安装 MO','Mount MO',mo],['安装 MS','Mount MS',ms],['安装 MD','Mount MD',md],
    ['线缆长度选件','Cable length options','25 / 50 / 100 / 200 / 300 mm'],['线缆 CS/CC/CW/CT','Cable CS/CC/CW/CT','6 / 4.5 / 2 / 0.3 mm'],['连接器','Connector','FPC, Molex FFC PS-15266-001'],
    ['供电电压','Supply voltage','2.6 to 3.6 V; typical 3.3 V'],['接口','Interfaces','I2C / SPI'],['SPI 时钟','SPI clock','up to 3 MHz; Mode 0, CPOL=0, CPHA=0'],['I2C 地址','I2C address','0x57 default; configurable 7-bit'],['I2C 时钟延伸','I2C clock stretching','up to 40 ms'],
    ['采样率','Sampling rate','25 to 1000 Hz; default 1000 Hz'],['工作模式','Operating modes','Idle polling / Active streaming'],['输出','Outputs','Fx/Fy/Fz in N; on-board temperature'],['写闪存等待','Flash-write wait','30 ms; reset required'],['SPI 命令至数据等待','SPI command-to-data time','>=250 microseconds'],['SPI 数据至命令等待','SPI data-to-command time','>=10 microseconds'],
    ['绝对最大电压','Absolute maximum voltage','-0.3 to 3.63 V'],['RST/INT 绝对最大电压','RST/INT absolute maximum voltage','-0.3 V to VCC + 0.3 V'],['RST/INT 最大灌电流','RST/INT maximum sink current','25 mA'],['GND 最大电流','GND maximum current','100 mA'],['绝对最大温度','Absolute maximum temperature','-40 to 105 °C; reliability limit, not calibrated operating accuracy'],['Z 绝对最大受力','Z absolute maximum force','100 N'],['X/Y 绝对最大受力','X/Y absolute maximum force','50 N'],['逻辑输入','Logic input thresholds','Low <=0.3 x VCC; high >=0.7 x VCC'],['引脚','Pinout','1 GND; 2 VCC; 3 RESET; 4 MOSI; 5 MISO; 6 SCL/SCK; 7 SDA/CS; 8 INT'],
  ],'三轴光学力按钮，按外形和量程划分；FXXX 保留为可选线缆编码。绝对最大受力不是可用测量量程。','Three-axis optical force button, separated by geometry and range; FXXX remains the cable option. Absolute maximum loads are not measurement ranges.',true,'Datasheet Rev 1, pages 2-3 and protocol timing sections 3/5');
  record.level='family';
}
add15('contactile','GAL2','https://contactile.com/gal2/','gripper',[
  ['尺寸','Dimensions','110.1 to 282.7 W x 76 L x 160.7 to 217.2 H mm'],['行程','Stroke','175 mm'],['质量','Mass','785 g'],['夹持力','Grip force','1.5 to 30 N'],['形封闭负载','Form-fit payload','2 kg'],['摩擦夹持负载','Friction-grip payload','2 kg; static friction coefficient 0.33'],['指尖位置分辨率','Fingertip position resolution','2.1 µm'],['指尖重复精度','Fingertip repeatability','+/-0.2 mm'],['闭合速度','Closing speed','5 to 335 mm/s'],['接口','Interfaces','RS485; USB serial'],['控制模式','Control modes','Dynamic force; fixed force; position'],['软件','Software','Buttons; C++; Python; ROS; ROS2; URCap'],['触觉','Tactile sensing','2 x PapillArray v2.0'],['安装','Mounting','ISO 9409-1-50-4-M6 / 40-4-M6 / 31.5-4-M5'],['套件','Package','Mount/screws; power pack; M8 cable; 1 m USB-C; software/manuals/3D models'],
],'集成双指触觉阵列的电动夹爪，可用触觉进行动态力控制。宣称的自主抓取适用范围仍需目标工件验证。','Electric gripper integrating two tactile arrays for dynamic force control; target-object testing remains necessary.',true,'Official product FEATURES and package; manual B1.1 June 2026');
add15('contactile','PapillArray v2.0','https://contactile.com/wp-content/uploads/2021/12/PTS_2.0_SPEC_DEC21.pdf','tactile-sensor',[
  ['阵列','Array','3 x 3 taxels'],['单元直径','Taxel diameter','6 mm'],['单元高度','Taxel height','up to 4.2 mm'],['单元间距','Taxel pitch','7 mm'],['材料','Material','Silicone Shore A40; aluminum casing'],['外形尺寸','Dimensions','24 x 30.6 x 8.6 mm'],['安装','Mounting','4 x M3'],['X/Y 位移','X/Y displacement','+/-1 mm'],['Z 位移','Z displacement','+2.5 mm'],['位移分辨率','Displacement resolution','<+/-0.01 mm'],['X/Y 单元力量程','X/Y force range per taxel','+/-4 N'],['Z 单元力量程','Z force range per taxel','15 N'],['力分辨率','Force resolution','<+/-0.05 N'],['采样率','Sampling rate','1000 Hz'],['数字分辨率','Digital resolution','16 bit'],['湿度','Humidity','95% RH non-condensing'],['环境限制','Environment','No immersion; protect from dust'],
],'九单元三维触觉阵列，规格按单元而非整阵列总力解释。','Nine-taxel three-dimensional tactile array; specifications are per taxel, not aggregate array force.',true);
add15('contactile','PapillArray Controller v2.0','https://contactile.com/wp-content/uploads/2021/12/PTSCTR_2.0_SPEC_DEC21.pdf','sensor-general',[
  ['外形尺寸','Dimensions','46 x 36 x 16 mm'],['阵列端口','Array ports','2'],['主机接口','Host interface','1 x micro USB'],['LED','LED count','3'],['采样率','Sampling rate','1000 Hz'],['供电','Power','USB 2.0; 5 V; 500 mA system'],['安装','Mounting','4 x M3'],['湿度','Humidity','95% RH non-condensing'],
],'连接两块 PapillArray 的采集控制器，USB 供电和数据接口。','Acquisition controller for two PapillArray sensors with USB power and data.');
add15('contactile','PapillArray Development Kit v2.0','https://contactile.com/products/','tactile-sensor',[
  ['阵列数量','Array count','2'],['控制器','Controller','PapillArray Controller v2.0'],['阵列规格','Array configuration','3 x 3 taxels each'],
],'由阵列和控制器构成的触觉开发套件。','Tactile development kit combining arrays and controller.');

const modulus='https://www.gelsight.com/wp-content/uploads/2026/08/GS-Modulus-Product-Sheet-HR-Lens-Included-08_4_26_Rev2.pdf';
for(const [lens,length,mass,xy] of [['L1600',206,165,'3 µm + 0.3%'],['L1690',201,169,'3 µm + 0.3%'],['L2000',205,193,'1.0 µm + 0.3%'],['L2090',192,190,'1.0 µm + 0.5%']] as const) add15('gelsight',`GelSight Modulus ${lens}`,modulus,'tactile-sensor',[
  ['尺寸','Dimensions',`28 x 33 x ${length} mm`],['质量','Mass',`${mass} g`],['视场','Field of view','6.7 x 5.6 mm'],['粗糙度范围','Roughness range',lens.startsWith('L16')?'2 to 20 µm':'0.2 to 20 µm'],['X/Y 精度','X/Y accuracy',xy],['Z 精度','Z accuracy',lens.startsWith('L16')?'5-50 µm: 1 µm + 4%; 51-1000 µm: 3 µm + 6%':'1-11 µm: 0.4 µm + 4%; 11-101 µm: 0.4 µm + 6%; 101-500 µm: 1 µm + 5%'],['系统','Operating system','Windows 11 and above'],['接口','Interface','USB-C'],['电压','Voltage','5 V'],['电流','Current','2 A'],['功率','Power','10 W'],['导出格式','Export formats','PDF; STL; CSV; TMD; X3P; PLY'],['计量条件','Metrology condition',lens.startsWith('L20')?'JCGM 100:2008':'Manufacturer specification'],
],'可更换探头光学配置的便携表面计量设备；精度按镜头及深度分段，不合并成单一精度数。','Portable surface metrology with interchangeable optics; accuracy remains lens- and depth-dependent.',true,'Official Modulus/HR sheet, August 2026 specification table');

add15('seed-robotics','NICO','https://www.seedrobotics.com/nico-robot','humanoid-robot',[
  ['头和双臂自由度','Head and arm DoF','10'],['双手机械自由度','Two-hand mechanical DoF','22'],['双手电机数量','Two-hand motor count','8'],['默认末端','Default hands','2 x RH4D; optional RH5D/RH7D in the cited build'],['相机','Cameras','2 x 4K; up to 60 fps at 4K'],['麦克风','Microphones','2; stereo'],['面部表情','Facial expression','LED matrices in eyebrows and mouth'],['接口','Interfaces','USB: sound, vision and motor control'],['软件','Software','Open-source Python; V-Rep models; CAD and code from University of Hamburg'],['交付','Delivery','Pre-assembled and tested; 1-year warranty, lifetime support stated by supplier'],['安全安装','Mounting safety','Secure torso to prevent tip-over when reaching or lifting'],
],'汉堡大学开源的神经认知交互研究平台，Seed Robotics 提供组装配置；身体与手部自由度分开记录，不作为行走人形机器人。','University of Hamburg open-source neurocognitive research platform, assembled by Seed Robotics. Body and hand DoF are separated; this is not a walking humanoid.',true);

for(const [model,payload] of [['WR300CV',300],['WR300CB',300],['WR300LF',300],['WR600LF',600],['WR1000LF',1000],['WR1000CV',1000]] as const) add15('wonik-robotics',model,'https://wonikrobotics.com/en/sub/product/prod.php?a_idx=4&s_cate=21','mobile-robot',[
  ['额定负载档位','Published payload class',`${payload} kg`],['导航','Navigation','Sensor fusion; obstacle detection; autonomous route planning'],['部署','Deployment','No physical guide line required'],
],'工厂物流自主移动平台，官网按负载和运输机构列出型号。型号级尺寸、速度和电池数据未列于已取得的页面。','Factory logistics AMR listed by payload and handling configuration. Retrieved official material does not provide model-specific dimensions, speed or battery data.');
for(const model of ['WR-AMMR05-3F','WR-AMMR05-4F','WR-AMMR12-3F','WR-AMMR12-4F','WR-AMMR20-CT']) add15('wonik-robotics',model,'https://wonikrobotics.com/en/sub/product/prod.php?a_idx=3&s_cate=20','mobile-robot',[
  ['组成','Architecture','AMR; customer-selected collaborative arm; end effector'],['移动机构','Mobility','Mecanum wheels'],['应用','Applications','Assembly; palletizing; machine tending'],['负载口径','Payload publication scope','Family sections: 5 to 9 kg / 10 to 20 kg; not individually assigned from model names'],
],'移动操作配置，机械臂及末端按项目组合；不从型号中的数字反推额定负载。','Mobile manipulation configuration with project-selected arm and tool; rated payload is not inferred from digits in the model name.');

const researchSheet='https://qbrobotics.com/wp-content/uploads/2021/07/qb-SoftHand-Research-datasheet-r200.pdf';
const research=manualProducts15.find(p=>p.companySlug==='qbrobotics'&&p.product==='qb SoftHand Research')!;
research.rows=rows(researchSheet,l('原厂研究手规格书','Manufacturer research-hand datasheet'),l('2020 年 1 月，2.0.0 版，第 2 页','January 2020 release 2.0.0, page 2'),[
  ['质量','Mass','0.77 kg'],['机械自由度','Mechanical DoF','19'],['电机数','Motor count','1'],['包络抓取负载','Power grasp payload','2.1 kg maximum'],['夹持负载','Pinch payload','1.1 kg maximum'],['悬挂负载','Hanging payload','5 kg maximum'],['完全闭合时间','Full closing time','1.1 s maximum'],['展开重心 XYZ','Open center of mass XYZ','2.7 x 82.9 x -0.5 mm'],['闭合重心 XYZ','Closed center of mass XYZ','1.3 x 76.6 x 3.5 mm'],['冲击能量','Impact energy','1 finger / 4 fingers: 98 J; 5 fingers: 19 J'],['冲击速度','Impact speed','1 finger / 4 fingers: 4.7 m/s'],['冲击力','Impact force','5 fingers: 200 N'],['工作温度','Operating temperature','-5 to 50 °C; nominal 20 °C'],['存储温度','Storage temperature','-20 to 50 °C'],['噪声','Noise','44 to 72 dB; nominal 62 dB'],['电压','Supply voltage','23.1 to 24.8 V; nominal 24 V'],['功耗','Power consumption','1.4 to 30 W; nominal 18 W'],['接口','Interface','RS485; USB adapter'],['安装','Mounting','ISO 9409-1-31.5-4-M5 / 40-4-M6 / 50-4-M6'],['配置','Configurations','Left/right; different covers; mirror center-of-mass X for left hand'],['试验条件','Test conditions','Rubber/ABS friction 0.8 +/-0.1; diameters 15/30/45/60/75/90 mm; cylinder length 150 mm'],['电源引脚','Power pinout','3 and 5: 24 V DC; 4 and 8: GND'],['通信引脚','Communication pinout','1: RS485+; 2: RS485-'],
]);
research.coverage='official-partial';
research.sourceLinks=[{label:l('完整规格及尺寸图','Specifications and dimensional drawing'),url:researchSheet}];
for(const product of manualProducts15.filter(p=>p.companySlug==='qbrobotics'&&['qb SoftHand Industry','qb SoftClaw'].includes(p.product))){
  product.rows=product.rows.map(r=>({...r,sourceUrl:product.sourceLinks![0].url}));
}

for(const [name,path,kind,fields] of [
  ['Standard Kit','standard-kit','integrated-joint',[
    ['关节模块','Joint modules','4 x qbmove Advanced'],['法兰','Flanges','2 flat; 4 flat add-ons; 4 C flanges'],['夹爪','Grippers','2 two-finger'],['附件','Accessories','1 handle; 1 qb ally'],['线缆','Cables','5 x 200 mm; 2 x 300 mm; 1 x 1500 mm ERNI'],['软件','Software','Reprogrammable; Windows/Linux GUI'],
  ]],
  ['DelMo Kit','delmo-kit','integrated-joint',[
    ['组成','Components','1 Standard Kit; 1 aluminum structure; delta kinematic components'],['关节模块','Joint modules','4 VSA actuators'],['软件','Software','Block Coding for Kids; ROS; Windows/Linux GUI'],
  ]],
  ['qb Robot Clamp','qb-robot-clamp','structure',[
    ['材料','Material','Steel'],['安装','Mounting','Removable quick-mount robot base'],['兼容','Compatibility','UR3/UR5/UR3e/UR5e; Kinova Gen3; Franka Panda; Sawyer; TM5'],
  ]],
  ['qb Dual Tool','qb-dualtool','structure',[
    ['工具容量','Tool capacity','2 grippers simultaneously'],['机械接口','Mechanical interface','ISO 9409-1-50-4 flange'],['兼容','Compatibility','UR3/UR5/UR3e/UR5e; Kinova Gen3; Franka Panda; Sawyer; TM5'],
  ]],
  ['24VDC 60W Power Supply','24vdc-60w-power-supply-unit','power-supply',[
    ['输出电压','Output voltage','24 V DC'],['输出功率','Output power','60 W'],['兼容','Compatibility','SoftHand Research/Industry; SoftClaw'],
  ]],
  ['Supply Unit for Standard Kit','supply-unit-for-standard-kit','power-supply',[
    ['输出电压','Output voltage','24 V DC'],['输出功率','Output power','240 W'],['兼容','Compatibility','Standard Kit'],
  ]],
  ['Bracket 1.0','qb-move-advanced-bracket-1-0','structure',[
    ['材料','Material','Aluminum'],['尺寸','Dimensions','200 x 70 x 110 mm'],['兼容','Compatibility','Standard Kit base'],
  ]],
  ['Bracket 2.0','qb-move-advanced-bracket-2-0','structure',[
    ['材料','Material','Aluminum'],['尺寸','Dimensions','400 x 300 x 535 mm'],['兼容','Compatibility','Standard Kit frame'],
  ]],
  ['Flange Kit','flange-kit','structure',[
    ['夹爪','Gripper','1 qbmove gripper'],['法兰','Flanges','2 flat; 2 flat add-ons; 2 C flanges'],['线缆','Cables','4 x 200 mm'],
  ]],
  ['qb SoftClaw Pad Kit','qb-softclaw-pad-kit','structure',[
    ['接触垫','Pads','1 pair magnetic flat pads; 1 pair screw-fastened flat pads'],['选项','Options','Custom design on request'],
  ]],
  ['qb SoftHand Research ISO 9409 POS 2','qb-softhand-research-iso-9409-pos-2','structure',[
    ['安装接口','Mounting interface','ISO 9409-1-31.5-4-M5'],['兼容','Compatibility','SoftHand Research; SoftClaw'],
  ]],
  ['qb SoftHand Industry ISO 9409 POS 3','qb-softhand-industry-iso-9409-1-pos-3','structure',[
    ['安装接口','Mounting interface','ISO 9409-1-40-4-M6'],['兼容','Compatibility','SoftHand Industry'],
  ]],
  ['qb SoftHand Research ISO 9409 POS 4','qb-softhand-research-iso-9409-pos-4','structure',[
    ['安装接口','Mounting interface','ISO 9409-1-50-4-M6'],['兼容','Compatibility','SoftHand Research; SoftClaw'],
  ]],
  ['qb SoftHand Industry Standard Glove','qb-softhand-industry-standard-glove','structure',[
    ['用途','Purpose','Standard replaceable glove for SoftHand Industry'],
  ]],
  ['qb SoftHand Research Kinova Gen3 Adapter','qb-softhand-research-kinova-gen-3-adapter','structure',[
    ['机械臂','Arm compatibility','Kinova Gen3'],['末端','Tool compatibility','SoftHand Research; SoftClaw'],
  ]],
  ['qb SoftHand Industry Schunk Tool Changer','qb-softhand-industry-schunk-tool-changer','structure',[
    ['工具交换接口','Tool changer interface','SCHUNK SWS-005 / SWS-011'],['兼容','Compatibility','SoftHand Industry'],
  ]],
] as Array<[string,string,string,Field[]]>){
  const entry=add15('qbrobotics',name,`${qb}product/${path}/`,kind,fields,'机器人集成或开发配套件；按具体套件和接口建档，不能把部件规格当成整套机器人性能。','Robot integration/development component, recorded by kit and interface; component specifications do not establish complete-robot performance.');
  if(name.endsWith('Kit'))entry.level='platform';
}

manualProducts15.find(p=>p.companySlug==='tacterion'&&p.product==='IPM 2.0')!.level='family';
const plyonManual='https://content.tacterion.com/User%20Manual%20V1-1.pdf';
for(const [model,name,area,size,hfc,proximity,page] of [
  ['PFL-10020','Square','16 x 16 mm','24 x 24 x 0.5 mm',true,true,37],
  ['PFL-10021','Medium','10 x 50 mm','18 x 58 x 0.5 mm',true,true,38],
  ['PFL-10033','Stripe','8.5 x 90 mm','16 x 100 x 0.5 mm',true,true,39],
  ['PFL-10022','Array','10 x 10 mm per taxel; 4 mm gap','18 x 58 x 0.5 mm',true,false,40],
  ['PFL-10023','Slider','10 x 50 mm','18 x 58 x 0.5 mm',false,true,41],
] as const){
  add15('tacterion',`plyon flex ${name} ${model}`,plyonManual,'tactile-sensor',[
    ['型号','Model',model],['结构','Sensor structure',name==='Array'?'Taxel line array':name==='Slider'?'Resistive slider':'Single taxel'],['感测区域','Sensing area',area],['模块尺寸','Module dimensions',size],['TrueZero','TrueZero','Supported'],['HFC 读出','HFC readout',hfc?'Supported':'Not supported'],['接近检测','Proximity detection',proximity?'Supported':'Not supported'],['交付状态','Delivery scope','Engineering sample for R&D; not a finished consumer or production product'],
    ...(name==='Slider'?[['位置输出范围','Position output range','0 to 4095'],['多点触控','Multitouch','Not supported; functional segments cannot operate simultaneously']] as Field[]:[]),
  ],'柔性接触界面的具名参考设计。此版本为研究开发工程样品，接近、压力与滑动配置按型号区分，不等同于已完成产品认证的工业传感器。','Named flexible-contact reference design supplied as an R&D engineering sample. Proximity, pressure and sliding functions vary by model; it is not a certified finished industrial sensor.',true,`2025 manual v1.1, page ${page}; engineering-sample boundary pages 2-3`);
}
add15('tacterion','D-01 EBS-10018',plyonManual,'io-module',[
  ['模块尺寸','Module dimensions','117 x 70 x 20 mm'],['USB 供电','USB supply voltage','5 V'],['引脚供电','Pin supply voltage','3.3 V; onboard LEDs not powered at this voltage'],['供电限制','Power constraint','USB and pin power must never be connected simultaneously'],['接口','Interfaces','Micro USB CDC/Virtual COM; UART; 6-pin header'],['标准传感通道','Standard sensing channels','6'],['专用通道','Dedicated channels','1 slider; 1 proximity'],['3.3V 输出电流上限','3.3V output maximum current','50 mA; shutdown above limit'],['UART RX/TX','UART RX/TX','Pins 1/3; 5 V tolerant'],['电源/地引脚','Power/ground pins','2 VDD; 5 GND'],['保留引脚','Reserved pin','4 IOEX; do not connect'],['复位','Reset','Pin 6 nRST; 3.3 V; internal pull-up; open-drain'],['系统','Host systems','Windows; macOS'],['数据格式','Data output','Comma-separated serial data; USB and UART output simultaneously'],['交付状态','Delivery scope','R&D engineering sample; no finished-product FCC compliance claim'],
],'plyon flex 开发套件的采集评估板，供电输入和信号容限分开保存。5V UART 容限不能解释为 3.3V 引脚的正常供电电压。','Acquisition/evaluation board for the plyon flex kit. Supply inputs and signal tolerances remain separate; UART 5 V tolerance is not the normal voltage of the 3.3 V supply pin.',true,'2025 manual v1.1, pages 18-19, 32, 35-36, 42');
const tx=add15('tacterion','skillflow TX-1','https://content.tacterion.com/skillflow_flyer_EN_PDF.pdf','tactile-sensor',[
  ['尺码','Sizes','S; M; L'],['佩戴','Wearing','Left/right; compatible with work gloves'],['触觉','Tactile','plyon flex; capacitive and resistive sensing'],['声学','Acoustics','Integrated microphone'],['惯性','Inertial sensing','Acceleration'],['反馈','Feedback','Wrist-mounted LED process feedback'],['联网','Connectivity','Wireless MES integration optional; cloud storage alternative'],['维护','Maintenance','Replaceable textile; removable reusable electronics'],['流程','Workflow','Process-specific reference data collection and model training'],
],'用于人工装配步骤识别的可穿戴系统，结合触觉、声音与加速度。宣传中的试点准确率不作为所有产线通用规格或保证。','Wearable manual-assembly monitoring using tactile, acoustic and acceleration signals. Promotional pilot accuracy is not treated as a universal production specification or guarantee.',false,'Official skillflow flyer, pages 3-7');
tx.level='platform';

const wacohOther='https://wacoh-tech.com/products/other/';
for(const [model,length,file,connection,fit] of [
  ['CWE-6AR5(24)-DI',5,'CWE-6AR5-24-DI_etc.html','Connectors at both ends','ECIF-1000 EtherCAT or DAIF-1500 analog box'],
  ['CWE-6AR10(24)-DI',10,'CWE-6AR5-24-DI_etc.html','Connectors at both ends','ECIF-1000 EtherCAT or DAIF-1500 analog box'],
  ['CWE-6AR5(24)',5,'CWE-6AR5-24_etc.html','RS422; one end with loose wires','Customer RS422 equipment or ETIF-2100'],
  ['CWE-6AR10(24)',10,'CWE-6AR5-24_etc.html','RS422; one end with loose wires','Customer RS422 equipment or ETIF-2100'],
  ['CWE-6AR30(24)',30,'CWE-6AR5-24_etc.html','RS422; one end with loose wires','Customer RS422 equipment or ETIF-2100'],
  ['CWE-6AR3-A',3,'CWE-6AR3-A_etc.html','RS422 external robot wiring','DENSO WAVE RC8'],
  ['CWE-6AR8-A',8,'CWE-6AR3-A_etc.html','RS422 external robot wiring','DENSO WAVE RC8'],
  ['CWE-6AR15-A',15,'CWE-6AR3-A_etc.html','RS422 external robot wiring','DENSO WAVE RC8'],
  ['CWE-6AR3-B',3,'CWE-6AR3-B_etc.html','RS422 internal robot wiring','RC8 side; use with sensor-side CWE-6AE230-SA'],
  ['CWE-6AR8-B',8,'CWE-6AR3-B_etc.html','RS422 internal robot wiring','RC8 side; use with sensor-side CWE-6AE230-SA'],
  ['CWE-6AR15-B',15,'CWE-6AR3-B_etc.html','RS422 internal robot wiring','RC8 side; use with sensor-side CWE-6AE230-SA'],
  ['CWE-6AE230-SA',0.23,'CWE-6AR3-B_etc.html','RS422 internal robot wiring','DynPick side; use with controller-side CWE-6AR#-B'],
  ['CWE-6AR10-FNC',10,'CWE-6AR10-FNC.html','RS422 to RS232 conversion','FANUC R-30iB'],
] as const) add15('wacoh-tech',model,wacohOther+file,'connector-cable',[
  ['线缆长度','Cable length',`${length} m`],['连接方式','Connection',connection],['配套对象','Compatibility',fit],
],'DynPick 测量链配套线缆；长度和机械臂接线方式按订货型号分别保存，不把所连接转换器的性能归给被动线缆。','DynPick measurement-chain cable with order-specific length and wiring. Converter performance is not attributed to a passive cable.',true,'Official page model/length and feature sections');
add15('wacoh-tech','RUIF-1600',wacohOther+'RUIF-1600.html','io-module',[
  ['线缆长度','Cable length','3 m'],['输入','Input','DynPick RS422'],['输出','Output','USB virtual port after driver installation'],['供电','Power','USB powers the connected sensor'],['软件','Software','Windows basic measurement software included'],['交付边界','Delivery boundary','DynPick sensor required separately'],
],'将 DynPick 的 RS422 输出转换到 USB 的有源线缆，适用于计算机测量连接。','Active DynPick RS422-to-USB cable for host-computer measurement.',true,'Official page model/length and feature sections');
