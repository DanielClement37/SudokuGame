module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary:"#527261",
      secondary:"#FFFFFF",
    },
    textColor: {
      'primary': '#527261',
      'secondary':"#FFFFFF",
    },
    fontFamily: {
      sans: ['Roboto'],
      serif: ['Roboto'],
      mono: ['Roboto'],
      display: ['Roboto'],
      body: ['Roboto']
    },
    maxWidth:{
      '3/5':'60%',
    },
    letterSpacing: {
      header: '0.43em'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

//flex flex-col font-sans font-bold tracking-header text-primary