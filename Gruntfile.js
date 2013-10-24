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
        amdify: false,
        jshint: false,
        timestamp: false
      }
    },
    tamper: {
      build: {
        src: "build/<%= pkg.name %>.min.js",
        dest: "build/<%= pkg.name %>.tm.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bookmarklet-thingy');
  grunt.registerMultiTask('tamper', 'A task that generates a Tampermonkey script.', function() {
    var output = "";
    output += "// ==UserScript==\n";
    output += "// @name " + grunt.config(["pkg", "name"]) + "\n";
    output += "// @version " + grunt.config(["pkg", "version"]) + "\n";
    output += "// @updateURL http://vps.dobry.me/MES.tm.js\n";
    output += "// @author edobry\n";
    output += "// @include http://clickingbad.nullism.com\n";
    output += "// ==/UserScript==\n";
    output += grunt.file.read(this.data.src);
    grunt.file.write("./" + this.data.dest, output);
    grunt.file.write("/var/www/node/MES.tm.js", output);
  });

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'bookmarklet', 'tamper']);

};
