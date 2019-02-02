const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const argv = require('yargs').argv;
const fs = require('fs');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true
    });

    const package = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')).toString());

    if(argv.serve) {
        console.log('Getting page from dev server.');
        win.loadURL('http://localhost:4200/');
    } else {
        console.log('Getting page from build.');
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist', package.name, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    win.on('closed', () => {
        win = null;
    });
};

const allWindowsClosed = () => {
    if( process.platform !== 'darwin' ) {
        app.quit();
    }
};

app.on('ready', createWindow);
app.on('window-all-closed', allWindowsClosed);
