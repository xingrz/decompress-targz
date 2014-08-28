'use strict';

var isGzip = require('is-gzip');
var sbuff = require('simple-bufferstream');
var stripDirs = require('strip-dirs');
var tar = require('tar');
var zlib = require('zlib');

/**
 * tar.gz decompress plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
    opts = opts || {};
    opts.strip = +opts.strip || 0;

    return function (file, decompress, cb) {
        var files = [];

        if (!isGzip(file.contents)) {
            cb();
            return;
        }

        sbuff(file.contents).pipe(zlib.Unzip()).pipe(tar.Parse())
            .on('error', function (err) {
                cb(err);
                return;
            })

            .on('entry', function (file) {
                if (file.type !== 'Directory') {
                    var chunk = '';

                    file.on('data', function (data) {
                        chunk += data.toString();
                    });

                    file.on('end', function () {
                        chunk = new Buffer(chunk);
                        files.push({ contents: chunk, path: stripDirs(file.path, opts.strip) });
                    });
                }
            })
            .on('end', function () {
                decompress.files = files;
                cb();
            });
    };
};
