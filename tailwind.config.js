/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tailwind-datepicker-react/dist/**/*.js'],
    theme: {
        extend: {},
        colors: {
            primary: '#396afc',
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
    darkMode: 'class',
};
