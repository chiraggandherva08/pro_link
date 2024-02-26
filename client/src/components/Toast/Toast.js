import React from "react";
import "./toast.css";

export default function Toast({ prompt }) {
  return (
    <React.Fragment>
      <div id="toast"> {prompt} </div>
    </React.Fragment>
  );
}
