# 双指抓取实验

真实 MuJoCo CPU 动力学记录；网页是回放器，不是浏览器即时物理引擎。

模型：有自由关节的刚体物体、两根滑动手指、一个提起滑台，限力位置执行器。无焊接或脚本移动物体。比较固定闭合量、名义几何适配、接触力闭环三种方法，物体为立方块、圆柱和刚性薄片。每组使用同样的 12 个种子（100–111），共 108 次。

成功：最后 0.7 秒全程物体质心高度至少 105 mm，最终横向偏移小于 60 mm。时间步长 2 ms，每 20 ms 保存位置、四元数、接触点、法向力和执行器状态。

复现（仓库根目录）：

```powershell
& 'robotics-projects\.venv\Scripts\python.exe' robotics-projects/grasp/experiment.py --project grasp
node scripts/test-robotics-grasp.mjs
```

完整模型和控制器：`robotics-projects/grasp/experiment.py`；详细说明：`robotics-projects/grasp/README.md`。网页下载的 model.xml 是名义长方体工况，其他工况通过脚本按逐次记录中的 condition 生成。

边界：刚体、理想执行器、近似软接触；没有真实触觉、损伤、温升、电池或视觉模型。机械绝对功不等于电耗。二维图是实际三维轨迹的投影，不是完整三维视图。Wilson 95% 区间只作小样本描述性近似；相同种子跨物体的物理参数相关。未进行实物验证。

官方依据：[Python](https://mujoco.readthedocs.io/en/stable/python.html)、[XML/接触与执行器](https://mujoco.readthedocs.io/en/stable/XMLreference.html)。
