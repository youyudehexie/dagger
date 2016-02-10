var NativeRequire = require('./NativeRequire');
var fs = NativeRequire('fs');
var Path = NativeRequire('path');
var JtoY = NativeRequire('json2yaml');
var YtoJ = NativeRequire('js-yaml');

var exec = NativeRequire('child_process').exec;

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
        return self.loadPosts();
    })
    .then(function (content) {
        self.resources['rawPost'] = content;
        return Promise.resolve(self.resources);
    })
}

File.prototype.newPost = function (title) {
    var self = this;

    return Promise.all([
        self.runCmd(`hexo new '${title}'`, {cwd: self.path}),
        self.generate(),
    ]);
}

File.prototype.generate = function () {
    var self = this;
    return self.runCmd('hexo generate', {cwd: self.path});
}

File.prototype.runCmd = function (cmd, options) {
    return new Promise(function (resolve, reject) {
        exec(cmd, options, function (err, stdout, stderr) {
            if (err) return reject(err);
            return resolve(stdout, stderr);
        });
    })
}

File.prototype.readFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf-8', function (err, content) {
            if (err) return reject(err);
            return resolve(content);
        });
    });
}

File.prototype.write = function (path, content) {
    var self = this;
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, 'utf-8', function (err) {
            if (err) return reject(err);
            return resolve();
        });
    });
}

File.prototype.loadPosts = function (path) {
    var self = this;
    var path = path || Path.join(this.path, 'source/_posts');
    var files = fs.readdirSync(path);
    var posts = [];

    var promises = files.map(function (file) {
        return self.readFile(`${path}/${file}`)
        .then(function (content) {
            return Promise.resolve({file: file, content: content});
        });
    });

    return Promise.all(promises)
    .then(function (items) {
        var result = {}
        items.forEach(function (item) {
            result[`_posts/${item.file}`] = item.content;
        });

        return Promise.resolve(result);
    });
}



module.exports = File;
