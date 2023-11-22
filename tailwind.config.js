module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' for media-query based dark mode
  theme: {
    extend: {
      // Here you can extend the default Tailwind styles,
      // add new ones, or customize existing ones.
      // For example, adding custom colors:
      colors: {
        "custom-blue": "#007bff",
        "custom-red": "#ff4136",
      },
    },
  },
  variants: {
    extend: {
      // Here you can extend the variants Tailwind uses.
      // For example, adding 'focus' variants for some utilities:
      borderColor: ["responsive", "hover", "focus"],
      opacity: ["responsive", "hover", "focus", "disabled"],
    },
  },
  plugins: [
    // Here you can add Tailwind plugins if needed.
  ],
};
