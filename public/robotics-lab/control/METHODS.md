# 单关节控制实验：方法和边界

这是浏览器数值实验，不是电机或真机采集。默认常数为教学假设。

模型：J qdd = torque + load − b qd − Tc tanh(qd/0.02) − g sin(q)。角度 rad、力矩 N·m、惯量 kg·m²。力矩限幅、关节硬限位、零阶保持控制、2 ms RK4 积分。硬限位使用非弹性速度投影，不模拟碰撞刚度。

PID 微分作用于测量；抗饱和采用条件积分：会加重饱和时不更新积分。默认目标在 0.5 s 启动，3–4 s 施加反向外部负载。调整参数不保证抗饱和在每个指标上都优于基线。不可达目标用来展示机构约束，不能用控制器突破。

指标：0.5 s 后全段 RMSE；扰动前阶跃超调与 2% / 最少 0.005 rad 的调节时间（保持至少 0.25 s）；最后 0.5 s 平均绝对误差；全段饱和样本占比。正弦不报告阶跃超调和调节时间。没有收敛时为 null。

辨识：固定种子多正弦开环激励 + 小幅均匀测量噪声；加速度从速度中心差分获得。线性最小二乘拟合惯量、阻尼、摩擦和重力系数。丢弃限位附近样本，检查激励和非物理解。结果只证明合成数据处理流程，不能证明真实关节参数。

JSON 导出两种控制器全量样本和完整配置；CSV 为抗饱和样本。复现：仓库根目录执行 `node scripts/test-robotics-control.mjs`（Node 22.18+）。源码在 `src/features/robotics-lab/control/`，项目说明在 `robotics-projects/control/README.md`。

不包含真实传感、驱动器、电流环、齿隙、柔性腱索和热模型。该页不构成硬件选型或闭环安全认证。

方法参考：https://www.mathworks.com/help/simulink/slref/anti-windup-control-using-a-pid-controller.html
