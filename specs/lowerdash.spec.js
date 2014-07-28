describe('underscore', function () {

    it('should should be defined', function () {
        var array = [0,1,2];
        expect(_.compact(array)).toEqual([1,2]);
    });


})