var NativeRequire = require('./NativeRequire');
var GitHubApi = NativeRequire('github');
var async = NativeRequire('async');
var _ = NativeRequire('lodash');
var spawn = NativeRequire('child_process').spawn;
var Path = NativeRequire('path');
var exec = NativeRequire('child_process').exec;
var fs = NativeRequire('fs');
var YAML = NativeRequire('yamljs');
var JSONTOYAML = require('json2yaml')


var Project = function (email, password, repo, target) {
    var self = this;
    this.email = email;
    this.password = password;
    this.repo = repo;
    this.target = target;
    this.owner = {};
    this.settings = {};
    this.npmArgs = ['--registry=https://registry.npm.taobao.org', 
    '--disturl=https://npm.taobao.org/dist'];

    this.github = new GitHubApi({
        version: "3.0.0",
        debug: true,
        protocol: "https",
        host: "api.github.com", 
        timeout: 5000,
    });

    this.github.authenticate({
        type: 'basic',
        username: this.email,
        password: this.password,
    });

    this.init();
}

Project.prototype = {
    init: function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.github.user.get({}, function (err, response) {
                if (err) return reject(err);
                self.username = response.login;
                return resolve(response);
            });
        });
    },

    clean: function () {
        var self = this;
        var path = self.target;

        Promise.race([
            self.dropRepo(), 
            new Promise(function (resolve, reject) {
                exec(`rm -rf ${path}*`, function () {
                    resolve();
                });
            })
        ])
        .then(function () {
            Promise.resolve();
        })
        .catch(function (e) {
            Promise.resolve();
        });

        //return self.dropRepo(self.repo, self.username)
        //.then(function () {
            //return new Promise(function (resolve, reject) {
                //exec(`rm -rf ${path}*`, function () {
                    //resolve();
                //});
            //});
        //});
    },

    // 1.folder
    // 2.cmd, git,npm,hexo
    // 3.remote url,
    checkCreateEnv: function () {
        var self = this;
        return self.checkFolder()
        .then(function () {
            return self.checkCmd('npm');
        })
        .then(function () {
            return self.checkCmd('hexo');
        })
        .then(function () {
            return new Promise(function (resolve, reject) {
                self.checkRepo()
                .then(function (resp) {
                    if (resp) return reject({code: 'repo_exisit', msg: '项目已经存在'})
                    return resolve();
                });
            });
        })

    },

    checkRepo: function (username, repo) {
        var self = this;
        var username = username || self.username;
        var repo = repo || self.repo;

        return new Promise(function (resolve, reject) {
            self.github.repos.get({user: username, repo: repo}, function (err, response) {
                if (err) return resolve(false);
                return resolve(true);
            });
        });
    },

    checkFolder: function (target) {
        var target = target || this.target;

        return new Promise((resolve, reject) => {
            fs.stat(target, function (err, stats) {
                if (err) return reject({code: 'no_folder', msg: '找不到对应目录.'});
                return resolve(stats);
            });
        });
    },

    checkCmd: function (cmd) {
        return new Promise((resolve, reject) => {
            exec(`${cmd} -v`, function (err, stdout, stderr) {
                if (err) return reject({code: 'no_cmd', msg: `找不到${cmd}命令`});
                return resolve(stdout, stderr);
            });
        });
    },

    create: function (target) {
        var self = this;

        return self.createRepo(self.repo)
        .then(function () {
            return self.buildEnv(target);
        })
        .then(function () {
            return self.deploy();
        });
    },

    createRepo: function (repo) {
        var self = this;
        var repo = repo || self.repo;

        return new Promise(function (resolve, reject) {
            self.github.repos.create({
                name: repo
            }, function (err, resp) {
                if (err) return reject(err);
                self.owner = resp.owner;
                self.repo = resp.name;
                self.fullname = resp.full_name;
                return resolve(resp);
            });
        });
    },

    genTpl: function (target) {
        var self = this;
        //var cmdPath = Path.join(process.cwd(), './node_modules/hexo/bin/hexo');
        var cmdPath = 'hexo';
        var originRepo = `https://${self.username}:${self.password}@github.com/${self.username}/${self.repo}.git`;

        self.baseDir = target || self.target;


        return new Promise(function (resolve, reject) {
            exec(`${cmdPath} init`, {cwd: self.baseDir}, function (err, stdout, stderr) {
                var settings = YAML.load(`${self.baseDir}/_config.yml`);

                Object.keys(settings).forEach((key) => {
                    self.settings[key] = settings[key];
                });

                self.settings['deploy']['repo'] = originRepo;
                self.settings['deploy']['type'] = 'git';
                fs.writeFile(
                `${self.baseDir}/_config.yml`, 
                JSONTOYAML.stringify(self.settings),
                'utf-8', 
                function (err) {
                    if (err) return reject(err);
                    return resolve(self.settings);
                });
            });
        });
    },

    buildEnv: function (target) {
        var self = this;
        return self.genTpl(target)
        .then(function () {
            return self.installDep();
        })
        .then(function () {
            return self.installDeployGit();
        });
    },

    dropRepo: function (username, repo) {
        var self = this;
        var username = username || self.username;
        var repo = repo || self.repo;

        console.log('kule')
        console.log(username, repo)
        console.log('kule')

        return new Promise(function (resolve, reject) {
            self.github.repos.delete({
                user: username,
                repo: repo,
            }, function (err) {
                if (err) return reject(err);
                return resolve();
            });
        });
    },

    deploy: function () {
        var self = this;
        var cmdPath = 'hexo';

        //var cmdPath = Path.join(process.cwd(), './node_modules/hexo/bin/hexo');
        return new Promise(function (resolve, reject) {
            exec(`${cmdPath} deploy`, {cwd: self.baseDir}, function (err, stdout, stderr) {
                console.log(stdout)
                if (err) return reject(err);
                return resolve();
            });
        });
    },

    installDeployGit: function () {
        var child = spawn('npm', ['install','hexo-deployer-git', '--save'].concat(this.npmArgs), {cwd: this.baseDir})
        var output = '';

        return new Promise(function (resolve, reject) {
            child.stdout.on('data', function (data) {
                output = data.toString();
                console.log(output);
            });

            child.stderr.on('data', function (data) {
                output = data.toString();
                console.log(output);
            });

            child.on('close', function (code, signal) {
                return resolve();
            })
        });
    },

    installDep: function () {
        var child = spawn('npm', ['install'].concat(this.npmArgs), {cwd: this.baseDir})
        var output = '';

        return new Promise(function (resolve, reject) {
            child.stdout.on('data', function (data) {
                output = data.toString();
                console.log(output);
            });

            child.stderr.on('data', function (data) {
                output = data.toString();
                console.log(output);
            });

            child.on('close', function (code, signal) {
                return resolve();
            });
        });
    },
}

module.exports = Project;
