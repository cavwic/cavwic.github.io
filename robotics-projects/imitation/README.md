# 官方 LeRobot ACT：低维动作分块模仿学习

此项目实际调用官方 `lerobot.policies.act.modeling_act.ACTPolicy` 训练和推理，不是手写规则包装的ACT，也不是视频或真机模仿。任务是二维运动学点末端到达随机目标，可用于理解数据隔离、行为克隆、动作分块、CVAE目标、闭环评估与模型保存。不能据此宣称完成机械臂抓取或灵巧操作。

## 重现

在仓库根目录运行：

```powershell
robotics-projects\.training-venv\Scripts\python.exe robotics-projects\imitation\run.py --steps 1000
node scripts/test-robotics-learning.mjs
```

使用项目独立 `.training-venv` Python环境，CPU训练；环境只读复用本机现有PyTorch安装，不修改原软件。运行需要官方LeRobot、torch、torchvision、numpy、einops、draccus、huggingface-hub、safetensors及LeRobot配置/优化器所需轻依赖。实际版本记录在生成结果中，当前集成目标是LeRobot 0.6.1。没有下载视觉预训练权重，没有请求云端推理，没有上传模型或数据。

本次实际测试的组合是Python3.13.12、LeRobot0.6.1、torch2.12.1+cu130、torchvision0.27.1、NumPy2.5.2、packaging26.3。后四项超出LeRobot0.6.1声明的依赖上限；能在本机完成本实验，不等于官方支持或可保证跨机器兼容。结果JSON逐项记录实际版本、官方约束及是否落在约束内。没有修改官方ACT源码来跳过错误。新机器建议建立独立环境并使用 `requirements-supported.txt` 的官方范围组合，而不是覆盖本机ComfyUI依赖。

## 实验契约

- 180个训练episode、30个验证episode、40个测试episode，种子范围互不交叉。先分episode，再生成状态/动作窗口；标准化不跨集合拟合，当前所有数值均为有界任务坐标，直接输入网络，不使用隐藏真值状态。
- 观测 `observation.state=[x,y]`，`observation.environment_state=[goal_x,goal_y]`，动作是二维速度。目标作为显式可观测任务输入，不作为评测时的直接控制器。位置更新 `p_next=clip(p+dt*clip(action), -1.2,1.2)`，只使用模型输出。
- 专家仅用于示教：速度为 `clip(2*(goal-p),-.5,.5)`。评测循环没有调用该专家。初始位置和目标在[-0.8,0.8]范围采样，距离至少0.35。
- 官方ACT小模型：dim_model64、4 heads、2 encoder层、1 decoder层、CVAE编码器1层、latent8、KL权重0.01、动作块8步、每次执行4步后重新观测。调用官方 `select_action` 管理动作队列，每个新episode先reset。
- 学习基线为同一示教集训练的MLP BC（4→64→64→2，tanh）；另有零动作基线。ACT和MLP各自在验证集选择最优checkpoint，测试集不参与模型选择。
- 每种方法在40个未见测试episode上运行60步。Nominal与Perturbed使用相同测试种子，后者在第15步施加固定位置扰动[0.18,-0.15]。额外Unseen-goals在不重训的情况下，把目标放到[±1.10,±1.10]四角，超出训练目标范围但仍在可达工作区内，用来检验分布外泛化。成功要求末5步距离均小于0.06任务单位。误差不是毫米；没有机器人尺寸或物理校准。
- 页面报告成功数/比例、Wilson 95%区间、最终误差、完整成功与失败轨迹及训练曲线。全部测试episode保留，没有挑选最佳轨迹。推理只使用checkpoint重新加载后的模型，保存SHA256校验。

## 产物

- `act_checkpoint.pt`：官方ACT权重及元信息；`mlp_checkpoint.pt`：行为克隆基线。
- `demonstrations.npz`：实际训练/验证示教数据；测试初始条件由公开种子独立生成。
- `config.json`：本次实际运行参数；`public/robotics-lab/imitation/results.json`：网页回放、损失和评测记录。

这是小规模CPU训练和低维闭环，不是官方机器人benchmark成绩，不代表视觉任务、碰撞接触、实际控制延迟或真机泛化。

## 方法来源

- ACT论文：Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware，https://arxiv.org/abs/2304.13705
- 官方LeRobot ACT实现：https://github.com/huggingface/lerobot/tree/v0.6.1/src/lerobot/policies/act
- 官方文档：https://huggingface.co/docs/lerobot/act

官方ACT允许环境状态作为图像的替代输入；这是本实验选择低维输入的依据。使用完整官方模型类，但缩小了网络和任务，并不复现原论文硬件实验。
