/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    banner: '/*! MidiBiz - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* https://github.com/Jon-Biz/MidiBiz/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Jonathan El-Bizri; Licensed MIT */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['libs/**/*.js',
                    'app/control.js',
                   'app/modules/views.js',
                   'app/modules/models-inputs.js',
                   'app/modules/models-outputs.js',
                   'app/modules/midi-init.js',
                   'app/modules/app.js'
                   ],
        dest: 'dist/src/midibiz.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/src/midibiz.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        laxcomma:true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['app/control.js']
      }
    },
    jasmine:{
      src:['app/modules.*.js'],
      options:{
        vendor:[
           'libs/js/json2.js',
          'libs/js/jquery-1.8.3.js',
          'libs/js/underscore.js',
          'libs/js/backbone.js',
          'libs/js/backbone.marionette.js',
          'libs/js/Bacon.js',
          'jasmine/lib/*.js'
          ],
         specs:['jasmine/spec/**/coffee.js']
        }
    },
    coffee:{
      compile:{
        options:{
          bare:true,        
        },
        files:{
          'jasmine/spec/coffee.js':'jasmine/spec/*.coffee'
        } 
      }
    },
    compass:{
      dist: {
        options: {
          sassDir: 'stylesheets/sass',
          cssDir: 'stylesheets',
          
        }
      }
    },
    copy:{
      main:{
        files:[
            {
              src:[
               'index.html',
               'java/*',
               'libs/**/*.js',
               'stylesheets/*.css',
               'app/**/*'
              ],
            dest:'dist/'
          }
        ] 
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['compass','coffee','jasmine','copy',]);

};
