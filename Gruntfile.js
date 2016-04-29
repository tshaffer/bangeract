module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        watch: {
            browserify: {
                files: ["scripts/**/*.js"],
                tasks: ["browserify"]
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [["babelify", {presets: ["es2015", "react", "stage-0"]}]]
                },
                src: ["scripts/index.js"],
                dest: "static/bundle.js"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask("default", ["browserify", "watch"]);
};