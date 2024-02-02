import React from "react";

function StopButton({ session, handleReset }) {
  return (
    <>
      {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
      {/* TODO: Disable the stop button when there is no active session */}
      {!session ? (
        <button
          type="button"
          className=" bg-slate-300 p-6 rounded-2xl text-xl"
          data-testid="stop"
          title="Stop the session"
          disabled={true}
        >
          {/* <span className="oi oi-media-stop" /> */}
          <span className="text-white tracking-wide">Stop</span>
        </button>
      ) : (
        <button
          type="button"
          className=" bg-slate-500 p-6 rounded-2xl text-xl"
          data-testid="stop"
          title="Stop the session"
          onClick={() => handleReset()}
        >
          {/* <span className="oi oi-media-stop" /> */}
          <span className="text-white tracking-wide">Stop</span>
        </button>
      )}
    </>
  );
}
export default StopButton;
