import React, { useState } from "react";
import { writeToClipboard } from "./utils";

export const ColorSwatch = ({ value, size = "50px", number }) => {
  let [status, setStatus] = useState("idle");
  const onClick = (e) => {
    writeToClipboard(value).then(() => {
      setStatus("copied");
      setTimeout(() => {
        setStatus("idle");
      }, 1000);
    });
  };
  return (
    <div
      onClick={onClick}
      className={"swatch " + status}
      style={{
        background: value,
        height: size,
        placeItems: "center",
        display: "grid",
        color: "white",
        textShadow: "1px 1px 6px #000"
      }}
    >
      <span className="number">{number}</span>
      <span className="value">{value}</span>
      <span className="copied">Copied!</span>
    </div>
  );
};
