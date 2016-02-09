var File = require('../../app/src/lib/File');
var exec = require('child_process').exec;
var path = require('path');
var PATH = path.join(process.cwd(), './tests/folder');
var async = require('async');

describe('File#load', function () {
    describe('File#load', function () {

        before(function (done) {

            exec('mkdir folder', {cwd: path.join(process.cwd(), './tests')}, function () {
                async.eachSeries(['hexo init', 'npm install', 'hexo generate'], function (cmd, next) {
                    exec(cmd, {cwd: path.join(process.cwd(), './tests/folder')}, function (err, std) {
                        console.log(std);
                        return next();
                    });
                }, done);

            });
        });

        after(function (done) {
            exec('rm -rf folder', {cwd: path.join(process.cwd(), './tests')}, function () {
                done();
            });
        
        })

        it('should be success', function (done) {
            var f = new File(PATH); 
            f.load()
            .then(function (resources) {
                resources.settings.title.should.equal('Hexo');
                resources.db.models.Post[0].title.should.equal('Hello World')
                done()
            })
        });
    })

})
