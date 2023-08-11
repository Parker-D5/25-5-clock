import './App.scss';
import React, { useEffect, useState } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [title, setTitle] = useState("Session");
  const [play, setPlay] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);
  

  


  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  }

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  }

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  }

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(timeLeft - 60);
    }
  }

  const handleReset = () => {
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTitle("Session");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    setPlay(!play);
    if (play === false) {
      console.log("play if false so time left is" + timeLeft);
    }
    console.log("Value of play:   "+play);
  }

  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && title == "Session") {
      setTimeLeft(breakLength * 60);
      setTitle("Break");
      audio.currentTime = 0;
      audio.play();
    }
    if (!timeLeft && title == "Break") {
      setTimeLeft(sessionLength * 60);
      setTitle("Session");
      audio.currentTime = 0;
      audio.play();
    }
  }

  const clock = () => {
    
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (timeLeft && play === true) {
        setTimeLeft(timeLeft - 1);
        console.log(timeout);
      }else{
        console.log("not playing");

      }
    }, 1000);

    if (play) {
      resetTimer();
      console.log("playing");
    } else {
      console.log("paused");
    }
    return () => clearTimeout(timeout);
  }, [timeLeft, play]);

  const formatTime = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="title">25 + 5 Clock</h1>
        <div className="timers">
          <div className="break container">
            <h2 id="break-label">Break Length</h2>
            <div className="input">
              <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">decrement</button>
              <p id="break-length">{breakLength}</p>
              <button disabled={play} onClick={handleBreakIncrease} id="break-increment">increment</button>
            </div>
          </div>
          <div className="session container">
            <h2 id="session-label">Session Length</h2>
            <div className="input">
              <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">decrement</button>
              <p id="session-length">{sessionLength}</p>
              <button disabled={play} onClick={handleSessionIncrease} id="session-increment">increment</button>
            </div>
          </div>
        </div>
        <div className="output">
          <div className="display">
            <h2 id="timer-label">{title}</h2>
            <p id="time-left">{formatTime()}</p>
          </div>
          <div className="controls">
            <button onClick={handlePlay} id="start_stop">Start</button>
            <button onClick={handleReset} id="reset">Reset</button>
          </div>
        </div>
        <audio src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" id="beep" preload="auto"></audio>
      </div>
    </div >
  );
}

export default App;
