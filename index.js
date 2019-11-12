const {app, BrowserWindow} = require('electron');
const url = require('url');

let win = null

function boot(){
	win = new BrowserWindow({
		width: 1920,
		height: 1080,
		frame: false,
		resizable: false
	})
	win.loadURL(`file://${__dirname}/index.html`)
}

app.on('ready', boot);
