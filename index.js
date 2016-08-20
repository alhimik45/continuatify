var continuation = require('continuation');
var through = require('through2');


module.exports = function continuatify(file, options) {
    var chunks = [];

    function ondata(buffer, encoding, cb) {
        chunks.push(buffer.toString('utf8'));
        cb();
    }

    function onend(cb) {

        try {
            var code = chunks.join('');
            var compiled = continuation.compile(code, options);
            this.push(compiled);
            cb();
        } catch (e) {
            return cb(e);
        }
    }

    return through(ondata, onend);
};
