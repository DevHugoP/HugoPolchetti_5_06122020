let urlProduit = window.location.href; // recuperation de l'url avec id produit
const testSplit = urlProduit.split("="); // séparation du string URL en deux à partir du caractère '=' et récupération de l'id
idCamera = testSplit[1];
let panier = JSON.parse(localStorage.getItem("cart")) || [];

function fetchDatas() {
	fetch("http://localhost:3000/api/cameras/" + idCamera) // ici on ajoute a la requete l'id du produit pour recuperer uniquement les infos sur le produit cliqué
		.then((resp) => resp.json())
		.then((cameras) => productPage(cameras));
}
fetchDatas();

function productPage(cameras) {
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
	img.setAttribute("src", cameras.imageUrl);
	img.classList.add("img");

	let selector = document.createElement("select");

	for (let i = 0; i < cameras.lenses.length; i++) {
		//on loop dans l'array 'lenses' pour creer automatiquement une balise 'option' avec la valeur dedans
		let option = document.createElement("option");
		option.textContent = cameras.lenses[i];
		option.value = cameras.lenses[i];
		selector.append(option);
	}

	let price = document.createElement("p");
	price.classList.add("price");
	price.textContent = cameras.price / 100 + " euros";

	let desc = document.createElement("p");
	desc.classList.add("desc");
	desc.textContent = cameras.description;

	let name = document.createElement("p");
	name.textContent = cameras.name;

	let button = document.createElement("button");
	button.setAttribute("id", "button");
	button.classList.add("button");
	button.textContent = "Ajouter au panier";

	underTextBox.append(desc, price, button);
	sideTextBox.append(name, selector);
	imageBox.append(img);
	bigBox.append(sideTextBox, imageBox, underTextBox);
	bigContainer.append(bigBox);

	//Fonctions du bouton

	const product = {
		name: cameras.name,
		id: cameras._id,
		prix: cameras.price / 100,
		img: cameras.imageUrl,
		qty: 1
	};

	button.addEventListener("click", () => {
		function addToCart() {
			for (let i = 0; i < panier.length; i++) {
				if (panier[i].name === product.name) {
					panier[i].qty++;
					return;
				}
			}
			panier.push(product);
		}
		addToCart();

		localStorage.setItem("cart", JSON.stringify(panier));

		function sigmaQty() {
			let sumQty = 0;
			for (let i = 0; i < panier.length; i++) {
				sumQty += panier[i].qty;
			}
			localStorage.setItem("nbObjetPanier", JSON.stringify(sumQty));
		}
		sigmaQty();
		checkCartNumber();
	});
}
