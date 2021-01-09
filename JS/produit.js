let panierRecup = JSON.parse(localStorage.getItem("tableauObjet"));
let cartNumber = document.getElementById("cartNumber");
cartNumber.textContent = panierRecup.qty;
console.log(panierRecup.qty);

let urlProduit = window.location.href; // recuperation de l'url avec id produit
let idCamera = urlProduit.substr(38); // soustraction de 38 caracteres de la string href pour obtenir que l'id
console.log(idCamera); // on crée une variable contenant uniquement l'id du produit

function loadProductPage() {
	function fetchDatas() {
		fetch("http://localhost:3000/api/cameras/" + idCamera) // ici on ajoute a la requete l'id du produit pour recuperer uniquement les infos sur le produit cliqué
			.then((resp) => resp.json())
			.then((data) => productPage(data));
	}
	fetchDatas();

	function productPage(data) {
		console.log(data); //on verifie que le contenu est bien l'array de l'id

		const bigContainer = document.getElementById("bigContainer"); // on récupère notre balise réellement créee dans le fichier HTML

		// on crée ensuite les balises HTML avec les attributs et les classes necessaires

		const bigBox = document.createElement("article");
		bigBox.classList.add("bigBox");

		const sideTextBox = document.createElement("div");
		sideTextBox.classList.add("sideTextBox");

		const imageBox = document.createElement("div");
		imageBox.classList.add("imageBox");

		const underTextBox = document.createElement("div");
		underTextBox.classList.add("underTextBox");

		const img = document.createElement("img");
		img.setAttribute("src", data.imageUrl);
		img.classList.add("img");

		let selector = document.createElement("select");

		for (let i = 0; i < data.lenses.length; i++) {
			//on loop dans l'array 'lenses' pour creer automatiquement une balise 'option' avec la valeur dedans
			let option = document.createElement("option");
			option.textContent = data.lenses[i];
			option.value = data.lenses[i];
			selector.append(option);
		}

		let price = document.createElement("p");
		price.classList.add("price");
		price.textContent = data.price / 100 + " euros";

		let desc = document.createElement("p");
		desc.classList.add("desc");
		desc.textContent = data.description;

		let name = document.createElement("p");
		name.textContent = data.name;
		//		BUTTON		//

		let button = document.createElement("button");
		button.setAttribute("id", "button");
		button.classList.add("button");
		button.textContent = "Ajouter au panier";

		let qty = 0;

		let objetCamera = {
			//creation d'un objet contenant les infos du produit
			nom: data.name,
			id: data._id,
			prix: data.price / 100,
			img: data.imageUrl,
			qty: 0
		};

		//Au clique on va rajouter l'objet au local storage // penser a rajouter la fonction de comparaison

		const addToBasket = button.addEventListener("click", function addToBasket() {
			objetCamera.qty++;
			localStorage.setItem("tableauObjet", JSON.stringify(objetCamera));
			console.log(localStorage);
		});

		underTextBox.append(desc, price, button);
		sideTextBox.append(name, selector);
		imageBox.append(img);
		bigBox.append(sideTextBox, imageBox, underTextBox);
		bigContainer.append(bigBox);
	}
}

loadProductPage();
