module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-karma');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            },
            chrom: {
                browsers: ['Chrome']
            },
            dev: {
                reporters: 'dots'
            }

        }
    });

    grunt.registerTask('default', ['karma:dev']);

};