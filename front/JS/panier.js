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

let sum = 0;

if (panierRecup) {
	for (let i = 0; i < panierRecup.length; i++) {
		sum += panierRecup[i].prix * panierRecup[i].qty;
	}
	let addition = document.createElement("p");
	addition.classList.add("total");
	addition.textContent = `Le total est de ${sum} euros.`;
	insertion.append(addition);
}

// FORMULAIRE // (les patterns de vérification des input sont dans panier.HTML)

document.getElementById("formulaire").addEventListener("submit", function (envoi) {
	envoi.preventDefault();

	if (panierRecup === null) {
		alert("le panier est vide");
	} else {
		let firstName = document.getElementById("prenom");
		let lastName = document.getElementById("nom");
		let address = document.getElementById("adresse");
		let city = document.getElementById("ville");
		let courriel = document.getElementById("courriel");

		//on push les informations personelles entrées via le formulaire dans l'objet CONTACT
		let contact = {
			firstName: firstName.value,
			lastName: lastName.value,
			address: address.value,
			city: city.value,
			email: courriel.value
		};

		console.log(firstName.value);
		//On recupère les id des produits dans le panier et on les places dans un tableau pour l'envoyer sous cette forme au serveur

		let idProducts = [];

		function idRecup() {
			for (let i = 0; i < panierRecup.length; i++) {
				idProducts.push(panierRecup[i].id);
			}
		}
		idRecup();

		// créer la route POST pour envoyer les informations récupérées dans le tableau + objet
		const data = {
			contact: contact,
			products: idProducts
		};
		fetch("http://localhost:3000/api/cameras/order", {
			body: JSON.stringify(data),
			headers: { "Content-type": "application/json;charset=utf-8" },
			method: "POST"
		})
			.then((response) => response.json())
			.then(function (backData) {
				console.log(backData);
				window.location = `./confirmation.html?id=${backData.orderId}&name=${firstName.value}&prix=${sum}`;
			});
		localStorage.clear();
	}
});
