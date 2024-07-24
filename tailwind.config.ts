import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        customInput: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
        customCard: "0px 0px 32px 0px #0000001A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
