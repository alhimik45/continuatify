/* global describe, it */

var assert = require('assert');
var Readable = require('stream').Readable
var continuatify = require('./index');
var continuation = require('continuation');

var code = `function fibonacci() {
                var a = 0, current = 1;
                while (true) {
                    var b = a;
                    a = current;
                    current = a + b;
                    setTimeout(cont(), 1000);
                    console.log(current);
                }
            };`;

describe('continuatify', function () {
    it('should emit same code as plain continuation', function (done) {
        var s = new Readable;
        s.push(code);
        s.push(null);

        s.pipe(continuatify())
            .once('data', function (buffer) {
                assert.equal(buffer.toString('utf8'), continuation.compile(code));
                done();
            });
    });
});