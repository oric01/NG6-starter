const path = require('path');

module.exports = function karmaConf(config) {
  // require built-in path module


  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files/patterns to load in the browser
    files: [{ pattern: 'spec.bundle.js', watched: false }],

    // files to exclude
    exclude: [],

    plugins: [
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-html-reporter',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 'spec.bundle.js': ['webpack', 'sourcemap'] },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'progress', 'html', 'coverage'],

    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: 'test/coverage',
        },
      ],
    },

    webpack: {
      // *optional* babel options: isparta will use it as well as babel-loader
      babel: {
        presets: ['es2015'],
      },
      // *optional* isparta options: istanbul behind isparta will use it
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015'],
        },
      },
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          // transpile all files except testing sources with babel as usual
          {
            test: /\.js$/,
            exclude: [
              path.resolve('generator/'),
              path.resolve('node_modules/'),
            ],
            loader: 'babel',
          },
          // transpile and instrument only testing sources with isparta
          {
            test: /^((?!\.spec).)*\.js$/,
            include: path.resolve('client/app/'),
            loader: 'isparta',
          },
        ],
        loaders: [
          { test: /\.js/, exclude: [/app\/lib/, /node_modules/], loader: 'babel' },
          { test: /\.html/, loader: 'raw' },
          { test: /\.styl$/, loader: 'style!css!stylus?' +
          'paths=node_modules/bootstrap-styl&&resolve url' },
          { test: /\.css$/, loader: 'style!css' },
        ],
      },
    },

    webpackServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN
    // || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // if true, Karma runs tests once and exits
    singleRun: true,
  });
};
