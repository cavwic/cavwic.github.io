import { benchmark,modelKinematicsId } from './engine';
self.onmessage = ({data}) => {
  const pinchWeight=Number.isFinite(data.pinchWeight)?Math.max(0,Math.min(8,data.pinchWeight)):1.5;
  try { self.postMessage({ type: 'result', report: { modelKinematicsId,...benchmark({frames:36,seed:42,gestures:['open','fist','pinch','point','spread','wave'],ik:{pinchWeight}}), conditions:{pinchWeight,enforceLimits:true,inputFilterSeconds:0,outputSmoothingSeconds:0,personalCalibration:false},stressTest:benchmark({frames:24,seed:42,gestures:['unreachable'],ik:{pinchWeight}}) } }); }
  catch (error) { self.postMessage({ type: 'error', message: String(error) }); }
};
