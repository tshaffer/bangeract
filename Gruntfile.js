module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        watch: {
            browserify: {
                files: ["src/**/*.js"],
                tasks: ["browserify"]
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [["babelify", {presets: ["es2015", "react", "stage-0"]}]]
                },
                src: ["src/js/index.js"],
                dest: "../server/public/bundle.js"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask("default", ["browserify", "watch"]);
};