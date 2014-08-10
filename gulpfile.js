/*jshint node:true*/

'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');

gulp.task('default', []);

gulp.task('test', function () {
    gulp.src(['*.js', '**/*.spec.js'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('watch', function () {
    gulp.src(['*.js', '**/*.spec.js'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});

gulp.task('lint', function () {
    gulp.src(['*.js', '!karma.conf.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});