import React from "react";

function FocusPlus({ session, handleFocusIncrease }) {
  if (session) {
    return (
      <button
        type="button"
        className=" bg-slate-300 p-4 rounded-2xl"
        data-testid="increase-focus"
        disabled={true}
      >
        {/* <span className="oi oi-plus" /> */}
        <span className="text-white tracking-wide">Plus</span>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className=" bg-slate-500 p-4 rounded-2xl"
        data-testid="increase-focus"
        onClick={() => handleFocusIncrease()}
      >
        {/* <span className="oi oi-plus" /> */}
        <span className="text-white tracking-wide">Plus</span>
      </button>
    );
  }
}

export default FocusPlus;
