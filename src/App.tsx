import { useState } from "react";
import "./App.css";
import theme, { getColor } from "./theme";
import { replaceCamelWithSpaces } from "./utils";

function App() {
  const [color, setColor] = useState("color1");
  const [disabled, setDisabled] = useState(false);
  const nextColor = color === "color1" ? "color2" : "color1";

  return (
    <div>
      <button
        style={{
          backgroundColor: disabled ? getColor("gray") : getColor(color),
          color: "white",
        }}
        onClick={() => setColor(nextColor)}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(theme[color])}
      </button>

      <label htmlFor="disable-button-checkbox">Disable Button</label>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
    </div>
  );
}

export default App;
