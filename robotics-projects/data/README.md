# 离线 rosbag2 → 数据诊断 JSON

`convert_rosbag.py` 是只读转换器。支持由 rosbags AnyReader 读取的 rosbag2 目录，包括 SQLite3 / MCAP 存储；输入必须是含 `metadata.yaml` 的原始录包目录，不承诺任意独立 `.mcap` 文件或自定义编码可读。它不启动 ROS、不接设备、不修改 bag。

当前验证：转换核心用标准库 mock 消息测试；另已使用 `rosbags 0.11.9`、`numpy 2.3.5`，将合成消息真实 CDR 序列化写入临时 ROS2 SQLite3 和 MCAP bag，再通过 AnyReader 读回、转换 JSON，并由网站实际 TypeScript schema/audit 复核。**这是合成 bag 序列化实测，不是真机录包验证，也没有启动 ROS/DDS 通信。** 用户实际录包、自定义消息及压缩格式仍需另验。

本项目已有 Python 环境 `robotics-projects/.venv/Scripts/python.exe` 可运行上述测试；命令行读包需要 Python 3.10+、rosbags（含 ROS2_JAZZY typestore）和 numpy。转换器不会自动下载或安装依赖。

## 明确映射后才转换

网站要求 Dataset `version:1`。每行以 position topic 的一条消息为锚点，输出 episode、split、bag 接收时间、传感和命令时间、位置/目标、电流、温度。必须主动指定 topics、单位、关节名称和时间来源，不猜单位、不把缺失补成零。

以下是本项目 safety_guard mock 的映射示例；实际 topic 必须自行核对：

```bash
python -B robotics-projects/data/convert_rosbag.py \
  --bag /absolute/path/to/recorded_bag \
  --output /absolute/path/to/new-review.json \
  --position-topic /safety_guard/feedback --position-field position --position-unit rad \
  --joint-names joint_1 --sensor-time-source header \
  --command-topic /safety_guard/command --command-field data --command-unit rad \
  --command-time-source receive \
  --current-topic /safety_guard/current --current-field data --current-unit A \
  --temperature-topic /safety_guard/temperature --temperature-field data --temperature-unit C \
  --max-join-age-ms 50 --episode mock-episode-1 --split test \
  --start-seconds 0 --duration-seconds 20
```

PowerShell 请把续行的 `\` 改为反引号，或写为单行。`--split` 必填，不能由转换器猜训练/验证/测试。单次只生成一个 episode；多个 bag 不自动合并或重排。

可接受单位：位置/命令 `rad` 或 `deg`，电流 `A` 或 `mA`，温度 `C` 或 `K`。输出统一 rad / A / °C。JointState 的 `position` 按 `--joint-names` 重排；普通数组按声明顺序使用，维度不匹配为 null。字段路径只允许公开属性，如 `data` 或 `position`，不执行表达式。

命令、电流、温度使用因果最近已接收值，超过 join age 为 null；不取未来值、不插值。录包中同一接收时间的消息按 reader 原始迭代顺序处理，不回填稍后出现的数据。首个 position 行可能因其他消息尚未到达而缺字段，应该交给质量审计标记，不是悄悄删除。

如只有关节位置而没有电流等 topic，可省略对应 topic 和单位；输出缺失字段为 null，浏览器将报告 SCHEMA。这是诚实呈现录包缺项，不是已构成完整训练数据集。

## 时间解释

- `timestampMs`：bag 接收戳相对本次窗口第一条所选消息的毫秒数。
- `sensorTimestampMs`：显式选择 header 或 receive 后，相对同一原点。
- `commandTimestampMs`：同理。Float64 没有 header，必须选 receive；选择 header 又不存在时保留 null，不回退。
- `_source` 保存 bag/header 的原始纳秒戳字符串，避免 JavaScript 大整数精度丢失。
- header 全零照原样保留，让审计报告时间异常；不自动解释成已同步或替换。

header 与接收戳差值可能包含不同的时钟域、发布时间、记录时间和队列影响。**它不是测得的网络延迟。** 选择 receive 会减少可观察的源端时间信息，不能用零偏移证明网络无延迟。

## 输出与边界

源 bag 只读。输出不得位于源 bag 内；默认采用 exclusive create，已有输出拒绝覆盖。仅 `--force` 明确允许覆盖指定输出 JSON，不允许覆盖源 bag。父目录必须已存在。超过网站 20,000 行 / 8 MB 限制时报错，不静默截断；用 start/duration 选取较小窗口。

回归测试（不需要 rosbags / ROS）：

```bash
cd robotics-projects/data
python -B -m unittest -v test_convert_rosbag.py
```

12 项覆盖单位转换、JointState 名称映射、因果拼接、过期/缺失/null、NaN、时间域、输出保护和 frame cap。mock 测试不证明真实 bag 可读。

合成 bag 序列化回归（需要 rosbags / numpy / Node 22.18+，不需要 ROS）：

```powershell
# 从网站仓库根目录
robotics-projects/.venv/Scripts/python.exe -B -m unittest discover -s robotics-projects/data -p 'test_*.py' -v
```

共 17 项（12 mock + 5 roundtrip）。`test_roundtrip.py` 在系统临时目录创建并清理测试 bag，包含四个 topic：command、current、temperature、feedback；20 个位置锚点。SQLite3 和 MCAP 均经过真正 Writer/AnyReader/CDR 路径，完整字段下由网站 audit 得到 20 有效行、0 问题；显式 receive 时间选择保留原始 header；Float64 指令要求不存在的 header 时保留 null，由网站确认 20 条 SCHEMA，而非伪造时间。另测试实际 CLI 读取及默认拒绝覆盖输出。

自定义消息缺少定义、压缩/存储格式兼容、DDS 录包丢失、节点时钟同步均须在实际数据上另验。所有输出仍明确来源；“成功转换合成 bag”不能推导为真实硬件数据准确。

API 依据：[rosbags AnyReader 官方说明](https://ternaris.gitlab.io/rosbags/topics/highlevel.html)、[API](https://ternaris.gitlab.io/rosbags/api/rosbags.highlevel.html)、[rosbag2 存储支持](https://ternaris.gitlab.io/rosbags/topics/rosbag2.html)。本脚本独立实现。
