import './App.css';
import React, { useCallback } from 'react';

function App() {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, seTtimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");
  const [play, setPlay] = React.useState(false);

  const resetTimer = useCallback(() => {
    const audio = document.getElementById("beep");
    if (timeLeft === 0) {
      if (timingType === "SESSION") {
        seTtimeLeft(breakLength * 60);
        setTimingtype("BREAK");
        audio.play();
      } else {
        seTtimeLeft(sessionLength * 60);
        setTimingtype("SESSION");
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }, [timeLeft, timingType, breakLength, sessionLength]);

  React.useEffect(() => {
    let timeout;
    if (play) {
      timeout = setTimeout(() => {
        if (timeLeft > 0) {
          seTtimeLeft(timeLeft - 1);
        } else {
          resetTimer();
        }
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [play, timeLeft, resetTimer]);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    setPlay(!play);
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="App">
  <div className="wrapper">
    <h2 className="title">25 + 5 Clock</h2>
    <div className="break-session-length">
      <div>
        <h3 className="title" id="break-label">Break Length</h3>
        <div className="controls">
          <button className="up" disabled={play} onClick={handleBreakIncrease} id="break-increment">+</button>
          <strong id="break-length">{breakLength}</strong>
          <button className="down" disabled={play} onClick={handleBreakDecrease} id="break-decrement">-</button>
        </div>
      </div>
      <div>
        <h3 className="title" id="session-label">Session Length</h3>
        <div className="controls">
          <button className="up" disabled={play} onClick={handleSessionIncrease} id="session-increment">+</button>
          <strong id="session-length">{sessionLength}</strong>
          <button className="down" disabled={play} onClick={handleSessionDecrease} id="session-decrement">-</button>
        </div>
      </div>
    </div>
    <div className="timer-wrapper">
      <div className="timer">
        <h2 className="title" id="timer-label">{title}</h2>
        <h3 id="time-left">{timeFormatter()}</h3>
      </div>
      <button onClick={handlePlay} id="start_stop" className={play ? "play active" : "play"}>{play ? "Stop" : "Start"}</button>
      <button onClick={handleReset} id="reset">Reset</button>
    </div>
  </div>
  <audio
    id="beep"
    preload="auto"
    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
  />
</div>
  );
}

export default App;
