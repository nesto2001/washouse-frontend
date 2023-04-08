/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            gray: colors.gray,
            emerald: colors.emerald,
            white: colors.white,
            indigo: colors.indigo,
            yellow: colors.yellow,
            primary: '#396afc',
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
    darkMode: 'class',
};
