# continuatify

> A compiler for JavaScript asynchronous Continuation-Passing Style transformation

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev continuatify`

## Usage

For using with gulp there is [gulp-continuation](https://github.com/alhimik45/gulp-continuation) plugin.

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


