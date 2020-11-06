export const getColorNumber = (index) =>
  (index * 100).toString().padEnd(3, "0");

export const getCssName = (colorName, index) =>
  `${colorName}-${getColorNumber(index)}`;

export const generateBackgroundColorCss = (shades, colorName) => {
  if (!shades || !colorName) return "";
  return `
/* ${colorName} Background Colors */
${shades
  .map(
    (shade, index) =>
      `.bg-${getCssName(
        colorName,
        index
      )} { background-color: var(--${getCssName(colorName, index)}); }`
  )
  .join("\n")}
`;
};

export const generateTextColorCss = (shades, colorName) => {
  if (!shades || !colorName) return "";
  return `
/* ${colorName} Text Colors */
${shades
  .map(
    (shade, index) =>
      `.text-${getCssName(colorName, index)} { color: var(--${getCssName(
        colorName,
        index
      )}); }`
  )
  .join("\n")}
`;
};
export const generateCSSVars = (shades, colorName) => {
  if (!shades || !colorName) return "";
  return `
${shades
  .map(
    (shade, index) =>
      `  --${getCssName(colorName, index)}: ${shade.hexString()};`
  )
  .join("\n")}
`;
};

export const writeToClipboard = (value) => {
  if (!navigator.clipboard) {
    console.log("Unable to copy color value", value);
  } else {
    console.log("Copying color clipboard", value);

    return navigator.clipboard.writeText(value).catch((err) => {
      console.log("Unable to copy color", err, err.message);
    });
  }
};
