module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false,
        sourceMap: 'build/<%= pkg.name %>.js.map',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    bookmarklet: {
      generate: {
        js: ['http://code.jquery.com/jquery-1.8.1.min.js','http://code.jquery.com/jquery-1.8.3.js'],
        jsIds: ['jquery-min','jquery'],
        body: 'build/<%= pkg.name %>.min.js',
        out: 'build/<%= pkg.name %>.bm.js',
        amdify: true,
        jshint: false,
        timestamp: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bookmarklet-thingy');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'bookmarklet']);

};