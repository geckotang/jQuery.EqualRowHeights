module.exports = (grunt) ->

  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')
    banner: """
/*! <%= pkg.name %> (<%= pkg.repository.url %>)
 * lastupdate: <%= grunt.template.today("yyyy-mm-dd") %>
 * version: <%= pkg.version %>
 * author: <%= pkg.author %>
 * License: MIT */

"""

    concat:

      options:
        banner: '<%= banner %>'
      script:
        src: [ 'src/jquery.equalrowheights.js' ]
        dest: 'dest/jquery.equalrowheights.js'

    uglify:

      options:
        banner: '<%= banner %>'
      script:
        src: '<%= concat.script.dest %>'
        dest: 'dest/jquery.equalrowheights.min.js'

    watch:

      script:
        files: '<%= concat.script.src %>'
        tasks: [
          'default'
        ]

  grunt.registerTask 'default', [
    'concat'
    'uglify'
  ]

