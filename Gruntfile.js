/**
 * Copyright (c) 161 SARL, https://161.io
 */

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            style: {
                files: [
                    {
                        expand: true,
                        cwd: 'css/',
                        src: ['**/*.scss'],
                        dest: 'css/',
                        ext: '.css'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                //processImport: false,
                //keepSpecialComments: false
            },
            min_css: {
                files: [
                    {
                        expand: true,
                        cwd: 'css/',
                        src: ['**/*.css', '!*.min.css'],
                        dest: 'css/',
                        ext: '.min.css'
                    }
                ]
            }
        },
        coffee: {
            core: {
                options: {
                    sourceMap: true,
                    join: true
                },
                files: {
                    'js/bootstrap-email-builder.js': ['js/core/*.coffee']
                }
            },
            langs: {
                options: {
                    sourceMap: true
                },
                expand: true,
                flatten: true,
                cwd: 'js/langs/',
                src: ['**/*.coffee'],
                dest: 'js/langs/',
                ext: '.js'
            },
            plugins: {
                options: {
                    sourceMap: true
                },
                expand: true,
                flatten: true,
                cwd: 'js/plugins/',
                src: ['**/*.coffee'],
                dest: 'js/plugins/',
                ext: '.js'
            }
        },
        uglify: {
            min_js: {
                options: {
                    preserveComments: function (node, comment) {
                        return /^!/.test(comment.value);
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: 'js/',
                        src: ['**/*.js', '!*.min.js'],
                        dest: 'js/',
                        ext: '.min.js'
                    }
                ]
            }
        },
        clean: {
            min: [
                'css/**/*.min.css',
                'js/**/*.min.js'
            ],
            dist: [
                'dist/'
            ],
            sass: [
                '.sass-cache/'
            ]
        },
        copy: {
            dist_css: {
                expand: true,
                cwd: 'css/',
                src: '**/*.min.css',
                dest: 'dist/css/'
            },
            dist_js: {
                expand: true,
                cwd: 'js/',
                src: '**/*.min.js',
                dest: 'dist/js/'
            },
            // curl+unzip
            responsive_filemanager_config: {
                expand: true,
                cwd: 'responsive-filemanager-config/',
                src: '*.php',
                dest: 'node_modules_zip/responsive-filemanager/filemanager/config/'
            }
        },
        curl: {
            jqueryui_touch_punch: {
                src: '<%= pkg.zipDependencies.jqueryui_touch_punch %>',
                dest: 'node_modules_zip/jqueryui_touch_punch.zip'
            },
            responsive_filemanager: {
                src: '<%= pkg.zipDependencies.responsive_filemanager %>',
                dest: 'node_modules_zip/responsive_filemanager.zip'
            },
            tinymce_langs_de: {
                src: '<%= pkg.zipDependencies.tinymce_langs_de %>',
                dest: 'node_modules_zip/tinymce_langs_de.zip'
            },
            tinymce_langs_fr_FR: {
                src: '<%= pkg.zipDependencies.tinymce_langs_fr_FR %>',
                dest: 'node_modules_zip/tinymce_langs_fr_FR.zip'
            }
        },
        unzip: {
            jqueryui_touch_punch: {
                src: 'node_modules_zip/jqueryui_touch_punch.zip',
                dest: 'node_modules_zip'
            },
            responsive_filemanager: {
                src: 'node_modules_zip/responsive_filemanager.zip',
                dest: 'node_modules_zip/responsive-filemanager'
            },
            tinymce_langs_de: {
                src: 'node_modules_zip/tinymce_langs_de.zip',
                dest: 'node_modules/tinymce'
            },
            tinymce_langs_fr_FR: {
                src: 'node_modules_zip/tinymce_langs_fr_FR.zip',
                dest: 'node_modules/tinymce'
            }
        },
        version: {
            options: {
                prefix: 'v',
                replace: '@current-version@'
            },
            dist: {
                src: ['js/**/*.js', 'css/**/*.css']
            }
        },
        watch: {
            coffee_core: {
                files: ['js/core/*.coffee'],
                tasks: 'coffee:core'
            },
            coffee_other: {
                files: ['js/langs/*.coffee', 'js/plugins/*.coffee'],
                tasks: ['coffee:langs', 'coffee:plugins']
            },
            sass: {
                files: ['css/**/*.scss'],
                tasks: 'sass'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('default', [
        'clean:min',
        'sass', 'clean:sass', 'cssmin',
        'coffee', 'uglify',
        'version:dist',
        // dist
        'clean:dist', 'copy:dist_css', 'copy:dist_js'
    ]);
    grunt.registerTask('dist', ['version:dist', 'clean:dist', 'copy:dist_css', 'copy:dist_js']);

    grunt.registerTask('install-step-2', ['curl', 'unzip', 'copy:responsive_filemanager_config']);

};
