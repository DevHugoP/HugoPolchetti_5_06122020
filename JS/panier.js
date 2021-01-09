let panierRecup = JSON.parse(localStorage.getItem("tableauObjet"));
let insertion = document.getElementById("insertion");
let cartNumber = document.getElementById("cartNumber");
cartNumber.textContent = panierRecup.qty;
console.log(panierRecup.qty);

// On recupère les infos du local storage et on crée un element pour montrer le nombre d'article dans le panier (pas de refresh dynamique pour le moment)

function pagePanier() {
	if (panierRecup === null) {
		let voidBox = document.createElement("p");
		voidBox.classList.add("titrevide");
		voidBox.textContent = "Le panier est vide";
		insertion.append(voidBox);
	} else {
		let imageContainer = document.createElement("div");
		imageContainer.classList.add("imageContainer");

		let imagePanier = document.createElement("img");
		imagePanier.setAttribute("src", panierRecup.img);
		imagePanier.classList.add("imagePanier");
		imageContainer.append(imagePanier);

		let descText = document.createElement("div");
		descText.classList.add("boiteText");

		let nomCamera = document.createElement("p");
		nomCamera.textContent = panierRecup.nom;
		nomCamera.classList.add("nomCamera");

		let prixUnite = document.createElement("p");
		prixUnite.classList.add("prixUnite");
		prixUnite.textContent = "Prix unitaire : " + panierRecup.prix + " euros";
		console.log(prixUnite);

		let qty = document.createElement("p");
		qty.classList.add("qty");
		qty.textContent = "Quantité : " + panierRecup.qty;
		console.log(qty);

		let somme = document.createElement("p");
		somme.classList.add("somme");
		somme.textContent = "Total = " + panierRecup.prix * panierRecup.qty + " euros";
		console.log(somme);

		descText.append(nomCamera, prixUnite, qty, somme);
		insertion.append(imageContainer, descText);
	}
}
pagePanier();

console.log(localStorage);
