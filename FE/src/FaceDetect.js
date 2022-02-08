import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceDetect = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleVideo = async () => {
    console.log("chạy handleVideo");
    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      //Tạo ra canvas mới thay thế lên canvas mặc định
      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      //
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections); //Vẽ phần khuông tại gương mặt phát hiện được
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections); //Vẽ các điểm landmark trên gương mặt
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections); //Vẽ phần mô tả cảm xúc
    }, 300);
  };

  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]);
    console.log("Đã load xong models");
    handleVideo();
  };

  useEffect(() => {
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
          ref={videoRef}
          onPlay={onPlay}
          id="myVideo"
          height="400"
          width="800"
          style={{ position: "fixed" }}
          autoPlay
          muted
        >
          <source src="/assets/1.mp4" />
        </video>
        <canvas
          ref={canvasRef}
          height="400"
          width="800"
          style={{ position: "absolute" }}
        />
      </div>
    </div>
  );
};

export default FaceDetect;
