var mm = require('mm');
var ProjectManager = require('../../app/src/lib/Project');
var config = require('../../config').github;
var fs = require('fs');
var async = require('async');
var Path = require('path');
var exec = require('child_process').exec;
var request = require('request');

var pj = null

describe('Project', function () {
    before(function (done) {
        exec('mkdir folders', {cwd: '../'}, function () {
            var target = Path.join('../', 'folders');
            pj = new ProjectManager(config.email, config.password, target);
            done();
        })
    });

    describe('Project#checkFolder', function () {
        it('should success', function(done) {
            pj.checkFolder()
            .then(function () {
                done();
            })
        });

        it('should failed', function(done) {
            pj.checkFolder('/test_folder')
            .catch(function (e) {
                e.code.should.equal('no_folder');
                done();
            });
        });
    });

    describe('Project#checkCmd', function () {
        it('should success', function(done) {
            pj.checkCmd('node')
            .then(function () {
                done();
            });
        });

        it('should failed', function(done) {
            pj.checkCmd('wfewf')
            .catch(function (e) {
                e.code.should.equal('no_cmd');
                done();
            });
        });

    });


    describe('Project#checkRepo', function () {
        before(function (done) {
            pj.dropRepo(config.username, config.repo)
            .then(function () {
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        })

        it('repo should found', function(done) {
            pj.createRepo()
            .then(function () {
                return pj.checkRepo();
            })
            .then(function (response) {
                response.should.be.true;
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done()
            })

        });

        it('repo should not found', function(done) {
            pj.checkRepo()
            .then(function (response) {
                response.should.be.false;
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done()
            })
        });
    });

    describe('Project#checkCreateEnv', function () {
        beforeEach(function (done) {
            pj.dropRepo(config.username, config.repo)
            .then(function () {
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        });

        it('should failed when repos exisits', function (done) {
            pj.createRepo()
            .then(function () {
                return pj.checkCreateEnv()
            })
            .then(function () {
                done();
            })
            .catch(function (e) {
                e.code.should.equal('repo_exisit');
                done();
            })
        });
    });

    describe('Project#Action', function () {

        beforeEach(function (done) {
            pj.dropRepo(config.username, config.repo)
            .then(function () {
                done();
            })
            .catch(function () {
                done();
            })
        });

        it('ProjectManager#init', function (done) {
            pj.init()
            .then(function (resp) {
                resp.login.should.equal(config.username);
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        });

        it('ProjectManager#createRepo', function (done) {
            pj.createRepo()
            .then(function (resp) {
                resp.name.should.equal('fennudehexie.github.io');
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        });

        it('ProjectManager#genTpl', function (done) {
            var path = '/Users/zhenfu/sandbox/hexo/';
            pj.genTpl()
            .then(function (resp) {
                resp.deploy.type.should.equal('git');
                resp.deploy.repo.should.equal(`https://${config.username}:${config.password}@github.com/fennudehexie/${config.repo}.git`);
                var files = fs.readdirSync(path);
                files.should.containDeep(['_config.yml', 'package.json', 'scaffolds']);
                return Promise.resolve();
            })
            .then(function () {
                exec(`rm -rf ${path}*`, function () {
                    done();
                });
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        });
        
    });
});
