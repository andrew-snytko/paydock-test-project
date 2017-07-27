module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'dist/styles/main.css': 'app/styles/main.scss'
                }
            }
        },
        copy: {
            dist: {
                files: [{
                        src: 'app/index.html',
                        dest: 'dist/index.html'
                    },
                    {
                        expand: true,
                        cwd: 'app/views',
                        src: '**',
                        dest: 'dist/views/'
                    },
                    {
                        expand: true,
                        cwd: 'app/assets',
                        src: '**',
                        dest: 'dist/assets/'
                    }
                ]
            }
        },
        useminPrepare: {
            html: 'app/index.html'
        },
        usemin: {
            html: 'dist/index.html'
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './dist/bower_components',
                    cleanTargetDir: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/*.js', 'app/scripts/controllers/*.js', 'app/scripts/directives/*.js', 'app/scripts/services/*.js'],
                dest: 'dist/app.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/app.js': ['dist/app.js']
                }
            }
        },
    });

    grunt.registerTask('build', ['copy', 'useminPrepare', 'concat:dist', 'uglify:dist', 'sass:dist', 'usemin']);

};