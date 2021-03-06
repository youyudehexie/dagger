var File = require('../../app/src/lib/File');
var exec = require('child_process').exec;
var Path = require('path');
var PATH = Path.join(process.cwd(), './tests/folder');
var async = require('async');

describe('File#load', function () {
    describe('File#load', function () {

        before(function (done) {
            exec('mkdir folder', {cwd: Path.join(process.cwd(), './tests')}, function () {
                async.eachSeries(['../../node_modules/hexo/bin/hexo init', 'hexo generate'], function (cmd, next) {
                    exec(cmd, {cwd: Path.join(process.cwd(), './tests/folder')}, function (err, std) {
                        console.log(std);
                        return next();
                    });
                }, done);

            });
        });

        after(function (done) {
            exec('rm -rf folder', {cwd: Path.join(process.cwd(), './tests')}, function () {
                done();
            });
        })

        it('should be success', function (done) {
            var f = new File(PATH); 
            f.load()
            .then(function (resources) {
                Object.keys(resources.rawPost)[0].should.equal('_posts/hello-world.md');
                resources.settings.title.should.equal('Hexo');
                resources.db.models.Post[0].title.should.equal('Hello World')
                done()
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done(e);
            })
        });

        it('should new post success', function (done) {
            var f = new File(PATH); 
            f.newPost('demo1')
            .then(function () {
                return f.load();
            })
            .then(function (resources) {
                resources.db.models.Post.length.should.equal(2);
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        });

        it('should load posts success', function (done) {
            var f = new File(PATH); 

            f.loadPosts()
            .then(function (result) {
                Object.keys(result)[0].should.equal('_posts/hello-world.md');
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        });


        it('should write setting file success', function (done) {
            var f = new File(PATH); 

            f.load()
            .then(function (resources) {
                var settings = resources.settings;
                settings['title'] = 'hexie';
                return f.saveSetting(settings);
            })
            .then(function () {
                return f.load();
            })
            .then(function (resources) {
                resources.settings.title.should.equal('hexie');
                done();
            })
            .catch(function (err) {
                (err === null).should.be.true;
                done();
            })
        });
    })

})
