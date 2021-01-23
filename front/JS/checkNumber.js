// RECUPERATION DE LA QTY + AFFICHAGE DU NOMBRE D'ITEM DANS L'ICONE PANIER
function checkCartNumber() {
	let cartItemCount = JSON.parse(localStorage.getItem("nbObjetPanier"));
	let cartCount = document.getElementById("cartNumber");
	cartCount.textContent = cartItemCount || "0";
}
checkCartNumber();
