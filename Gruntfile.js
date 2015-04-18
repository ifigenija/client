module.exports = function (grunt) {

    var os = require('os');
    var classmap_generator = function () {
        if (os.platform() === 'win32') {
            return '..\\..\\vendor\\bin\\classmap_generator.php.bat';
        }
        return  '../../vendor/bin/classmap_generator.php';
    };

// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/app/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                multistr: true,
                scripturl: true,
                globals: {
                    // Globals defined by RequireJS
                    define: false,
                    console: false,
                    // Globals defined by QUnit
                    require: false,
                    module: false

                }
            }
        },    
        cssmin: {
            combine: {
                files: {
                    "build/css/site.min.css": [
                        'public/css/default.css',
                    ]
                }

            }
        },
        exec: {
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-jshint');

// Default task(s).
    grunt.registerTask('default', ['cssmin', 'jshint']);

};
