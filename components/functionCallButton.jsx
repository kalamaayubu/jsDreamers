import React from "react";
import { callFunction } from "./functionCall";

const CallBtn = () => {
  return (
    <form action={callFunction}>
      <button className="border p-3 py-2">Call function</button>
    </form>
  );
};

export default CallBtn;
