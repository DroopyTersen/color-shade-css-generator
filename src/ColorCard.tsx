import React, { useEffect, useMemo, useState } from "react";
import Values from "values.js";
import { ColorSwatch } from "./ColorSwatch";
import { ColorPicker } from "./ColorPicker";
import { getColorNumber } from "./utils";

export default function ({
  color = { name: "newColor", baseColor: "#ff0000" },
  onChange
}) {
  let [name, setName] = useState(color.name);
  let [baseColor, setBaseColor] = useState(color.baseColor);
  let displayName = (name || "").replace(/\s/gi, "");
  let shades = useMemo(() => {
    let color = new Values(baseColor);
    let darkShades = color.shades(18);
    let lightShades = color.tints(18).reverse();

    return [
      ...lightShades,
      color,
      ...darkShades.slice(0, darkShades.length - 1)
    ];
  }, [baseColor]);

  useEffect(() => {
    if (onChange) {
      onChange({ ...color, name, shades, baseColor });
    }
  }, [shades, name, onChange]); // eslint-disable-line

  return (
    <div className="card">
      <header>
        <h4>{displayName}</h4>
      </header>
      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <ColorPicker
          name="baseColor"
          value={baseColor}
          onChange={setBaseColor}
          label="Base Color"
        />
      </form>
      <div
        className="swatches"
        style={{
          margin: "10px 0",
          display: "grid",
          gap: "2px",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
        }}
      >
        {shades.map((shade, index) => (
          <ColorSwatch
            key={shade.hexString()}
            number={getColorNumber(index)}
            value={shade.hexString()}
            size="60px"
          />
        ))}
      </div>
    </div>
  );
}
