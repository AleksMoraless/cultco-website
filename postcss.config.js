// postcss.config.js
export default {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true
      }
    },
    autoprefixer: {
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not IE 11',
        'not dead'
      ],
      grid: 'autoplace' // важно для CSS Grid
    }
  }
}