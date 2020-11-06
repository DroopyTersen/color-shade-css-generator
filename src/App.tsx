import React, { useState, useCallback, useMemo } from "react";
import "./styles.css";
import ColorCard from "./ColorCard";
import {
  generateBackgroundColorCss,
  generateCSSVars,
  generateTextColorCss,
  writeToClipboard
} from "./utils";

const initialColors = [
  {
    id: "one",
    name: "primary",
    baseColor: "#068D9D",
    shades: null
  },
  {
    id: "two",
    name: "secondary",
    baseColor: "#53599A",
    shades: null
  },
  {
    id: "three",
    name: "neutral",
    baseColor: "#646868",
    shades: null
  }
];

export default function App() {
  const [colors, setColors] = useState(initialColors);
  const cssString = useMemo(() => {
    return `:root { ${colors
      .map((color) => generateCSSVars(color.shades, color.name))
      .join("")}}
    
      ${colors
        .map(
          (color) =>
            generateBackgroundColorCss(color.shades, color.name) +
            generateTextColorCss(color.shades, color.name)
        )
        .join("")}
    `;
  }, [colors]);
  const onChange = useCallback(
    (newColor) => {
      setColors((oldColors) => {
        return oldColors.map((color) => {
          if (color.id === newColor.id) return newColor;
          return color;
        });
      });
    },
    [setColors]
  );
  return (
    <div className="App">
      <h1>Color Shade Generator</h1>
      <h2>Theme Colors</h2>
      <div className="card-grid">
        {initialColors.map((color, index) => (
          <ColorCard color={color} key={color.id} onChange={onChange} />
        ))}
      </div>
      <div className="css-output">
        <h2>CSS Output</h2>
        <div className="code">
          <button
            className="button outline primary"
            onClick={() => writeToClipboard(cssString)}
          >
            Copy CSS
          </button>
          <pre>{cssString}</pre>
        </div>
      </div>
    </div>
  );
}
