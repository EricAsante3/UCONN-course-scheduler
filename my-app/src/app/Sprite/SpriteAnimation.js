"use client";
import { useEffect, useState, useCallback } from "react";

function Sprite({ 
  numFrames = 6, 
  fps = 4, 
  pauseFrame = 6, 
  pauseDuration = 5000
}) {
  const [frame, setFrame] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) return;
    
    const timeout = setTimeout(() => {
      setIsPaused(false);
    }, pauseDuration);
    
    return () => clearTimeout(timeout);
  }, [isPaused, pauseDuration]);

  useEffect(() => {
    if (isPaused) return;

    let timeout;
    const tick = () => {
      let nextFrame;
      
      if (frame === 5) {
        const shouldPause = Math.random() < 0.1; 
        nextFrame = shouldPause ? pauseFrame : 1;
      } 
      else if (frame === pauseFrame) {
        nextFrame = 1;
      }
      else {
        nextFrame = frame + 1;
      }

      setFrame(nextFrame);
      if (nextFrame === pauseFrame) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(tick, 1000 / fps);
      }
    };

    timeout = setTimeout(tick, 1000 / fps);

    return () => clearTimeout(timeout);
  }, [frame, fps, isPaused, pauseFrame]);

  return (
    <div className="sprite-container">
      <div className="sprite-frame">
        <img
          src={`/UCONN-Course-Scheduler/Sleeping${frame}.png`}
          alt={`Sprite frame ${frame}`}
          width={64}
          height={64}
          className="sprite-image"
        />
      </div>

    </div>
  );
}

export default Sprite;