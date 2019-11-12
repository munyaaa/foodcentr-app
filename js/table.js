var database = firebase.database();

let tableRef = database.ref('wahkacao/table');

tableRef.once('value', drawTable, errTable);

let tableInner = document.getElementById('table-content');

function drawTable(data){
	let counter = 0;

	data.forEach(function(child){
		if(counter++ % 3 == 0)
			tableInner.innerHTML+='<br>'
		tableInner.innerHTML += `<div id="div-table ${child.key}" 
		class="div-table ${child.key}"><h1 id="div-table ${child.key}">
		${counter}</h1></div>`;
		if(child.val().temp === "no"){
			document.querySelector(`.${child.key}`).style.backgroundImage 
			= `url('img/occupied_table.png')`
		}
		else if(child.val().temp === "yes"){
			document.querySelector(`.${child.key}`).style.backgroundImage 
			= `url('img/green_table.png')`
		}
		// if(child.val().temp === "no"){
		// 	document.querySelector(`.${child.key}`).style.backgroundImage 
		// 	= `url('img/occupied_table.png')`
		// }
	})
}

function errTable(err){
	console.log(err);
}

document.addEventListener('click', (e) => {
	if ( e.target && e.target.id.startsWith('div-table') ) {
		let targetId = e.target.id
		let lastIdx = targetId.lastIndexOf(targetId.charAt(targetId.length-1))
		let firstIdx = targetId.indexOf(' ')
		let tableNumber = targetId.substring(firstIdx+1, lastIdx+1)
		console.log(tableNumber)
		
		let ref = database.ref(`wahkacao/table/${tableNumber}`);
		ref.once("value")
		.then(function(snapshot) {
			if(snapshot.val().temp == "yes" && snapshot.val().available == "yes"){
				ref.update({
					"available" : "yes",
					"temp" : "no"
				})
				document.querySelector(`.${snapshot.key}`).style.backgroundImage 
					= `url('img/occupied_table.png')`
			}
			else if(snapshot.val().temp == "no" && snapshot.val().available == "yes"){
				ref.update({
					"available" : "yes",
					"temp" : "yes"
				})
				document.querySelector(`.${snapshot.key}`).style.backgroundImage 
					= `url('img/green_table.png')`
			}
			else{
				alert("The table has been occupied!")
			}
		})
	}
})
// console.log(database.ref(`wahkacao/table/${tableNumber}`))

document.addEventListener('click', (e) => {
	let newTableRef;
	if ( e.target && e.target.id.startsWith('next-to-menu') ) {
		tableRef.on('value', saveTable, errTable);
		function saveTable(data){
			data.forEach(function(child){
				if(child.val().temp === "no" && child.val().available === "yes"){
					console.log(child.key)
					newTableRef = database.ref(`wahkacao/table/${child.key}`)
					newTableRef.update({
						"available" : "no",
						"temp" : "no"
					})
				}
			})
		}
		window.location.href="menu.html"
	}
})

// let temp = 0;
// let tableNumber = 0;
// document.addEventListener('click', (e) => {
// 	if ( e.target && e.target.id.startsWith('div-table') ) {
// 		let targetId = e.target.id
// 		let lastIdx = targetId.lastIndexOf(targetId.charAt(targetId.length-1))
// 		let firstIdx = targetId.indexOf(' ')
// 		let tableNumber = targetId.substring(firstIdx+1, lastIdx+1)

// 		var ref = database.ref(`wahkacao/table/${tableNumber}`);
// 		ref.once("value")
// 		.then(function(snapshot) {
// 			if(snapshot.val().available == "yes"){
// 				temp = snapshot.val().temp;
// 				console.log("temp: " + temp)
// 				if(temp === "yes" && snapshot.val().available == "yes"){
// 					document.querySelector(`.${tableNumber}`).style.backgroundImage 
// 					= `url('img/occupied_table.png')`
// 				}
// 				else if(temp === "no" && snapshot.val().available == "yes"){
// 					document.querySelector(`.${tableNumber}`).style.backgroundImage 
// 						= `url('img/green_table.png')`
// 				}
// 				console.log(document.querySelector(`.${tableNumber}`).style.backgroundImage )
// 			}
// 			else console.log("err")
// 		});
// 		// ref.once("value")
// 		// .then(function(snapshot) {
// 		// 	console.log(tableNumber)
// 		// 	if(snapshot.val().temp == "no"){
// 		// 		console.log(document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage)
// 		// 		document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage 
// 		// 		= `url('img/occupied_table.png')`
// 		// 	}
// 		// 	else if(snapshot.val().temp == "yes"){
// 		// 		console.log(document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage)
// 		// 		document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage 
// 		// 		= `url('img/green_table.png')`
// 		// 	}
// 			// if(snapshot.val().temp == "yes"){
// 			// 	ref.update({
// 			// 		"temp" : "no"
// 			// 	})
// 			// }
// 			// else if(snapshot.val().temp == "no"){
// 			// 	ref.update({
// 			// 		"temp" : "yes"
// 			// 	})
// 			// }
// 		});	
// 		// var tableRef = firebase.database().ref(`wahkacao/table/`);	
// 		// tableRef.on('child_changed', changeColor, errTable);

// 		// function changeColor(snapshot){
// 		// 	if(snapshot.val().temp == "no"){
// 		// 		console.log(document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage)
// 		// 		document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage 
// 		// 		= `url('img/occupied_table.png')`
// 		// 	}
// 		// 	else if(snapshot.val().temp == "yes"){
// 		// 		console.log(document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage)
// 		// 		document.querySelector(`.div-table ${tableNumber}`).style.backgroundImage 
// 		// 		= `url('img/green_table.png')`
// 		// 	}
// 		// }


// 		// location.reload()
// 		// let index = e.target.id.slice(12)
// 		// let element = document.querySelector(`.${index}`)
// 		// if( element.style.backgroundImage === `url("img/occupied_table.png")` ) {
// 		// 	element.style.backgroundImage = `url('img/green_table.png')`
// 		// } else {
// 		// 	element.style.backgroundImage = `url('img/occupied_table.png')`
// 		// }
// 	}
// })

