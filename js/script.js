var config = {
	apiKey: "AIzaSyB4b95DsdDZmL7vlZ3UYXaheFxWh3inLZ8",
	authDomain: "foodiecentr.firebaseapp.com",
	databaseURL: "https://foodiecentr.firebaseio.com",
	projectId: "foodiecentr",
	storageBucket: "foodiecentr.appspot.com",
	messagingSenderId: "147727733278"
};
firebase.initializeApp(config);
console.log(firebase);

const remote = require('electron').remote;

document.getElementById('close').addEventListener('click', closeWindow);
document.getElementById('minimize').addEventListener('click', minimizeWindow);

function closeWindow(){
	var window = remote.getCurrentWindow()
	window.close();
}

function minimizeWindow(){
	var window = remote.getCurrentWindow()
	window.minimize();
}
