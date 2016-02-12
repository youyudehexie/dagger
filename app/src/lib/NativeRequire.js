var window = window || null;
if (!window) {
    window = {};
    window['require'] = function (name) {
        return require(name);
    }
}

var path = window.require('path');
var fs = window.require('fs');

export default function NativeRequire(name) {
    if (!window.process) {
        return window.require(name);
    }

    var moduleDir = path.join(window.process.resourcesPath, '/app/node_modules/' + name);
    var localDir = path.join(window.process.cwd(), '/node_modules/' + name);

    if (fs.existsSync(moduleDir)) {
        return window.require(moduleDir);
    }

    if (fs.existsSync(localDir)) {
        return window.require(localDir);
    }

    return window.require(name);
}

export default NativeRequire;
