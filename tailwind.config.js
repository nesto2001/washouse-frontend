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
            'ws-red': '#b60000',
            'ws-black': '#424242',
            'ws-primary-hover': '#0236d1',
            'ws-light-gray': '#f2f3f3',
            'ws-gray': '#0236d1',
            'ws-green': '#019b45',
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
    darkMode: 'class',
};
