import React from "react";

export const ColorPicker = ({ name, label, value, onChange }) => {
  return (
    <div style={{ position: "relative" }}>
      <label htmlFor="baseColor">
        {label}
        <input
          type="text"
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          className="color-picker"
          type="color"
          value={value}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          style={{ position: "absolute", right: "8px", bottom: "8px" }}
        />
      </label>
    </div>
  );
};
