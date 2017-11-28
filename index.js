var through = require('through2');
var PluginError = require('gulp-util').PluginError;

// Constants
var PLUGIN_NAME = 'mibew-gulp-greh';
var RE = /(\/\*\![\s\S]*?\*\/\n)([\s\S]*?)\1/g;

module.exports = function() {
    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

        } else if (file.isBuffer()) {
            src = file.contents.toString();
            var oldString = '';
            var newString = src;
            while (oldString !== newString) {
                oldString = newString;
                newString = oldString.replace(RE, '$1$2'+"\n");
            }
            file.contents = new Buffer(newString);

        }

        this.push(file);
        return callback(null, file);
    });
};
