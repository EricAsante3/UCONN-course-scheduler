"use client";
import { useEffect, useState, useCallback } from "react";

function getRandomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

function Sprite({ 
  fps = 8, 
  pauseFrame = 6, 
  pauseDuration = getRandomNumber(2500, 4000),
  walkingDuration = 8000,
  rightBorder = 80,
}) {
  const [stage, setStage] = useState("Sleeping");
  const [frame, setFrame] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [motionUp, setMotionUp] = useState(true);
  const [currentDir, setCurrentDir] = useState("Left");
  const [currentCorr, setCurrentCorr] = useState(0);

    const [leftBorder, setLeftBorder] = useState(-100); // default value

  useEffect(() => {
    function updateLeftBorder() {
      const width = window.innerWidth;
      if (width >= 1280) setLeftBorder(-420);    // xl
      else if (width >= 768) setLeftBorder(-250);  // md
      else if (width >= 640) setLeftBorder(-150);  // sm
      else setLeftBorder(-100);                      // default (mobile)
    }

    updateLeftBorder(); // run on mount

    window.addEventListener('resize', updateLeftBorder);
    return () => window.removeEventListener('resize', updateLeftBorder);
  }, []);


  useEffect(() => {
    if (stage !== "Walking") return;
    
    const timeout = setTimeout(() => {
      setMotionUp(false)
      setStage("Transition")
      setFrame(1)
    }, walkingDuration);
    
    return () => clearTimeout(timeout);
  }, [stage, walkingDuration]);



  useEffect(() => {
    if (!isPaused) return;
    
    const timeout = setTimeout(() => {
      setIsPaused(false);
    }, pauseDuration);
    
    return () => clearTimeout(timeout);
  }, [isPaused, pauseDuration]);



  useEffect(() => {
    if (isPaused) return;
    if (stage !== "Transition") return;

    let timeout;


    const tick = () => {
      let nextFrame;
      


      if (!motionUp) {

        if (frame === 5) {
          setStage("Sleeping")
          nextFrame = 1;
        }
        else {
          nextFrame = frame + 1;
        }


      } else {
        
        if (frame === 0) {
          setStage("Walking")
          nextFrame = 1;
        }
        else {
          nextFrame = frame - 1;
        }


      }

      setFrame(nextFrame);

      timeout = setTimeout(tick, 1000 / fps);
    };
    timeout = setTimeout(tick, 1000 / fps);

    return () => clearTimeout(timeout);
  }, [frame, fps, isPaused, pauseFrame]);



  useEffect(() => {
    if (isPaused) return;
    if (stage === "Transition") return;

    if (frame > 10) return


    let timeout;
    const tick = () => {
      let nextFrame;
      
      if (frame === 5 && stage === "Sleeping") {
        const shouldPause = Math.random() < 0.1; 
        if (shouldPause) {      
          pauseDuration = getRandomNumber(2500, 5000)    
          nextFrame = pauseFrame
        } else {
          nextFrame = 1;

        }
      }
      else if (frame === 8 && stage === "Walking") {
          setCurrentCorr(prev => {
            let newCorr = prev;

            if (currentDir === "Left") {
              if (prev - 5 < leftBorder) {
                setCurrentDir("Right"); // change direction
              } else {
                newCorr = prev - 5;
              }
            } else if (currentDir === "Right") {
              if (prev + 5 > rightBorder) {
                setCurrentDir("Left"); // change direction
              } else {
                newCorr = prev + 5;
              }
            }

            const changeDirection = Math.random() < 0.09;
            if (changeDirection) {
              currentDir === "Left" ? setCurrentDir("Right") : setCurrentDir("Left");
            }


            return newCorr;
          });
        nextFrame = 1;
      }
      else if (frame === pauseFrame && stage === "Sleeping") {
        const switchStage = Math.random() < 0.5; 
        if(switchStage) {
          setMotionUp(true)
          setStage("Transition")
        }
        nextFrame = 5;
      }
      else {
        if (stage === "Walking") {

          setCurrentCorr(prev => {
            let newCorr = prev;

            if (currentDir === "Left") {
              if (prev - 5 < leftBorder) {
                setCurrentDir("Right"); // change direction
              } else {
                newCorr = prev - 5;
              }
            } else if (currentDir === "Right") {
              if (prev + 5 > rightBorder) {
                setCurrentDir("Left"); // change direction
              } else {
                newCorr = prev + 5;
              }
            }
            return newCorr;
          });
        }

        nextFrame = frame + 1;
      }
      setFrame(nextFrame);
      if (nextFrame === pauseFrame && stage === "Sleeping") {
        setIsPaused(true);
      } else if (stage === "Sleeping") {
        timeout = setTimeout(tick, 1000 / fps);
      }
    };

    timeout = setTimeout(tick, 1000 / fps);

    return () => clearTimeout(timeout);
  }, [frame, fps, isPaused, pauseFrame]);






  return (
    <>
    { frame <= 8 ? (

    <div className="sprite-container">
      <div className="sprite-frame">
        <img
          src={`/${stage}${frame}.png`}
          alt={`Sprite frame ${frame}`}
          width={56}
          height={56}
          className={`sprite-image relative ${currentDir === "Right" ? "scale-x-[-1]" : ""} ${stage === "Walking" ? "-top-2" : ""} `}
          style={{ left: `${currentCorr}px` }}/>
      </div>

    </div>)
    :
    null
  }
  </>
  );
}

export default Sprite; 