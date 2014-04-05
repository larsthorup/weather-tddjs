module.exports = function (grunt) {

    var gruntConfig = {};

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    gruntConfig.jasmine = {
        src: {
            src: [
                'src/**/*.js',
                '!src/lib/*.js',
            ],
            options: {
                specs: 'test/**/*.test.js',
                vendor: 'src/lib/**/*.js',
                keepRunner: true
            }
        }
    };
    grunt.registerTask('test', ['jasmine:src']);

    gruntConfig.jasmine.istanbul = {
        src: gruntConfig.jasmine.src.src,
        options : {
            specs: gruntConfig.jasmine.src.options.specs,
            vendor: gruntConfig.jasmine.src.options.vendor,
            template: require('grunt-template-jasmine-istanbul'),
            templateOptions: {
                coverage: 'bin/coverage/coverage.json',
                report: [
                    {type: 'text-summary'},
                    {type: 'html', options: {dir: 'output/coverage'}},
                    {type: 'cobertura', options: {dir: 'output/cobertura'}}
                ]
            }
        }
    };
    grunt.registerTask('cover', ['jasmine:istanbul']);

    grunt.initConfig(gruntConfig);
};