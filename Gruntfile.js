module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: "app/sass",
          cssDir: "app/css",
          imagesDir: "app/images",
          javascriptsDir: "app/scripts"
        }
      }
    },

    express: {
      server: {
        options: {
          bases: ["app", "bower_components"],
          livereload: true
        }
      }
    },

    watch: {
      css: {
        files: ['app/sass/**/*.scss'],
        tasks: ['compass']
      },

      livereload: {
        files: ['app/*.html', 'app/css/*.css', 'app/scripts/**/*.js'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.registerTask('default', ['compass', 'express', 'watch', 'express-keepalive']);
};