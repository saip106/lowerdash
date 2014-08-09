'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');

gulp.task('default', []);

gulp.task('test', function () {
    gulp.src(['*.js', '**/*.spec.js'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});