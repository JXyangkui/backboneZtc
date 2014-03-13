seajs.config({
  // Configure alias
  alias: {
    'es5-safe': 'lib/es5-safe.js',
    'json': 'lib/json2.js',
    'jquery': 'lib/jquery.min',
    'underscore': 'lib/underscore',

    'Backbone': {
      src: 'lib/backbone.js',
      deps: ['jquery','underscore','json'],
      exports: 'Backbone'
    },

    'jqueryplugins': {
      src: 'lib/jquery.plugins.js',
      deps: ['jquery']
    },

    'dataTables': {
      src: 'lib/jquery.dataTables.min.js',
      deps: ['jquery']
    },

    'FixedHeader': {
      src: 'lib/FixedHeader.min.js',
      deps: ['jquery'],
      exports: 'FixedHeader'
    },

    'jQueryTmpl': {
      src: 'lib/jquery.tmpl.min.js',
      deps: ['jquery']
    },

    'showLoading': {
      src: 'lib/jquery.showLoading.js',
      deps: ['jquery']
    },

    'cookie': {
      src: 'lib/jquery.cookie.js',
      deps: ['jquery']
    }

  },

  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ]
});