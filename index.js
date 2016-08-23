var continuation = require('continuation');
var through = require('through2');
var sourceMap = require('source-map');
var SourceMapGenerator = sourceMap.SourceMapGenerator;
var SourceMapConsumer = sourceMap.SourceMapConsumer;
var convertSourceMap = require('convert-source-map');


module.exports = function continuatify(filename, options) {
    var chunks = [];

    function ondata(buffer, encoding, cb) {
        chunks.push(buffer.toString('utf8'));
        cb();
    }

    function onend(cb) {

        try {
            var code = chunks.join('');

            var mapBefore = null;
            if (options._flags.debug) {
                mapBefore = convertSourceMap.fromSource(code);
                if (mapBefore) {
                    mapBefore = mapBefore.toObject();
                }
                options.sourceMap = true;
            }

            var compiled = continuation.compile(code, options);

            if (options._flags.debug) {
                var file = filename;
                if (mapBefore) {
                    file = mapBefore.file;
                }
                var continuationMap = continuation.getSourceMap(file, [file]);
                var resultMap = convertSourceMap.fromJSON(continuationMap);
                if (mapBefore) {
                    var generator = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(JSON.parse(continuationMap)));
                    generator.applySourceMap(new SourceMapConsumer(mapBefore));
                    resultMap = convertSourceMap.fromJSON(generator.toString());
                }
                compiled += "\n" + resultMap.toComment();
            }
            this.push(compiled);
            cb();
        } catch (e) {
            return cb(e);
        }
    }

    return through(ondata, onend);
};
