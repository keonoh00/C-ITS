"use client";

import React, { useRef } from "react";
import { Play, Pause, StopCircle } from "lucide-react";

export default function MoviePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-base-900">
      <div className="w-[60%] aspect-4/3 bg-black flex items-center justify-center">
        {/* You can replace this with an actual <video> if needed */}
        <span className="text-neutral-400 text-lg">무비 들어 가는곳</span>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePlay}
          className="bg-base-800 hover:bg-base-700 p-3 rounded border border-base-700"
        >
          <Play size={24} className="text-white" />
        </button>
        <button
          onClick={handlePause}
          className="bg-base-800 hover:bg-base-700 p-3 rounded border border-base-700"
        >
          <Pause size={24} className="text-white" />
        </button>
        <button
          onClick={handleStop}
          className="bg-base-800 hover:bg-base-700 p-3 rounded border border-base-700"
        >
          <StopCircle size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
