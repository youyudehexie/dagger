var grunt = require('grunt');
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-appdmg');

    var Modules = Object.keys(grunt.file.readJSON('./dagger/package.json').dependencies).map(function (module) {
        return 'node_modules/' + module + '/**/*';
    });
    

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {expand: true, src: Modules, dest: 'tmp/'},
                    {expand: true, src: './**/*', dest: 'tmp/', cwd: './dagger'},
                ],
            },
            icns: {
                files: [
                    {expand: true, src: ['res/atom.icns'], dest: 'dist/Aegon-darwin-x64/Aegon.app/Contents/Resources'},
                ],
            }
        },

        electron: {
            osx: {
                options: {
                    name: 'Dagger',
                    dir: 'tmp/',
                    icon: 'tmp/favicon.ico',
                    out: 'dist',
                    version: '0.36.4',
                    platform: 'darwin',
                    arch: 'x64'
                }
            },
        },

        clean: {
            app: ['dist/'],
            tmp: ['tmp/']
        }
    });

    grunt.registerTask('default', ['clean:tmp', 'copy:main', 'clean:app', 'electron:osx']);

    //grunt.registerTask('default', ['clean:tmp', 'copy:main', 'clean:app', 'electron:osx', 'copy:icns']);
    //grunt.registerTask('win', ['clean:tmp', 'copy:main', 'clean:app', 'electron:win', 'copy:icns']);
    //grunt.registerTask('tmp', ['clean:tmp', 'copy:main']);

};



