import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import theme, { getColor } from "./theme";
import { replaceCamelWithSpaces } from "./utils";

beforeEach(() => {
  render(<App />);
});

test("button has correct initial color", () => {
  const colorButton = screen.getByRole("button", { name: /change/i });
  expect(colorButton).toHaveStyle({ backgroundColor: getColor("color1") });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: getColor("color2") });

  const formattedColor = replaceCamelWithSpaces(theme.color2);
  expect(colorButton).toHaveTextContent(
    new RegExp(`change to ${formattedColor}`, "i")
  );
});

test("initial checkbox and button state", () => {
  const colorButton = screen.getByRole("button", { name: /change/i });
  const checkbox = screen.getByRole("checkbox");

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("the checkbox toggle the button", () => {
  const colorButton = screen.getByRole("button", { name: /change/i });
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("the button turns gray when disabled", () => {
  const colorButton = screen.getByRole("button", { name: /change/i });
  const checkbox = screen.getByRole("checkbox", { name: /disable button/i });

  // Disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: getColor("gray") });

  // Enable Button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: getColor("color1") });

  // Change button's color and repeat
  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: getColor("gray") });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: getColor("color2") });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
