module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#3B82F6',
          secondary: '#60A5FA',
          background: '#ffffff',
          text: '#111827',
        },
        dark: {
          primary: '#3B82F6',
          secondary: '#60A5FA',
          background: '#1F2937',
          text: '#ffffff',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
