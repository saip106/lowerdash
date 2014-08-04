'use strict'

describe('lowerdash', function () {

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
            var foo = { bar : 123 };
            var array = [1, 2, 3, foo];
            expect(_.difference(array, foo)).toEqual([1, 2, 3]);
        });

        it('should not remove values that are not equal by ===', function () {
            var foo = { bar : 123 };
            var array = [1, 2, 3, { bar : 123}];
            expect(_.difference(array, foo)).toEqual([1, 2, 3, { bar : 123}]);
        });
    });

    describe('when finding index of item in an array', function () {

        var characters;

        beforeEach(function () {
            characters = [
                { 'name' : 'barney', 'age' : 36, 'blocked' : false },
                { 'name' : 'fred', 'age' : 40, 'blocked' : true },
                { 'name' : 'pebbles', 'age' : 1, 'blocked' : false }
            ];
        });

        describe('that takes a function as a second param', function () {

            describe('that satisfy a given function condition', function () {
                it('should return the first matching index', function () {
                    var index = _.findIndex(characters, function (chr) {
                        return chr.age < 20;
                    });
                    expect(index).toEqual(2);
                });
            });

        });

        describe('that takes a object as a second param', function () {

            describe('and that object has one field', function () {
                it('should return the first matching index', function () {
                    var index = _.findIndex(characters, { 'age' : 36 });
                    expect(index).toEqual(0);
                });
            });

            describe('and that object has multiple fields', function () {
                it('should return the first matching index', function () {
                    var index = _.findIndex(characters, { 'age' : 36, 'name' : 'fred' });
                    expect(index).toEqual(-1);
                });
            });

            describe('and that object has no fields', function () {
                it('should return the first matching index', function () {
                    var index = _.findIndex(characters, { });
                    expect(index).toEqual(-1);
                });
            });

        });

        describe('that takes a field name as a second param', function () {
            it('should return the first matching index', function () {
                var index = _.findIndex(characters, 'blocked');
                expect(index).toEqual(1);
            });
        });
    });

    describe('when finding last index of item in an array', function () {

        var characters;

        beforeEach(function () {
            characters = [
                { 'name' : 'barney', 'age' : 36, 'blocked' : false },
                { 'name' : 'fred', 'age' : 40, 'blocked' : true },
                { 'name' : 'pebbles', 'age' : 1, 'blocked' : false }
            ];
        });

        describe('that takes a function as a second param', function () {

            describe('that satisfy a given function condition', function () {
                it('should return the last matching index', function () {
                    var index = _.findLastIndex(characters, function (chr) {
                        return chr.age > 20;
                    });
                    expect(index).toEqual(1);
                });
            });

            describe('that takes a object as a second param', function () {

                describe('and that object has one field', function () {
                    it('should return the last matching index', function () {
                        var index = _.findIndex(characters, { 'age' : 36 });
                        expect(index).toEqual(0);
                    });
                });

                describe('and that object has multiple fields', function () {
                    it('should return the last matching index', function () {
                        var index = _.findIndex(characters, { 'age' : 36, 'name' : 'fred' });
                        expect(index).toEqual(-1);
                    });
                });

                describe('and that object has no fields', function () {
                    it('should return the last matching index', function () {
                        var index = _.findIndex(characters, { });
                        expect(index).toEqual(-1);
                    });
                });

            });

            describe('that takes a field name as a second param', function () {
                it('should return the last matching index', function () {
                    var index = _.findIndex(characters, 'blocked');
                    expect(index).toEqual(1);
                });
            });
        });
    });

    describe('when finding the first element of an array', function () {
        var array = [1,2,3,4];
        it('should return the first element', function () {
            var result = _.first(array);
            expect(result).toEqual(1);
        });

        describe('and the second argument is a number', function () {
            it('should return an array of length specified', function () {
                var result = _.first(array, 2);
                expect(result).toEqual([1, 2]);
            });
        });

        describe('and the second argument is a function', function () {
            it('should return values that satisfy the function condition', function () {
                var result = _.first(array, function (num) {
                    return num < 3;
                });
                expect(result).toEqual([1, 2]);
            });
        });
    });

    describe('when finding the first match in an array', function () {
        var characters = [
            { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
            { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
            { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
        ];

        describe('and the second argument is a string', function () {
            it('should return the first true value with field name as second argument', function () {
                var result = _.first(characters, 'blocked');
                expect(result).toEqual({ 'name': 'barney',  'blocked': true,  'employer': 'slate' });
            });
        });

        describe('and the second argument is an object', function () {
            it('should return the first value with same field(s) as second argument', function () {
                var result = _.first(characters, { 'employer' : 'slate' });
                expect(result).toEqual({ 'name': 'barney',  'blocked': true,  'employer': 'slate' });
            });
        });

    });

    describe('when flattening an array', function () {
        it('should do a shallow flattening if second argument is true', function () {
            var result = _.flatten([1, [2], [3, [[4]]]], true);
            expect(result).toEqual([1, 2, 3, [[4]]]);
        });
    });
});