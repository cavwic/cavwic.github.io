# 未见工况随机化实验

这不是已经完成的 Sim-to-Real，也不是强化学习：仅在真实运行的 MuJoCo 环境中对 6 组控制参数进行有限网格搜索。

三种搜索分布：名义参数、物理随机化、物理加反馈延迟/位置命令增量噪声。候选每指目标力为 1.2/2.6/4.5 N，提起时长 0.75/1.2 秒。每种候选在三种物体、种子 300–303 上运行。按成功次数选择；平局选较小力、再选较短时间。所有 216 次候选试验保存在 training-trials.json。

选出的三个策略在同样的种子 800–809 × 三物体上配对测试，共 90 次。测试工况：质量 0.10–0.23 kg、摩擦 0.18–0.65、横向偏移 ±8 mm、偏航 ±0.18 rad、力反馈延迟 25–105 ms、位置命令增量高斯噪声 σ=0.04–0.16 mm。测试种子未参与选择。若两种搜索分布选到相同策略，配对结果相同；不保证随机化胜出。

成功判据：最后 0.7 秒全程质心高度至少 105 mm，最终 |x| 小于 60 mm。步长 2 ms。数据由 mj_step 接触动力学产生，不根据滑块估算成功率。

```powershell
& 'robotics-projects\.venv\Scripts\python.exe' robotics-projects/grasp/experiment.py --project randomization
node scripts/test-robotics-grasp.mjs
```

完整代码、物理假设和随机范围见 `robotics-projects/grasp/experiment.py` 和同目录 README。执行器与材料均为简化仿真模型；没有现实材料辨识、真实相机、接线或硬件测试，不能把该比例当现实成功率。

跨物体共享种子存在相关性：页面按种子整块重采样 2,000 次（固定 RNG seed 20261020），显示成功比例及相对名义策略的配对差的 percentile 95% 区间。只有 10 个种子块，区间不稳定；全成功/全失败时可能退化，不能当作确定性保证。原始 JSON 的 Wilson 值只作按试验计数的描述性参考。有限参数搜索和小样本不能证明全局最优或现实性能提升。

官方依据：[MuJoCo Python](https://mujoco.readthedocs.io/en/stable/python.html)、[模型 XML](https://mujoco.readthedocs.io/en/stable/XMLreference.html)。
