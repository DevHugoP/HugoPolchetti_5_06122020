// let panierRecup = JSON.parse(localStorage.getItem("tableauObjet"));
// let cartNumber = document.getElementById("cartNumber");
// cartNumber.textContent = panierRecup.qty;
// console.log(panierRecup.qty);

document.addEventListener("DOMContentLoaded", () => {
	function fetchData() {
		fetch("http://localhost:3000/api/cameras")
			.then((resp) => resp.json())
			.then((data) => pageAcceuil(data));
	}
	function pageAcceuil(data) {
		console.log(data);

		// console.log(data[1]._id);

		for (let q of data) {
			//faire une loop dans le tableau json

			//Chercher la div qui contiendra tout le contenu
			const bigContainer = document.querySelector(".bigContainer");

			//Créer les elements du DOM nécessaires
			const blocArticle = document.createElement("article");
			const blocCamera = document.createElement("a");
			const imageBoite = document.createElement("img");
			const titreCamera = document.createElement("h3");
			const prixCamera = document.createElement("p");
			const underPic = document.createElement("div");

			//Ajouter les classes et ID + inserer des data si necessaire

			blocArticle.className = "containerArticle";
			blocCamera.href = "produit.html?id=" + q._id;
			blocCamera.classList.add("containerBlocCamera");
			titreCamera.className = "titreCamera";
			imageBoite.setAttribute("src", q.imageUrl);
			imageBoite.classList.add("cameraImg");
			prixCamera.classList.add("prixCamera");
			underPic.classList.add("underPic");

			//mettre les data dans l'element HTML
			titreCamera.textContent = q.name;
			prixCamera.textContent = "prix :  " + q.price / 100 + " euros";

			//Tout ajouter dans la balise container creée sur le index.HTML
			underPic.append(titreCamera, prixCamera);
			blocCamera.append(imageBoite, underPic);
			blocArticle.append(blocCamera);
			bigContainer.append(blocArticle);
		}
	}
	//Appeler la fonction qui fait tout fonctionner
	fetchData();
});
