const theme: Record<string, string> = {
  color1: "MediumVioletRed",
  color2: "MidnightBlue",
  gray: "gray",
};

export const getColor = (key: string) => theme[key].toLowerCase();

export default theme;
