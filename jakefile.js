'use strict';

var jshint = require('jshint').JSHINT;

task('default', ['lint', 'test'], function () {

});

task('test', [], function (params) {
    jake.exec(['karma start'], { printStdout: true }, function () {
        complete();
    });
});

task('lint', function () {
    var fileNameList = new jake.FileList();
    fileNameList.include('*.js');
    fileNameList.exclude('karma.conf.js');

    fileNameList.forEach(function (fileName) {
            
    });
    for(var i = 0; i < fileNameList.length; i++) {
        var sourceCode = require("fs").readFileSync(fileNameList);
        var  jshint(sourceCode, {}, {});
    }
});