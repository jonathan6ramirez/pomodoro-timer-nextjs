import React from "react";

function BreakPlus({ session, handleBreakIncrease }) {
  if (session) {
    return (
      <button
        type="button"
        className=" bg-slate-300 p-4 rounded-2xl"
        data-testid="increase-break"
        disabled={true}
      >
        {/* <span className="oi oi-plus" /> */}
        <span className="text-white tracking-wide">Minus</span>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className=" bg-slate-500 p-4 rounded-2xl"
        data-testid="increase-break"
        onClick={() => handleBreakIncrease("breakDuration")}
      >
        {/* <span className="oi oi-plus" /> */}
        <span className="text-white tracking-wide">Minus</span>
      </button>
    );
  }
}

export default BreakPlus;
