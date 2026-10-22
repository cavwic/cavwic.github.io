# Third-party assets

- MediaPipe Tasks Vision: exact version 1.1.0, Apache-2.0. Runtime WASM/loaders copied from the installed npm package to `/vendor/mediapipe/1.1.0/wasm/`. License retained in `/vendor/mediapipe/1.1.0/LICENSE`.
- Hand Landmarker: fixed official float16 model version 1, 7,819,105 bytes. Download: https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task
- Model SHA-256: `fbc2a30080c3c557093b5ddfc334698132eb341044ccee322ccf8bcf3607cde1`.
- Official MediaPipe source license: https://github.com/google-ai-edge/mediapipe/blob/master/LICENSE
- Official model card: https://storage.googleapis.com/mediapipe-assets/Model%20Card%20Hand%20Tracking%20%28Lite_Full%29%20with%20Fairness%20Oct%202021.pdf
- Three.js 0.186.1, MIT; rendered app bundles use the installed package. Retain the repository's node_modules package notices on redistribution.

Camera images and landmarks are processed locally by this page. Model assets are same-origin files, not page-time CDN downloads. Hosting requests still reach the site's host; this is not a claim that a public website makes no network requests.
