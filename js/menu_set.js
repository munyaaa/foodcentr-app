var database = firebase.database();

let foodRef = database.ref('wahkacao/food');

foodRef.on('value', showFood, showErr);
let menuInner = document.getElementById('menu-content');
	// menuInner.innerHTML +=`<div>`;
	function showFood(data){
		let counter = 0;

		data.forEach(function(child){
			if(counter++ % 3 == 0)
				menuInner.innerHTML+='<br>'
			menuInner.innerHTML += `<div class="menu ${child.key}"><div>
			<img id="menu-img" src="img/${child.key}.png"></div><span id="menu-name">${child.val().name}</span>
			<input type="submit" id="menu-price ${child.key}" class="menu-price" value=${child.val().price} disabled><div><button id="min ${child.key}" class="circle-button">-
			</button><input type="submit" id="display-qty ${child.key}" class="display-qty" value=0 disabled>
			<button id="plus ${child.key}" class="circle-button">+</button></div></div>`;
		})
	}
// menuInner.innerHTML += `</div>`;

function showErr(err){
	console.log(err);
}

document.addEventListener('click', (e) => {
	let transactionRef = database.ref('wahkacao/transaction')
	if(e.target && e.target.id.startsWith('min') || e.target.id.startsWith('plus')){
		let targetId = e.target.id
		console.log(targetId)
		let lastIdx = targetId.lastIndexOf(targetId.charAt(targetId.length-1))
		let firstIdx = targetId.indexOf(' ')
		let menuDisplay = targetId.substring(firstIdx+1, lastIdx+1)

		if(e.target && e.target.id.startsWith('min')){
			if(document.getElementById(`display-qty ${menuDisplay}`).value - 1 >= 0){
				document.getElementById(`display-qty ${menuDisplay}`).value--
				let a = parseInt(document.getElementById('count-total').value) 
				let b = a - parseInt(document.getElementById(`menu-price ${menuDisplay}`).value)
				document.getElementById('count-total').value = b
			}
		}
		else if(e.target && e.target.id.startsWith('plus') ){
			document.getElementById(`display-qty ${menuDisplay}`).value++
			let a = parseInt(document.getElementById('count-total').value) 
			let b = a + parseInt(document.getElementById(`menu-price ${menuDisplay}`).value)
			document.getElementById('count-total').value = b
		}
	}
})

document.addEventListener('click', (e) => {
	if ( e.target && e.target.id.startsWith('next-to-payment') ) {
		//console.log(zeroFilled = ('000' + 1).substr(-3))
		let gulaiSalmon = document.getElementById('display-qty gulai salmon').value
		let kari = document.getElementById('display-qty kari').value
		let matahSalmon = document.getElementById('display-qty matah salmon').value
		let oriSalmon = document.getElementById('display-qty ori salmon').value
		let original = document.getElementById('display-qty original').value
		let rendang = document.getElementById('display-qty rendang').value

		let transactionRef = database.ref(`wahkacao/transaction`)
		transactionRef.once("value", function(snapshot){
			if(snapshot.exists() == false){
				let transactionRef = database.ref(`wahkacao/transaction/000`)
				transactionRef.set({
					no : "000",
					order : {
						"gulai salmon" : gulaiSalmon,
						"kari" : kari,
						"matah salmon" : matahSalmon, 
						"ori salmon" : oriSalmon,
						"original" : original,
						"rendang" : rendang
					}
				})
			}
			else if(snapshot.exists() == true){
				let transactionRef = database.ref(`wahkacao/transaction`)
				transactionRef.orderByValue().limitToLast(1).once("value", addData)
				function addData(data){
					 data.forEach(function(child){
						console.log(child.val().no)
						console.log(parseInt(child.val().no) + 1)
						let latestOrderNumber = parseInt(child.val().no) + 1
						let newOrderNumber = ('000' + latestOrderNumber).substr(-3)
						console.log(newOrderNumber)
						let newTransactionRef = database.ref(`wahkacao/transaction/${newOrderNumber}`)
						newTransactionRef.on("value", addData, showErr)
						function addData(data){
							newTransactionRef.set({
								no : newOrderNumber,
								order : {
									"gulai salmon" : gulaiSalmon,
									"kari" : kari,
									"matah salmon" : matahSalmon, 
									"ori salmon" : oriSalmon,
									"original" : original,
									"rendang" : rendang
								}
							})
							transactionRef.off("value")
						}
						window.location.href="payment.html"
					 })
				}

				//transactionRef.off('value')
			}
		})
		// transactionRef.push({

		// })
		// transactionRef.on('value', saveTransaction, errTable);
		// function saveTransaction(data){
			
		// }
	}
})