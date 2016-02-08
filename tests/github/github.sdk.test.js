var GitHubApi = require('github');
var config = require('../../config').github;

var github = new GitHubApi({
    version: "3.0.0",
    debug: true,
    protocol: "https",
    host: "api.github.com", 
    timeout: 5000,
});

github.authenticate({
    type: 'basic',
    username: config.email,
    password: config.password,
});


describe('Github#SDK', function () {
    after(function (done) {
        github.repos.delete({
            user: config.username,
            repo: config.repo,
        }, done);
    });

    it('Should create github repo success.', function (done) {
        github.repos.create({
            name: config.repo
        }, function (err, result) {
            (err == null).should.be.true;
            done();
        })
    });
});
