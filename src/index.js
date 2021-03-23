export default (
  canvas,
  {
    timeslice,
    duration,
    mimeType = 'video/webm',
    audioBitsPerSecond = 0,
    videoBitsPerSecond = 25000000,
  }
) =>
  new Promise((resolve, reject) => {
    try {
      const stream = canvas.captureStream();
      const blobs = [];
      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond,
        videoBitsPerSecond,
      });

      recorder.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          blobs.push(event.data);

          return;
        }

        if (blobs.length === duration / timeslice) {
          stream.getTracks()[0].stop();
          recorder.stop();

          resolve(new Blob(blobs, { type: mimeType }));
        }
      };

      recorder.start(timeslice);
    } catch (e) {
      reject(e);
    }
  });
