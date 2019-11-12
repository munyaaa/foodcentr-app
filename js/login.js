var auth = firebase.auth()

var emailField = document.getElementById('email-field');
var passField = document.getElementById('pass-field');

let restoId;

document.getElementById('login-submit').addEventListener('click', function(){
	auth.signInWithEmailAndPassword(emailField.value, passField.value)
		.then(function(data){
			restoId = emailField.value.substring(0, emailField.value.indexOf('@'))
			document.getElementById('resto-logo').src=`img/${restoId}_logo.png`
			document.getElementById('logo').style.display='block'
			document.getElementById('login-form').style.display='none'
			document.getElementById('logo-center-login').style.display='none'
		})
		.catch(function(err){
			document.getElementById('email-field').value = '';
			document.getElementById('pass-field').value = '';
			console.log("error")
		})
})
