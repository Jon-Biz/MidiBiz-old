// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/bacon/dist/Bacon.js',
      'app/bower_components/jquery/jquery.js',
      'app/bower_components/jquery.ui/dist/jquery-ui.js',
      'app/bower_components/jsplumb/dist/js/jquery.jsPlumb-1.5.2.js',
      'app/bower_components/underscore/underscore.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/sinon/lib/sinon.js',
      'app/bower_components/sinon/lib/sinon/call.js',
      'app/bower_components/sinon/lib/sinon/spy.js',

      'app/bower_components/sinon/lib/sinon/stub.js',

      'app/bower_components/jasmine-sinon/lib/jasmine-sinon.js',
      'app/scripts/*.js',
      'app/scripts/services/*.js',
      'app/scripts/services/**/*.js',
      'app/scripts/directives/*.js',
      'app/scripts/directives/**/*.js',
      'app/scripts/controllers/*.js',
      'app/scripts/controllers/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
