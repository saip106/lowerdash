'use strict'

describe('lowerdash', function () {

    describe('initialization', function () {
        it('should be defined', function () {
            expect(__).toBeDefined();
        });
    });

    describe('when compacting an array', function () {
        it('should remove falsey values from the array', function () {
            var array = [0, 1, 2, false, '', NaN, null, undefined];
            expect(__.compact(array)).toEqual([1, 2]);
        });
    });

    describe('when doing a difference on an array', function () {
        it('should remove the values specified', function () {
            var foo = { bar : 123 };
            var array = [1, 2, 3, foo];
            expect(__.difference(array, foo)).toEqual([1, 2, 3]);
        });

        it('should not remove values that are not equal by ===', function () {
            var foo = { bar : 123 };
            var array = [1, 2, 3, { bar : 123}];
            expect(__.difference(array, foo)).toEqual([1, 2, 3, { bar : 123}]);
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
                    var index = __.findIndex(characters, function (chr) {
                        return chr.age < 20;
                    });
                    expect(index).toEqual(2);
                });
            });

        });

        describe('that takes a object as a second param', function () {

            describe('and that object has one field', function () {
                it('should return the first matching index', function () {
                    var index = __.findIndex(characters, { 'age' : 36 });
                    expect(index).toEqual(0);
                });
            });

            describe('and that object has multiple fields', function () {
                it('should return the first matching index', function () {
                    var index = __.findIndex(characters, { 'age' : 36, 'name' : 'fred' });
                    expect(index).toEqual(-1);
                });
            });

            describe('and that object has no fields', function () {
                it('should return the first matching index', function () {
                    var index = __.findIndex(characters, { });
                    expect(index).toEqual(-1);
                });
            });

        });

        describe('that takes a field name as a second param', function () {
            it('should return the first matching index', function () {
                var index = __.findIndex(characters, 'blocked');
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
                    var index = __.findLastIndex(characters, function (chr) {
                        return chr.age > 20;
                    });
                    expect(index).toEqual(1);
                });
            });

            describe('that takes a object as a second param', function () {

                describe('and that object has one field', function () {
                    it('should return the last matching index', function () {
                        var index = __.findIndex(characters, { 'age' : 36 });
                        expect(index).toEqual(0);
                    });
                });

                describe('and that object has multiple fields', function () {
                    it('should return the last matching index', function () {
                        var index = __.findIndex(characters, { 'age' : 36, 'name' : 'fred' });
                        expect(index).toEqual(-1);
                    });
                });

                describe('and that object has no fields', function () {
                    it('should return the last matching index', function () {
                        var index = __.findIndex(characters, { });
                        expect(index).toEqual(-1);
                    });
                });

            });

            describe('that takes a field name as a second param', function () {
                it('should return the last matching index', function () {
                    var index = __.findIndex(characters, 'blocked');
                    expect(index).toEqual(1);
                });
            });
        });
    });

    describe('when finding the first element of an array', function () {
        var array = [1,2,3,4];
        it('should return the first element', function () {
            var result = __.first(array);
            expect(result).toEqual(1);
        });

        describe('and the second argument is a number', function () {
            it('should return an array of length specified', function () {
                var result = __.first(array, 2);
                expect(result).toEqual([1, 2]);
            });
        });

        describe('and the second argument is a function', function () {
            it('should return values that satisfy the function condition', function () {
                var result = __.first(array, function (num) {
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
                var result = __.first(characters, 'blocked');
                expect(result).toEqual({ 'name': 'barney',  'blocked': true,  'employer': 'slate' });
            });
        });

        describe('and the second argument is an object', function () {
            it('should return the first value with same field(s) as second argument', function () {
                var result = __.first(characters, { 'employer' : 'slate' });
                expect(result).toEqual({ 'name': 'barney',  'blocked': true,  'employer': 'slate' });
            });
        });

    });

    describe('when flattening an array', function () {
        it('should do shallow flattening if second argument is true', function () {
            var result = __.flatten([1, [2], [3, [[4]]]], true);
            expect(result).toEqual([1, 2, 3, [[4]]]);
        });

        it('should do deep flattening', function () {
            var result = __.flatten([1, [2], [3, [[4]]]]);
            expect(result).toEqual([1, 2, 3, 4]);
        });

        describe('using pluck sytanx', function () {
            var characters = [
                { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
                { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
            ];

            it('should pluck the property specified and then flatten the array', function () {
                var result = __.flatten(characters, 'pets');
                expect(result).toEqual(['hoppy', 'baby puss', 'dino']);
            });
        });
    });

    describe('when plucking a field from array of objects', function () {
        it('should return an array of field values for each object in the array', function () {
            var characters = [
                { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
                { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
            ];
            var result = __.pluck(characters, 'name');
            expect(result).toEqual(['barney', 'fred']);
        });
    });

    describe('when checking to see if a field exists in an object', function () {
        it('should check for the field on the object', function () {
            var foo = {
                'bar' : 'baz'
            }
            var result = __.has(foo, 'bar');
            expect(result).toBeTruthy();
        });

        it('should not check for the field on the object prototype chain', function () {
            var foo = {
                'bar' : 'baz'
            };
            Object.getPrototypeOf(foo).goofy = 'crazy';
            var result = __.has(foo, 'goofy');
            expect(result).toBeFalsy();
        });
    });

    describe('when finding index of an element', function () {
        it('should return the index of first occurrence', function () {
            var result = __.indexOf([1, 2, 3, 1, 2, 3], 2);
            expect(result).toEqual(1);
        });

        it('should return the index of first match after from index specified', function () {
            var result = __.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
            expect(result).toEqual(4);
        });

        describe('in a sorted array', function () {
            it('should return the index of first occurrence', function () {
                var result = __.indexOf([1, 1, 2, 2, 3, 3], 2, true);
                expect(result).toEqual(2);
            });
        });
    });

    describe('when doing intersection of two arrays', function () {
        it('should return array with common elements', function () {
            var result = __.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
            expect(result).toEqual([1,2]);
        });
    });

    describe('when getting last of an array', function () {
        it('should get the last element of the array by default', function () {
            var result = __.last([1, 2, 3]);
            expect(result).toEqual(3);
        });
    });

    describe('when getting last n elements of an array', function () {
        it('should get last n elements', function () {
            var result = __.last([1, 2, 3], 2);
            expect(result).toEqual([2,3]);
        });
    });

    describe('when getting last n matching elements', function () {
        describe('and the second element is a field name', function () {
            it('should last n elements for which the listed field value is true', function () {
                var characters = [
                    { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
                    { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
                    { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
                ];

                // using "_.pluck" callback shorthand
                var result = __.pluck(__.last(characters, 'blocked'), 'name');
                expect(result).toEqual(['fred', 'pebbles']);
            });
        });

        describe('and the second element is a function', function () {
            it('should return last n elements that satisfy the function', function () {
                var result = __.last([1, 2, 3], function(num) {
                    return num > 1;
                });
                expect(result).toEqual([2,3]);
            });
        });

        describe('and the second element is a object', function () {
            it('should return last n elements that satisfy all the object fields', function () {
                var characters = [
                    { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
                    { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
                    { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
                ];
                var result = __.last(characters, { 'employer': 'na' });
                expect(result).toEqual([{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]);
            });
        });
    });

    describe('when finding last index of an element in an array', function () {
        it('should find the last index of the matching element', function () {
            var result = __.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
            expect(result).toEqual(4);
        });

        it('should find the last index of the element after given index', function () {
            var result = __.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
            expect(result).toEqual(1);
        });
    });

    describe('when pulling given values from an array', function () {
        it('should remove the given values from the array', function () {
            var result = __.pull([1, 2, 3, 1, 2, 3], 2, 3);
            expect(result).toEqual([1,1]);
        });
    });
});