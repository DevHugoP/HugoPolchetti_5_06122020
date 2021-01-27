//Attribution des données aux id respectifs
let paramsConfirmation = new URLSearchParams(window.location.search);

let nameConfirmation = document.getElementById("nameCustomer");
let prixConfirmation = document.getElementById("prixTotal");
let idConfirmation = document.getElementById("idOrder");

nameConfirmation.textContent = paramsConfirmation.get("name");
prixConfirmation.textContent = paramsConfirmation.get("prix");
idConfirmation.textContent = paramsConfirmation.get("id");
