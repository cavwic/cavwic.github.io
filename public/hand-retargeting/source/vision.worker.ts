import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

let detector: HandLandmarker | undefined;
let lastTimestamp = 0;
const channel = self as unknown as { postMessage: (message: unknown) => void; onmessage: ((event: MessageEvent) => void) | null };
channel.onmessage = async ({ data }) => {
  try {
    if (data.type === 'init') {
      const vision = await FilesetResolver.forVisionTasks(data.wasmRoot, true);
      detector = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: data.modelUrl, delegate: 'CPU' },
        canvas: new OffscreenCanvas(640, 480),
        runningMode: 'VIDEO', numHands: 1,
        minHandDetectionConfidence: 0.6, minHandPresenceConfidence: 0.6, minTrackingConfidence: 0.6,
      });
      channel.postMessage({ type: 'ready' });
    } else if (data.type === 'frame' && detector) {
      const bitmap: ImageBitmap = data.bitmap;
      try {
        lastTimestamp = Math.max(data.timestamp, lastTimestamp + 0.01);
        const start = performance.now();
        const result = detector.detectForVideo(bitmap, lastTimestamp);
        channel.postMessage({ type: 'result', session: data.session, sampledAtMs:data.sampledAtMs,landmarks: result.landmarks, worldLandmarks: result.worldLandmarks,
          handedness: result.handedness, inferenceMs: performance.now() - start });
      } finally { bitmap.close(); }
    }
  } catch (error) {
    data.bitmap?.close();
    channel.postMessage({ type: 'error', session: data.session, message: String(error) });
  }
};
