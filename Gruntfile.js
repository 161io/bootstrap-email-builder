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
            // bower update
            tinymce_langs: { // https://www.tinymce.com/download/language-packages/
                expand: true,
                cwd: 'bower_components/',
                src: 'tinymce-langs-*/index.js',
                dest: 'bower_components/tinymce-dist/langs/',
                rename: function (dest, src) {
                    src = src.replace(/(tinymce-langs-)(.+)(\/index\.js)/, '$2.js');
                    return dest + src;
                }
            },
            responsive_filemanager_config: {
                expand: true,
                cwd: 'responsive-filemanager-config/',
                src: '*.php',
                dest: 'bower_components/responsive-filemanager/filemanager/config/'
            }
        },
        exec: {
            bower: {
                command: 'bower update'
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
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-version');

    grunt.registerTask('default', [
        'clean:min',
        'sass', 'clean:sass', 'cssmin',
        'coffee', 'uglify',
        'version:dist',
        // dist
        'clean:dist', 'copy:dist_css', 'copy:dist_js'
    ]);
    grunt.registerTask('dist', ['version:dist', 'clean:dist', 'copy:dist_css', 'copy:dist_js']);

    // Install or update Bower with Grunt!
    grunt.registerTask('bower_update', ['exec:bower', 'copy:tinymce_langs', 'copy:responsive_filemanager_config']);

};
