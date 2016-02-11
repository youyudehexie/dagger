'use strict'
const app = require('app');
const path = require('path');
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

    mainWindow.loadURL('http://127.0.0.1:9090/')
    mainWindow.show();
}

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    initWindow();
});


ipcMain.on('log', (evt, arg) => {
    console.log(arg[0]);
});
