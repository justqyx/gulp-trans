var BufferHelper = require('bufferhelper');
var Handlebars = require('handlebars');

var gutil = require('gulp-util');
var through = require('through2');
var assign = require('object-assign');
var marked = require('marked');
var fs = require('fs');
var path = require("path");

module.exports = function(options) {

    options = assign({}, options);

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-md2html', 'Streaming not supported'));
            return;
        }

        fs.readFile(path.join(__dirname, 'template.html'), 'utf8', function(error, data) {
            if (error) {
                return console.log(error);
            }

            var template = Handlebars.compile(data);

            marked(file.contents.toString(), options, function(err, content) {
                if (err) {
                    return cb(new gutil.PluginError('gulp-md2html', err, {
                        fileName: file.path
                    }));
                }

                file.contents = new Buffer(template({
                    parse_markdown: content
                }));
                file.path = gutil.replaceExtension(file.path, '.html');

                cb(null, file);
            });
        });
    });
};
