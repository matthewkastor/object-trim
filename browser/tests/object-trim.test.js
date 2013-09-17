describe('object-trim', function () {
    it('should trim empty properties', function () {
        var obj = {
            'a' : '',
            'b' : [undefined, null, ''],
            'c' : {'c' : [undefined, null, '']},
            'd' : [{'c' : [undefined, null, '']}],
            'e' : {'e' : [{'c' : [undefined, null, '']}]},
            'f' : {
                'f1' : {'e' : [{'c' : [undefined, null, '']}]},
                'f2' : {'e' : [{'c' : [undefined, null, '']}]}
            }
        };
        expect(objectTrim(obj)).toEqual({});
    });
    it('should preserve non empty values', function () {
        var obj = {
            'b' : 'keep',
            'd' : ['keep'],
            'f' : {'e' : 'keep'}
        };
        expect(objectTrim(obj)).toEqual({
            'b' : 'keep',
            'd' : ['keep'],
            'f' : {'e' : 'keep'}
        });
    });
    it('should not strip spaces from values', function () {
        var obj = {
            'a' : new String('ke ep'),
            'b' : 'ke ep',
            'd' : ['ke ep', '', 'ke ep'],
            'f' : {'e' : 'ke ep'}
        };
        expect(objectTrim(obj)).toEqual({
            'a' : 'ke ep',
            'b' : 'ke ep',
            'd' : ['ke ep', 'ke ep'],
            'f' : {'e' : 'ke ep'}
        });
    });
});
