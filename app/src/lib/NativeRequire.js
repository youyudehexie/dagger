
module.exports = function (name) {
    if (typeof(window) == 'undefined') return require(name);

    var remote = window.require('electron').remote;
    if (remote) {
        return remote.require(name);
    }

    return require(name);
}
