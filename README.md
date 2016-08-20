# continuatify

> A compiler for JavaScript asynchronous Continuation-Passing Style transformation

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev continuatify`

## Usage


### Command-line

```
$ browserify -t continuatify example/main.js > bundle.js
```

### Api

``` js
var browserify = require('browserify');
var fs = require('fs');

var b = browserify('example/main.js');
b.transform('continuatify');

b.bundle().pipe(fs.createWriteStream('bundle.js'));
```

## Options

You can pass all options available for [continuation.js](https://github.com/BYVoid/continuation/)


