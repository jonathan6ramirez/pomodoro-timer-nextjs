"use client";
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import { minutesToDuration } from "./lib/utils";
import useInterval from "./lib/useInterval";
import classNames from "./lib/class-names";

import ProgressBar from "./ui/focus-and-bar/ProgressBar";
import SessionLabel from "./ui/focus-and-bar/SessionLabel";

import FocusMinus from "./ui/Focus-Buttons/FocusMinus";
import FocusPlus from "./ui/Focus-Buttons/FocusPlus";

import BreakPlus from "./ui/BreakButtons/BreakPlus";
import BreakMinus from "./ui/BreakButtons/BreakMinus";

import StopButton from "./ui/StopButton/StopButton";

import CircleProgressBar from "./ui/focus-and-bar/CircleProgressBar";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

export default function Page() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  // Decrease and increase handlers for focus duration
  const handleFocusDecrease = () => {
    if (focusDuration <= 5) {
      return null;
    } else {
      setFocusDuration((currentValue) => currentValue - 5);
    }
  };
  const handleFocusIncrease = () => {
    if (60 <= focusDuration) {
      return null;
    } else {
      setFocusDuration((currentValue) => currentValue + 5);
    }
  };

  // Decrease and increase handlers for break duration
  const handleBreakDecrease = (value) => {
    if (breakDuration <= 1) {
      return null;
    } else {
      setBreakDuration((currentValue) => currentValue - 1);
    }
  };
  const handleBreakIncrease = (value) => {
    if (15 <= breakDuration) {
      return null;
    } else {
      setBreakDuration((currentValue) => currentValue + 1);
    }
  };

  // Reset the session
  const handleReset = () => {
    setIsTimerRunning(false);
    setSession(null);
  };

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  const playPause = () => {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18 lg:py-10 dark:bg-slate-900">
      <div className="flex lg:w-auto justify-evenly bg-slate-700 lg:p-6 rounded-md">
        <div className=" flex">
          <div className="flex mb-2 flex-auto w-full flex-row p-4 gap-x-2">
            <span
              className="p-4 bg-slate-400 rounded-xl text-white border border-gray-800"
              data-testid="duration-focus"
            >
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Length: {minutesToDuration(focusDuration)}
            </span>
            <div className="lg:flex lg:gap-x-2">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <FocusMinus
                session={session}
                handleFocusDecrease={handleFocusDecrease}
              />
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <FocusPlus
                session={session}
                handleFocusIncrease={handleFocusIncrease}
              />
            </div>
          </div>
        </div>
        <div className="flex-initial">
          <div className="float-right">
            <div className="flex mb-2 flex-auto w-full flex-row p-4 gap-x-2">
              <span
                className="p-4 bg-slate-400 rounded-xl text-white border border-gray-800"
                data-testid="duration-break"
              >
                {/* TODO: Update this text to display the current break session duration */}
                Break Length: {minutesToDuration(breakDuration)}
              </span>
              <div className="flex gap-x-2">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <BreakMinus
                  session={session}
                  handleBreakDecrease={handleBreakDecrease}
                />
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <BreakPlus
                  session={session}
                  handleBreakIncrease={handleBreakIncrease}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CircleProgressBar
          circleWidth="500"
          session={session}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
        ></CircleProgressBar>
      </div>
      <div className="row flex rounded p-4 center">
        <div className="col w-full">
          <div
            className="flex mb-2 w-full justify-center gap-x-6"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className=" bg-slate-500 p-6 rounded-2xl text-xl text-white"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={() => playPause()}
            >
              {isTimerRunning ? (
                <>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <span>Play</span>
                </>
              )}
            </button>
            <StopButton session={session} handleReset={handleReset} />
          </div>
        </div>
      </div>
      {/* <SessionLabel
        session={session}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
      />
      <ProgressBar
        session={session}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
      /> */}
    </main>
  );
}
