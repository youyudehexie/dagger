'use strict'
const electron = require('electron');
const app = require('app');
const path = require('path');
const URL = require('url')

const ipcMain = require('ipc-main');
const BrowserWindow = require('browser-window');
let mainWindow = null;
const fs = require('fs');

function initWindow() {
    mainWindow = new BrowserWindow({
        minWidth: 400,
        minHeight: 600,
        height: 600,
        frame: false,
        show: false,
        title: 'Dagger',
    });

    mainWindow.loadURL('app://www.dagger.com/');
    mainWindow.loadURL('http://127.0.0.1:9090/')
    mainWindow.show();
}

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    const protocol = require('protocol');
    protocol.registerFileProtocol('app', function(request, callback) {
        let url = request.url;
        let pathname = URL.parse(url).pathname;
        let output;
        const ext = path.extname(pathname)

        if (!ext) {
            output = `${__dirname}/src/web_content/index.html`;
        } else {
            let filename = url.split('/').slice(-1)[0]
            output = `${__dirname}/src/web_content/${filename}`;
        }

        callback({path: output});
    }, function (error, resp) {
        console.log(resp)
      if (error)
        console.error('Failed to register protocol')
    });

    initWindow();
});


ipcMain.on('log', (evt, arg) => {
    console.log(arg[0]);
});
