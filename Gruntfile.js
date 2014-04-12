module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['less/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      src: {
        files: ['*.html']
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          base: '.'
        }
      }
    },

    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'js/*.js'  ],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ["."]
        },
        files: {
          "css/style.css": "less/style.less"
        }
      }
    },

    imageoptim: {
      myTask: {
        src: ['images']
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['uglify']);
  // Development Task
  grunt.registerTask('dev', ['connect','watch']);

};
