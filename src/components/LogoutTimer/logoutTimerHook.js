import React, { useState, useEffect } from "react";

const Timer = props => {
  const { initialMinutes = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const timeout = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          sessionStorage.clear();
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timeout);
    };
  }, [minutes, seconds]);

  return (
    <div>
      {minutes === 0 && seconds === 0 ? null : (
        <h1>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};
export default Timer;
