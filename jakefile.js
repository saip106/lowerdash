'use strict';

task('default', ['test'], function () {

});

task('test', [], function (params) {
    jake.exec(['karma start'], { printStdout: true }, function () {
        complete();
    });
});