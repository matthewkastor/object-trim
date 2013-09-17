# object-trim

Trims empty values out of a given object. Empty values are '', undefined, null,
 [], {}, and objects with no enumerable properties.

## Installation

```
npm install atropa-object-trim
```

## Usage

In node:

```
var objectTrim = require('object-trim');
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
        expect(object-trim(obj)).toEqual({});
```

```
var obj = {
            'a' : new String('ke ep'),
            'b' : 'ke ep',
            'd' : ['ke ep', '', 'ke ep'],
            'f' : {'e' : 'ke ep'}
        };
        expect(object-trim(obj)).toEqual({
            'a' : 'ke ep',
            'b' : 'ke ep',
            'd' : ['ke ep', 'ke ep'],
            'f' : {'e' : 'ke ep'}
        });
```

In the browser, include `./browser/object-trim_web.js` in your page.
 `objectTrim` will be available in your page.
