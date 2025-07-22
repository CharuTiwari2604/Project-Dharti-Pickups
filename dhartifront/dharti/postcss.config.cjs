// module.exports = {
//   plugins: {
//     '@tailwindcss/postcss': {},
//     autoprefixer: {},
//   },
// };

// postcss.config.cjs
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwind, autoprefixer],
};
