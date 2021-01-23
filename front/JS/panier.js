let insertion = document.getElementById("insertion");
let panierRecup = JSON.parse(localStorage.getItem("cart"));

// On recupère les infos du local storage et on crée un element pour montrer le nombre d'article dans le panier (pas de refresh dynamique pour le moment)

function pagePanier() {
	if (panierRecup === null) {
		let voidBox = document.createElement("p");
		voidBox.classList.add("titrevide");
		voidBox.textContent = "Le panier est vide";
		insertion.append(voidBox);
	} else
		for (let x of panierRecup) {
			let imageContainer = document.createElement("div");
			imageContainer.classList.add("imageContainer");

			let imagePanier = document.createElement("img");
			imagePanier.setAttribute("src", x.img);
			imagePanier.classList.add("imagePanier");
			imageContainer.append(imagePanier);

			let descText = document.createElement("div");
			descText.classList.add("boiteText");

			let nomCamera = document.createElement("p");
			nomCamera.textContent = x.name;
			nomCamera.classList.add("nomCamera");

			let prixUnite = document.createElement("p");
			prixUnite.classList.add("prixUnite");
			prixUnite.textContent = "Prix unitaire : " + x.prix + " euros";

			let qty = document.createElement("p");
			qty.classList.add("qty");
			qty.textContent = "Quantité : " + x.qty;

			let somme = document.createElement("p");
			somme.classList.add("somme");
			somme.textContent = x.prix * x.qty + " euros";

			let regroup = document.createElement("div");
			regroup.classList.add("containerImgDesc");

			descText.append(nomCamera, prixUnite, qty, somme);
			regroup.append(imageContainer, descText);
			insertion.append(regroup);
		}
}
pagePanier();

function creerBtn() {
	if (panierRecup) {
		let bouttonSupr = document.createElement("button");
		bouttonSupr.classList.add("suprBtn");
		bouttonSupr.textContent = "supprimer le panier";
		bouttonSupr.addEventListener("click", () => {
			localStorage.clear();
			location.reload();
			return false;
		});
		insertion.append(bouttonSupr);
	}
}
creerBtn();

function totalSigma() {
	if (panierRecup) {
		let sum = 0;
		for (let i = 0; i < panierRecup.length; i++) {
			sum += panierRecup[i].prix * panierRecup[i].qty;
		}
		let addition = document.createElement("p");
		addition.classList.add("total");
		addition.textContent = `Le total est de ${sum} euros.`;
		insertion.append(addition);
	}
}
totalSigma();

//On recupère les id des produits dans le panier et on les places dans un tableau pour l'envoyer sous cette forme au serveur
let idArray = [];

function idRecup() {
	for (let i = 0; i < panierRecup.length; i++) {
		idArray.push(panierRecup[i].id);
	}
}
idRecup();
console.log(idArray[0]);
console.log(typeof idArray[0]);

// On recupère les informations du formulaire pour les vérifier avant de les envoyer au serveur

let firstName = document.getElementById("prenom");
let regexLetters = /^[a-zA-Z]+$/; //match une chaine de caractère de a-z minuscule ou majuscule sans espace ou caractères speciaux

let lastName = document.getElementById("nom");

let address = document.getElementById("adresse");
let regexAddress = /^[a-zA-Z0-9 ]*$/; // match des lettres minuscules majuscules des chiffres avec des espaces

let city = document.getElementById("ville");

let courriel = document.getElementById("courriel");
courriel.addEventListener("blur", function (e) {
	// Correspond à une chaîne de la forme xxx@yyy.zzz
	let regexCourriel = /.+@.+\..+/;
	let validiteCourriel = "";
	if (!regexCourriel.test(e.target.value)) {
		validiteCourriel = "Adresse invalide";
	}
	console.log(courriel.value);
	document.getElementById("aideCourriel").textContent = validiteCourriel;
});
//on push les informations personelles entrées via le formulaire dans l'objet CONTACT
let contact = {};

contact.firstName = firstName.value;
contact.lastName = lastName.value;
contact.address = address.value;
contact.city = city.value;
contact.email = courriel.value;
console.log(contact);

// créer la route POST pour envoyer les informations récupérées dans le tableau + objet
