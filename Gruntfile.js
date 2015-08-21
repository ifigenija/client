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
            files: ['Gruntfile.js', 'src/js/app/**/*.js'],
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
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        uglify: {
            options: {
            },
            build: {
                src: 'src/lib/require.js',
                dest: 'dist/js/require.js'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/js',
                    paths: {
                        'underscore': '../lib/underscore/underscore',
                        'bootstrap': '../lib/bootstrap/dist/js/bootstrap.min',
                        'jquery': '../lib/jquery/dist/jquery',
                        'jquery.fileupload': '../lib/jquery-file-upload/js/jquery.fileupload',
                        'jquery.ui.widget': '../lib/jquery-file-upload/js/vendor/jquery.ui.widget',
                        'jquery.jsonrpc': '../lib/jquery-jsonrpcclient/jquery.jsonrpcclient',
                        'backbone': '../lib/backbone/backbone',
                        'text': '../lib/requirejs-text/text',
                        'marionette': '../lib/marionette/lib/backbone.marionette',
                        'backgrid': '../lib/backgrid/lib/backgrid',
                        'backgrid-filter': '../lib/backgrid-filter/backgrid-filter',
                        'backgrid-moment-cell': '../lib/backgrid-moment-cell/backgrid-moment-cell',
                        'backgrid-select-all': '../lib/backgrid-select-all/backgrid-select-all',
                        'pageable': '../lib/backbone.paginator/lib/backbone.paginator',
                        'backbone-forms': '../lib/backbone-forms/distribution.amd/backbone-forms',
                        'deep-model': '../lib/backbone-deep-model/distribution/deep-model',
                        'backbone-modal': 'app/Max/View/Modal',
                        'moment': '../lib/moment/moment',
                        'moment/locale': '../lib/moment/locale',
                        'handlebars': '../lib/handlebars/handlebars.amd',
                        'i18next-actual': '../lib/i18next/i18next.amd.withJQuery',
                        'i18next': 'app/Max/i18next-wrapper',
                        'app/bars': 'app/Max/handlebars-wrapper',
                        'ckeditor': '../lib/ckeditor/ckeditor',
                        'radio': '../lib/backbone.radio/build/backbone.radio',
                        'bootstrap-datepicker': '../lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
                        'formSchema': 'app/Max/Loader/formSchema',
                        'formMeta': 'app/Max/Loader/formMeta',
                        'template': 'app/Max/Loader/template'
                    },
                    shim: {
                        underscore: {
                            exports: '_'
                        },
                        backbone: {
                            deps: ['jquery', 'underscore'],
                            exports: 'Backbone'
                        },
                        marionette: {
                            deps: ['jquery', 'underscore', 'backbone'],
                            exports: 'Marionette'
                        },
                        backgrid: {
                            deps: ['jquery', 'backbone', 'underscore'],
                            exports: 'Backgrid'
                        },
                        ckeditor: {
                            exports: 'CKEDITOR'
                        },
                        "backgrid-filter": {
                            deps: ["backbone", "backgrid"]
                        },
                        'backgrid-moment-cell': {
                            deps: ["backbone", "backgrid"]
                        },
                        'backgrid-select-all': {
                            deps: ["backbone", "backgrid"]
                        },
                        'deep-model': ['backbone', 'underscore'],
                        'backbone-modal': ['jquery', 'backbone'],
                        'bootstrap': ['jquery'],
                        'jquery.jsonrpc': ['jquery'],
                        'bootstrap-datepicker': ['jquery', 'bootstrap']
                    },
                    dir: 'src/dist/js',
                    removeCombined: true,
                    preserveLicenseComments: false,
                    fileExclusionRegExp: /^\./,
                    uglify: {
                        toplevel: true,
                        ascii_only: true,
                        max_line_length: 500,
                        mangle: true
                    },
                    optimizeAllPluginResources: false,
                    noGlobal: true
                }
            }
        },
        clean: {
            distJs: 'src/dist/js',
            distCss: 'src/dist/css',
            distFonts: 'src/dist/fonts'
        },
        less: {
            compilePublic: {
                options: {
                    strictMath: true,
                    sourceMap: false,
                    outputSourceFiles: true
                },
                src: 'src/less/public/build.less',
                dest: 'src/css/public.css'
            },
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: false,
                    outputSourceFiles: true
                },
                src: 'src/less/yeti/build.less',
                dest: 'src/css/yeti.css'
            },
            compileSite: {
                options: {
                    strictMath: true,
                    sourceMap: false,
                    outputSourceFiles: true
                },
                src: 'src/less/yeti/site.less',
                dest: 'src/css/site.css'
            },
            compileBackgrid: {
                options: {
                    strictMath: true,
                    sourceMap: false,
                    outputSourceFiles: true
                },
                src: 'src/less/backgrid.less',
                dest: 'src/css/backgrid.css'
            },
            compileLayout: {
                options: {
                    strictMath: true,
                    sourceMap: false,
                    outputSourceFiles: true
                },
                src: 'src/less/layout.less',
                dest: 'src/css/layout.css'
            }
        },
        csslint: {
            options: {
                csslintrc: 'src/lib/bootstrap/less/.csslintrc'
            },
            dist: [
                'src/css/yeti.css',
                'src/css/public.css'
            ]
        },
        cssmin: {
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            minifyPublic: {
                src: 'src/css/public.css',
                dest: 'src/dist/css/public.css'
            },
            minifyYeti: {
                src: 'src/css/yeti.css',
                dest: 'src/dist/css/yeti.css'
            },
            minifySite: {
                src: 'src/css/site.css',
                dest: 'src/dist/css/site.css'
            },
            minifyBackgrid: {
                src: 'src/css/backgrid.css',
                dest: 'src/dist/css/backgrid.css'
            },
            minifyLayout: {
                src: 'src/css/Layout.css',
                dest: 'src/dist/css/Layout.css'
            }
        },
        copy: {
            fonts: {
                cwd: 'src/lib/bootstrap/fonts/',
                src: '*',
                dest: 'src/fonts/',
                expand: true
            },
            fontsDist: {
                cwd: 'src/lib/bootstrap/fonts/',
                src: '*',
                dest: 'src/dist/fonts/',
                expand: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // Default task(s).
    grunt.registerTask('default', ['karma']);

    // CSS distribution task.
    grunt.registerTask('less-compile', ['less:compilePublic', 'less:compileTheme', 'less:compilePublic', 'less:compileLayout', 'less:compileBackgrid', 'less:compileSite']);
    grunt.registerTask('dist-css', ['less-compile', 'cssmin', 'copy']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'requirejs', 'uglify']);


};
