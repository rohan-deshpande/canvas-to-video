# canvas-to-video

## Overview

`canvas-to-video` is a simple API for writing out whatever is being rendered to your HTML5 canvas to video - all done natively in the browser.

This is especially useful for anyone wanting to create videos of things like [three](https://three.org) applications or games.

`canvas-to-video` uses the following core APIs

- [`captureStream`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream)
- [`MediaRecorder`](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

## Installation

```
npm i canvas-to-video
```

## Usage

The below code is a super simple example of how you can record whatever is being rendered to your canvas for the `duration` period.

```
import record from 'canvas-to-video';

const canvas = document.getElementById('canvas');
const button = document.getElementById('button');
const player = document.getElementById('player');
const options = {
  // the number of times you want to record per duration
  timeslice: 100,
  // the length of video you would like to record
  duration: 3000,
  mimeType: "video/webm",
  audioBitsPerSecond: 0,
  videoBitsPerSecond: 25000000
};

button.addEventListener('mousedown', async () => {
  const video = await record(canvas, options);
  const url = URL.createObjectURL(video);

  player.src = url;
});
```
