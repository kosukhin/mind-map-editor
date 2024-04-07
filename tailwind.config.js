/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}', './public/index.html'],
  theme: {
    extend: {
      width: {
        sidebar: '150px',
      },
      borderColor: {
        'body-dark': '#9ca3af',
      },
      backgroundColor: {
        body: '#f3f4f6',
        default: '#ffffff',
        standard: '#ffffff',
        primary: '#22bdff',
        success: '#7dff67',
        danger: '#f55',
      },
      borderRadius: {
        main: '4px',
      },
      fontSize: {
        sm: '12px',
        md: '16px',
        lg: '20px',
      },
      spacing: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
};
