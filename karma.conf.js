// Karma configuration
// Generated on Thu Jun 11 2015 14:37:01 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'src',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['requirejs','mocha' ,'chai-sinon'],


    // list of files / patterns to load in the browser
    files: [
      'test/test-main.js',
      {pattern: 'test/**/*Spec.js', included: false},
      {pattern: 'test/**/*.json', included: false},
      {pattern: 'app/**/*.*', included: false},
      {pattern: 'locales/*.json', included: false},
      {pattern: 'locales/**/*.json', included: false},
      {pattern: 'lib/**/*.js', included: false}
    ],


    // list of files to exclude
    exclude: [
        'requireconfig.js',
        'app/main.js',
	'lib/**/*spec.js',
        'app/public.js',
	'lib/**/*test.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_without_security'],

    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
