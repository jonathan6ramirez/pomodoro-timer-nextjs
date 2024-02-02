import React from "react";
import "./circle.css";
import { secondsToDuration } from "@/app/lib/utils";

const CircleProgressBar = ({
  circleWidth,
  session,
  focusDuration,
  breakDuration,
  children,
}) => {
  // const radius = 85;
  // const dashArray = radius * Math.PI * 2;
  // const dashOffset = dashArray - (dashArray * percentage) / 100;

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

    const radius = 200;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * calculatePercetage()) / 100;

    // Adjust these values as needed to position your texts
    const labelYPosition = circleWidth / 2 - 10; // Position for the session label
    const timeYPosition = circleWidth / 2 + 40; // Position for the session time remaining

    return (
      <div>
        <svg
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        >
          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth="15px"
            r="150"
            className="circle-background"
          />
          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth="15px"
            r="150"
            className="circle-progress"
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
            transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          />
          {/* children here */}
          {/* {children} */}
          {/* Session Label */}
          <text
            x="50%"
            y={labelYPosition} // Adjust this value to move the label up or down
            text-anchor="middle"
            className="circle-text"
          >
            {session.label}
          </text>
          {/* Time Remaining */}
          <text
            x="50%"
            y={timeYPosition} // Adjust this value to move the time display up or down
            text-anchor="middle"
            className="circle-text"
          >
            {secondsToDuration(session.timeRemaining)}
          </text>
        </svg>
      </div>
    );
  } else {
    return null;
  }
};

export default CircleProgressBar;
