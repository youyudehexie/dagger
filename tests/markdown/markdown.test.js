var MarkdownIt = require('markdown-it');
var mdHljsPlugin = require('markdown-it-highlightjs');

var md = new MarkdownIt({
    html: true,
    typographer: true
})
.use(mdHljsPlugin);

describe('Markdown', function () {
    it('Markdown#render', function (done) {
        var input = 'Welcome to [Hexo](http://hexo.io/)! This is your very first post. Check [documentation](http://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](http://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).'
        var html = md.render(input);
        done();
    });

})
