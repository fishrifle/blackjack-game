module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 3,
      features: {
        appearance: false, // Disable or adjust handling of appearance
      },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
