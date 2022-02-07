import React, { useEffect, useRef } from "react";
// import * as faceapi from "face-api.js";

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//   faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//   faceapi.nets.faceExpressionNet.loadFromUri("/models"),
// ]).then(console.log("Đã load xong model"));

const FaceDetect = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      ])
        .then(console.log("Đã load xong models"))
        .catch((e) => console.log(e));
    };
    videoRef.current && loadModels();
  }, []);
  // var video;
  // useEffect(() => {
  //   video = document.getElementById("myVideo");
  // });

  // const onPlay = () => {
  //   console.log("Đã play video");
  //   let rect = video.getBoundingClientRect();
  //   console.log("x: " + rect.x);
  //   console.log("y: " + rect.y);
  //   const canvas = faceapi.createCanvasFromMedia(video);
  //   console.log(canvas);
  //   canvas.style.top = rect.y;
  //   canvas.style.left = rect.x;
  //   document.body.append(canvas);
  //   const displaySize = { width: video.width, height: video.height };
  //   faceapi.matchDimensions(canvas, displaySize);
  //   setInterval(async () => {
  //     const detections = await faceapi
  //       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceExpressions();
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  //     faceapi.draw.drawDetections(canvas, resizedDetections);
  //     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  //     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  //   }, 100);
  // };

  const onPlay = () => {
    console.log("Play!!!!!!");
  };
  return (
    <div>
      <h1>Face</h1>
      <div className="camera-container" display="flex">
        <video
          controls
          onPlay={onPlay}
          id="myVideo"
          height="400"
          width="800"
          style={{ position: "fixed" }}
          // autoPlay
          muted
        >
          <source src="/assets/1.mp4" />
        </video>
        <canvas height="400" width="800" style={{ position: "absolute" }} />
      </div>
    </div>
  );
};

export default FaceDetect;
