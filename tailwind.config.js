import { colors } from "./src/shared/colors";

export const content = ["./src/**/*.{ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
  extend: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "20px",
      "2xl": "24px",
      "3xl": "30px",
      "4xl": "36px",
    },
    height: {
      button: 57,
    },
    colors,
  },
};
export const plugins = [];
