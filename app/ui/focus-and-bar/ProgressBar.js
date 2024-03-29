import React from "react";

function ProgressBar({ session, focusDuration, breakDuration }) {
  if (session) {
    function calculatePercetage() {
      let currentSeconds = 0;
      session.label === "Focusing"
        ? (currentSeconds = focusDuration)
        : (currentSeconds = breakDuration);
      const seconds = currentSeconds * 60;
      let percentage = Math.round(
        ((seconds - session.timeRemaining) / seconds) * 100
      );
      return percentage;
    }

    function calculateAriaValue() {
      let durationSeconds = 0;
      let ariaValue = 0;
      session.label === "Focusing"
        ? (durationSeconds = focusDuration)
        : (durationSeconds = breakDuration);
      const seconds = durationSeconds * 60;
      if (session.timeRemaining == seconds) {
        return ariaValue;
      } else {
        ariaValue = Math.round(
          ((seconds - session.timeRemaining) / seconds) * 100
        );
        return ariaValue;
      }
    }

    return (
      <div
        className="progress w-full bg-slate-600 rounded"
        style={{ height: "20px" }}
      >
        <div
          className="progress-bar bg-red-500 h-full rounded"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={calculateAriaValue()} // TODO: Increase aria-valuenow as elapsed time increases
          style={{ width: calculatePercetage() + "%" }} // TODO: Increase width % as elapsed time increases
        />
      </div>
    );
  } else {
    return null;
  }
}

export default ProgressBar;
