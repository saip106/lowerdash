describe('underscore', function () {

    describe('initialization', function () {
        it('should be defined', function () {
            expect(_).toBeDefined();
        });
    });

    describe('when compacting an array', function () {
        it('should remove falsey values from the array', function () {
            var array = [0, 1, 2, false, '', NaN, null, undefined];
            expect(_.compact(array)).toEqual([1, 2]);
        });
    });

    describe('when doing a difference on an array', function () {
        it('should remove the values specified', function () {
            var foo = { bar: 123 };
            var array = [1, 2, 3, foo];
            expect(_.difference(array, foo)).toEqual([1, 2, 3]);
        });

        it('should not remove values that are not equal by ===', function () {
            var foo = { bar: 123 };
            var array = [1, 2, 3, { bar: 123}];
            expect(_.difference(array, foo)).toEqual([1, 2, 3, { bar: 123}]);
        });
    });

})