var database = firebase.database();

let foodRef = database.ref('wahkacao/food');
let transactionRef = database.ref('wahkacao/transaction');

let orderInner = document.getElementById('div-orderNumber');
let paymentInner = document.getElementById('payment-content');
let subtotalTaxInner = document.getElementById('subtotal-tax-div');
let grandtotalInner = document.getElementById('grandtotal-div');

transactionRef.orderByValue().limitToLast(1).once("value", getData)

function getData(snapshot){
	snapshot.forEach(function(child){
		orderInner.innerHTML = `<div class="div-orderNumber">
			ORDER #${child.key}</div><br>`
		newTransactionRef = database.ref(`wahkacao/transaction/${child.key}/order`)
		newTransactionRef.once("value", function(snapshot){
			let subtotal = 0
			let tax = 0
			let grandtotal = 0
			snapshot.forEach(function(child){
				let foodName = child.key
				let foodQty = child.val()
				if(child.val() !== "0"){
					foodRef = database.ref(`wahkacao/food/${foodName}`)
					foodRef.once("value", function(snapshot){
						//console.log(snapshot.val().price)
						let foodPrice = snapshot.val().price
						let totalPrice = parseInt(foodPrice * foodQty)
						paymentInner.innerHTML += `<div class="div-orderList ${foodName}">
						<span class="div-menu ${foodName}">${foodName}</span>
						<span class="div-qty ${foodName}">${foodQty}</span>
						<span id="div-totalPrice ${foodName}" class="div-totalPrice ${foodName}">
						${totalPrice}</span></div>`
						subtotal = parseInt(subtotal) + parseInt(totalPrice)
						tax = parseFloat(subtotal) * 0.1
						console.log(subtotal)
						subtotalTaxInner.innerHTML = 
							`<div id="subtotal-div" class="subtotal-div"><span class="subtotal-label">
							Subtotal</span><span class="subtotal-val">${subtotal}</span></div>
							<div id="tax-div" class="tax-div"><span class="tax-label">Tax(10%)
							</span><span class="tax-val">${tax}</span></div>`
						grandtotal = parseInt(subtotal) + parseInt(tax)
						grandtotalInner.innerHTML = `<span class="grandtotal-label">Total</span>
							<span class="grandtotal-val">${grandtotal}<span/><br>`
					})
				}
			})
		})
		paymentInner.innerHTML = ''
	})
}