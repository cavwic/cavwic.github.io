# ROS 2 安全联锁实验：当前证据边界

浏览器页面运行本地 TypeScript 状态机和故障注入，不连接 ROS 或设备。ROS 2 Jazzy ament_python 包源码位于 `robotics-projects/ros2/safety_guard/`。尚未在 Ubuntu VM 执行 colcon 或 ROS 通信测试。

软件联锁不是安全认证，不替代硬件急停、STO、安全继电器或驱动器独立看门狗。

状态：DISARMED → ARMED → FAULT → DISARMED。上电禁止；有效且新鲜的命令、位置、电流、温度、急停状态和显式 arm 才使能。任一故障锁存；恢复信号不自动恢复，reset 只回 DISARMED，必须再 arm。

默认限制：±1.2 rad；|I|<3 A；T<70°C；每个通道最后收到消息超过 300 ms 触发。过流、过温、NaN/Infinity、越界及反馈无效均禁止输出。禁止时输出最新有效位置反馈作为保持目标，并发送 drive_enabled=false；下游必须服从使能，不能由本页保证物理断能。

页面示意：2–3 s 注入故障；3.2 s 显式复位；4 s 重新使能。步长 20 ms。模拟响应间隔不是摄像头、ROS 网络或真机实测延迟。超时从上一条消息开始计时，不是从注入开始重新计时。位置运动是第一阶示意，不用于稳定性或机械负载结论。

ROS 接口（默认节点 safety_guard）：

- 输入：`~/command` Float64 rad，`~/feedback` JointState，`~/current` Float64 A，`~/temperature` Float64 °C，`~/estop` Bool。
- 输出：`~/safe_command` Float64 rad，`~/drive_enabled` Bool，`/diagnostics` DiagnosticArray。
- 服务：`~/arm`、`~/reset_fault`、`~/disarm`，均为 Trigger。
- watchdog 使用本机单调时钟接收时间；不声称已验证远端采样年龄或防重放。

无 ROS 核心测试：`node scripts/test-robotics-safety.mjs`。TS/Python 对照：`node scripts/test-robotics-safety.mjs --python /absolute/path/to/python3`。Python 包目录下：`python -B -m unittest discover -s test -p 'test_*.py' -v`。

Ubuntu 待验证：将包复制到独立 `~/robotics_lab_ws/src/safety_guard`；source Jazzy 后执行 `colcon build --packages-select safety_guard --symlink-install`、`colcon test --packages-select safety_guard`；source 工作空间，分别运行 `ros2 run safety_guard guard` 和 `ros2 run safety_guard mock_joint --ros-args -p scenario:=estop`，手动调用 `/safety_guard/arm`、`/safety_guard/reset_fault`，观察 `/diagnostics` 和 `/safety_guard/drive_enabled`。完整步骤及限制在包内 README。

官方参考：https://github.com/ros2/examples/tree/jazzy/rclpy/topics/minimal_publisher ，https://github.com/ros2/common_interfaces/tree/jazzy/diagnostic_msgs/msg ，https://github.com/ros2/common_interfaces/blob/jazzy/sensor_msgs/msg/JointState.msg
