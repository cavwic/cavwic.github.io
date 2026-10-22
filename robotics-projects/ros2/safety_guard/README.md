# safety_guard：ROS 2 Jazzy 软件联锁原型

状态：纯 Python 核心可以在无 ROS 环境测试；ROS 适配器和 ament_python 包已提供。**尚未在用户 Ubuntu 24.04 虚拟机执行 colcon、启动 ROS 节点或验证 DDS 通信。** 浏览器页面是语义一致的 TypeScript 内核，不是浏览器连接 ROS。

此包不是功能安全认证产品，不等同于硬件急停、安全继电器、STO 或独立驱动器看门狗。电机必须有独立硬件断能链路。不要将本包直接用于人员附近或有负载的真实机械臂。

## 状态与约束

`DISARMED -> ARMED -> FAULT -> DISARMED`，故障锁存。上电禁止；必须收到新鲜有效的 command、feedback、current、temperature、estop，并显式 arm。任一故障导致禁止。急停释放不清锁存；输入恢复并显式 reset 后仍禁止，必须再次 arm。

默认角度范围 ±1.2 rad、绝对电流 `<3 A`、温度 `<70°C`、每个通道超时 `>0.3 s` 触发。电流和温度独立计时，不能用持续到达的电流掩盖温度断流。无效/非有限指令、位置、传感值被拦截。无效来源必须收到有效值后才允许复位。温度 `<-50°C` 判为无效。

安全输出含位置目标和使能。禁止时 `safe_command` 保持最近有效位置反馈而不是命令零位，同时 `drive_enabled=false`。这不是对实际制动/断能的保证；下游驱动必须服从使能并有独立超时处理。

## 消息契约

默认节点名 `safety_guard`，`~` 为该节点私有命名空间。

| 输入／输出 | 消息 | 单位／含义 |
| --- | --- | --- |
| `~/command` 输入 | `std_msgs/Float64` | rad，目标位置与心跳 |
| `~/feedback` 输入 | `sensor_msgs/JointState` | 配置关节 `joint_1` 的 position，rad |
| `~/current` 输入 | `std_msgs/Float64` | A，允许有符号，按绝对值限流 |
| `~/temperature` 输入 | `std_msgs/Float64` | °C |
| `~/estop` 输入 | `std_msgs/Bool` | true=急停；必须周期发布，包括 false |
| `~/safe_command` 输出 | `std_msgs/Float64` | rad，受联锁位置目标 |
| `~/drive_enabled` 输出 | `std_msgs/Bool` | false 必须禁止驱动输出 |
| `/diagnostics` 输出 | `diagnostic_msgs/DiagnosticArray` | 10 Hz，状态、故障及各通道年龄 |
| `~/arm` / `~/reset_fault` / `~/disarm` | `std_srvs/Trigger` | 独立显式操作，不自动使能 |

`JointState` 要求 name 与 position 长度一致，配置关节恰好出现一次；velocity/effort 可空，否则长度也需一致；所有已提供数值必须有限。以本机 `time.monotonic()` 的接收时间做 watchdog，定时器显式使用 STEADY_TIME，不依赖 `/clock` 推进；header.stamp 留作记录，**不声称已验证端到端采样新鲜度**。可靠 QoS、KEEP_LAST=1、VOLATILE 限制排队，不构成防重放安全机制。

参数：`qMin`、`qMax`、`currentMax`、`temperatureMax`、`timeout`、`joint_name`。仅启动读取；运行时修改 ROS 参数不会改变内核，需停止并重启。应由驱动侧再设更严格的独立机械、电流及热限制。

## Ubuntu 24.04 / ROS 2 Jazzy：待执行的复现步骤

前置：已有并可 source 的 Jazzy，具有 colcon、ament_python、rclpy、common_interfaces 和 pytest。本任务没有安装依赖。将此目录放入独立工作空间 `src/safety_guard`，不要直接覆盖原工作空间包。

```bash
source /opt/ros/jazzy/setup.bash
cd ~/robotics_lab_ws
colcon build --packages-select safety_guard --symlink-install
source install/setup.bash
colcon test --packages-select safety_guard --event-handlers console_direct+
colcon test-result --verbose
ros2 run safety_guard guard
```

第二个终端（每个终端均需 source ROS 和工作空间）：

```bash
ros2 run safety_guard mock_joint --ros-args -p scenario:=estop
```

mock 默认不使能。启动后尽快在第三终端执行：

```bash
ros2 service call /safety_guard/arm std_srvs/srv/Trigger '{}'
ros2 topic echo /diagnostics
```

mock 在启动后 5–6 s 注入一次故障。可选场景：normal、estop、timeout、overcurrent、overtemperature、nonfinite、limit、feedback。故障恢复后手动检查复位不使能：

```bash
ros2 service call /safety_guard/reset_fault std_srvs/srv/Trigger '{}'
ros2 topic echo /safety_guard/drive_enabled
# 应仍为 false；随后另行 arm 才能重新使能
ros2 service call /safety_guard/arm std_srvs/srv/Trigger '{}'
```

mock 包含自身 100 ms 输出消息看门狗，但它也只是软件示意的一阶位置跟踪，不是机器人动力学仿真。需要保存日志时使用 `ros2 bag record /diagnostics /safety_guard/feedback /safety_guard/drive_enabled /safety_guard/safe_command`，具体 DDS 时延和丢包要在 VM 实测后报告。

## 不依赖 ROS 的测试

在本包目录：`python -B -m unittest discover -s test -p 'test_*.py' -v`。

在网站仓库根目录：

```bash
node scripts/test-robotics-safety.mjs
node scripts/test-robotics-safety.mjs --python /absolute/path/to/python3
```

第二条对同一动作序列逐步对比 TS 与 Python 快照，包括 startup、arm、急停、恢复复位、超时、NaN、越界、过流过温和 disarm。仅是核心语义等价，不证明 ROS 适配器运行正确。`test_core.py` 亦可由 colcon 的 pytest 收集。

## 已知边界

- watchdog 周期名义 20 ms，并非实时保证。进程冻结、系统调度停顿、驱动失控或断网时，本节点不能保证发出禁止信号。
- 独立软件 topic 分开发位置/使能，不是原子事务。下游必须采用 fail-closed 策略、校验新鲜度并独立超时；真实系统优先使用驱动器原生安全接口。
- 仅单关节位置指令；没有轨迹速度/加速度约束、力矩传感器安全、碰撞监测和多节点权限管理。
- 命令没有序号/发送时间、防重放或认证；入队陈旧数据的风险没有被本地接收超时完全解决。
- 阈值为演示假设，不能直接用作任何电机的额定值。

官方接口依据：[Jazzy rclpy 示例](https://github.com/ros2/examples/tree/jazzy/rclpy/topics/minimal_publisher)、[JointState](https://github.com/ros2/common_interfaces/blob/jazzy/sensor_msgs/msg/JointState.msg)、[diagnostic_msgs](https://github.com/ros2/common_interfaces/tree/jazzy/diagnostic_msgs/msg)。本包为独立实现。
