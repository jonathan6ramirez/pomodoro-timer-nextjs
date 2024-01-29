import React from "react";

function FocusMinus({ session, handleFocusDecrease }) {
  if (session) {
    return (
      <button
        type="button"
        className=" bg-slate-300 p-4 rounded-2xl"
        data-testid="decrease-focus"
        disabled={true}
      >
        {/* <span className="oi oi-minus" /> */}
        <span className="text-white tracking-wide">Minus</span>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className=" bg-slate-500 p-4 rounded-2xl"
        data-testid="decrease-focus"
        onClick={() => handleFocusDecrease()}
      >
        {/* <span className="oi oi-minus" /> */}
        <span className="text-white tracking-wide">Minus</span>
      </button>
    );
  }
}

export default FocusMinus;
