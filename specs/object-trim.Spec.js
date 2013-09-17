var objectTrim = require('../src/object-trim.js');
var fs = require('fs');
var path = require('path');
var specPath = path.resolve(__dirname, '../browser/tests/object-trim.test.js');
var specCode = fs.readFileSync(specPath, "utf8");
eval(specCode);
