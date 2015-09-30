var BufferHelper = require('bufferhelper');
var Handlebars = require('handlebars');

var gutil = require('gulp-util');
var through = require('through2');
var assign = require('object-assign');
var fs = require('fs');
var marked = require('marked');

module.exports = function(options) {

    options = assign({}, options);

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-trans', 'Streaming not supported'));
            return;
        }

        var rs = fs.createReadStream('./template.html', {
            encoding: 'utf-8',
            bufferSize: 11
        });

        var bufferHelper = new BufferHelper();

        rs.on("data", function(trunk) {
            bufferHelper.concat(trunk);
        });

        rs.on("end", function() {
            var source = bufferHelper.toBuffer().toString();
            var template = Handlebars.compile(source);

            marked(file.contents.toString(), options, function(err, content) {
                if (err) {
                    cb(new gutil.PluginError('gulp-markdown', err, {
                        fileName: file.path
                    }));
                    return;
                }

                file.contents = new Buffer(template({ parse_markdown: content }));
                file.path = gutil.replaceExtension(file.path, '.html');

                cb(null, file);
            });

        });


    });
};
