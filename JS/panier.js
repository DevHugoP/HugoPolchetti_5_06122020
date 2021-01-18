let insertion = document.getElementById("insertion");
let panierRecup = JSON.parse(localStorage.getItem("cart"));
console.log(panierRecup);

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
	let sum = 0;
	for (let i = 0; i < panierRecup.length; i++) {
		let sommeUnite = [panierRecup[i].prix * panierRecup[i].qty];
		sum += panierRecup[i].prix * panierRecup[i].qty;
	}
	let addition = document.createElement("p");
	addition.classList.add("total");
	addition.textContent = `Le total est de ${sum} euros.`;
	insertion.append(addition);
}

totalSigma();

function sigmaQty() {
	let sumQty = 0;
	for (let i = 0; i < panierRecup.length; i++) {
		sumQty += panierRecup[i].qty;
		console.log(sumQty);
	}
	let nbObjet = document.getElementById("cartNumber");
	nbObjet.textContent = `${sumQty}`;
	localStorage.setItem("nbObjetPanier", sumQty);
}

sigmaQty();

// On recupère les informations dud formulaire pour les vérifier avant de les envoyer au serveur //

document.getElementById("prenom");

document.getElementById("nom");

document.getElementById("adresse");

document.getElementById("ville");

document.getElementById("courriel").addEventListener("blur", function (e) {
	// Correspond à une chaîne de la forme xxx@yyy.zzz
	var regexCourriel = /.+@.+\..+/;
	var validiteCourriel = "";
	if (!regexCourriel.test(e.target.value)) {
		validiteCourriel = "Adresse invalide";
	}
	document.getElementById("aideCourriel").textContent = validiteCourriel;
});
