/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{html,js,vue}', './public/index.html'],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      'body-dark': '#9ca3af',
      body: '#f3f4f6',
      border: '#ccc',
      default: '#ffffff',
      standard: '#f9f9f9',
      primary: '#22bdff',
      success: '#7dff67',
      danger: '#f55',
      error: '#f55',
      'standard-second': '#d9d9d9',
      'primary-second': '#0e9fdc',
      'success-second': '#57db42',
      'danger-second': '#d93434',
      'error-second': '#d93434',
    },
    extend: {
      zIndex: {
        1: 1,
      },
      width: {
        sidebar: '150px',
      },
      borderRadius: {
        main: '4px',
      },
      fontSize: {
        sm: '12px',
        md: '16px',
        lg: '20px',
        h3: '25px',
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
