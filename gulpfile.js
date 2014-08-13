/*jshint node:true*/
'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');

var sourceFiles = '*.js';
var specFiles = '**/*.spec.js';
var sourceAndSpecFiles = [sourceFiles, specFiles];

gulp.task('default', ['test']);

gulp.task('testOnce', ['lint'], function () {
    gulp.src(sourceAndSpecFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});

gulp.task('test', ['lint'], function () {
    gulp.src(sourceAndSpecFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});

gulp.task('lint', function () {
    gulp.src([sourceFiles, '!karma.conf.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch(specFiles, ['testOnce']);
    gulp.watch(sourceFiles, ['testOnce']);
});

