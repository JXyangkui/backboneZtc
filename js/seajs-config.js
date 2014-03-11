seajs.config({
  // Configure alias
  alias: {
    'es5-safe': 'lib/es5-safe.js',
    'json': 'lib/json2.js',
    'jquery': 'lib/jquery-1.11.0.min',
    'underscore': 'lib/underscore',

    'Backbone': {
      src: 'lib/backbone.js',
      deps: ['jquery','underscore','json'],
      exports: 'Backbone'
    },

    'dataTables': {
      src: 'lib/jquery.dataTables.min.js',
      deps: ['jquery']
    },

    'FixedHeader': {
      src: 'lib/FixedHeader.min.js',
      deps: ['jquery'],
      exports: 'FixedHeader'
    }

  },

  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ]
});