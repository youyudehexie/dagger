var NativeRequire = require('./NativeRequire');
var fs = NativeRequire('fs');
var Path = NativeRequire('path');
var JtoY = NativeRequire('json2yaml');
var YtoJ = NativeRequire('js-yaml');

var File = function (path) {
    this.path = path;
    this.resources = {};
}

File.prototype.load = function () {
    var self = this;
    var configPath = `${this.path}/_config.yml`
    var dbPath = `${this.path}/db.json`

    return self.readFile(configPath)
    .then(function (content) {
        self.resources['settings'] = YtoJ.safeLoad(content);
        return self.readFile(dbPath);
    })
    .then(function (content) {
        self.resources['db'] = JSON.parse(content);
        return Promise.resolve(self.resources);
    });
}

File.prototype.readFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf-8', function (err, content) {
            if (err) return reject(err);
            return resolve(content);
        });
    });
}



module.exports = File;
