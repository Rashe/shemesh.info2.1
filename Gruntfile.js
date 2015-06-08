module.exports = function (grunt) {

    grunt.initConfig({
        jsDir: 'public/js/',
        jsDistDir: 'public/z_output/',
        cssDir: 'public/css/',
        cssDistDir: 'public/z_output/',
        sassDir: 'public/sass/',
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: [
                    'public/js/*.js'
                ],
                dest: '<%=jsDistDir%><%= pkg.name %>.js'
            }
            //,
            //css: {
            //    src: [
            //        '<%=cssDir%>normalize.css',
            //        '<%=cssDir%>foundation.min.css'
            //    ],
            //    dest: '<%=cssDistDir%><%= pkg.name %>.css'
            //}
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%=cssDistDir%>main.css': '<%=sassDir%>materialize.scss'
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js',
                'public/js/**/*.js',
                '!public/js/libs/**/*.js'
            ]
        },
        watch: {
            files: ['<%=sassDir%>*.scss',
                '<%=sassDir%>components/*.scss',
                '<%=jsDir%>*.js'
            ],
            tasks: ['sass',
                'concat'
                //'uglify',
                //'cssmin'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'sass',
        'concat',
        'uglify',
        //'cssmin',
        //'jshint',
        'watch'
    ]);
};