import React from "react";

function BreakMinus({ session, handleBreakDecrease }) {
  if (session) {
    return (
      <button
        type="button"
        className=" bg-slate-300 p-4 rounded-2xl"
        data-testid="decrease-break"
        disabled={true}
      >
        <span className="oi oi-minus" />
        <span className="text-white tracking-wide">Minus</span>
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className=" bg-slate-500 p-4 rounded-2xl"
        data-testid="decrease-break"
        onClick={() => handleBreakDecrease()}
      >
        {/* <span className="oi oi-minus" /> */}
        <span className="text-white tracking-wide">Minus</span>
      </button>
    );
  }
}

export default BreakMinus;
