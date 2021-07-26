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
      'primary': 'var(--primary)',
      'secondary': 'var(--secondary)',
      'tertiary': 'var(--tertiary)',
      'selectfill': 'var(--select-fill)',
      'textColor': 'var(--text-color)',
      'userTileColor': 'var(--user-tile-color)',
      'sliderOff': 'var(--slider-off)',
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
      '2/3':'66.667%',
    },
    letterSpacing: {
      header: '0.43em'
    },
    extend: {
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

//flex flex-col font-sans font-bold tracking-header text-primary