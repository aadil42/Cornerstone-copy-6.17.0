module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: [
        './templates/**/*.html',
        './assets/js/**/*.js',
        './assets/js/**/*.jsx',
      ],
      // Keep Foundation and custom classes that are used
      safelist: [
        /^slick-/,        // Slick carousel classes
        /^lazyload/,      // Lazysizes classes
        /^is-/,           // Foundation state classes
        /^has-/,          // Foundation helper classes
        /^navUser/,       // Custom navigation classes
        /^modal/,         // Modal classes
        /^heroCarousel/,  // Carousel classes
        /^custom/, // all of our custom classes
      ],
      // Be aggressive - remove unused Foundation components
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}