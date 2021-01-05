
let urlProduit = window.location.href; // recuperation de l'url avec id produit
let idCamera = urlProduit.substr(38); // soustraction de 38 caracteres de la string href
console.log(idCamera)   // on crée une variable contenant uniquement l'id du produit

function loadProductPage (){

    function fetchDatas () {
        fetch('http://localhost:3000/api/cameras/'+idCamera) // ici on ajoute a la requete l'id du produit pour recuperer uniquement les infos sur le produit cliqué
            .then(resp => resp.json())
            .then(data => productPage(data))
    }      
    fetchDatas ();  
    
    function productPage (data) {

        console.log(data);           //on verifie que le contenu est bien l'array de l'id 

        const bigContainer = document.getElementById('bigContainer');

        // on cree ensuite les balises HTML 

        const bigBox = document.createElement('article');
        const frameText = document.createElement('div');
        const imgBox = document.createElement ('img');
        imgBox.setAttribute('src', data.imageUrl);

        const selector = document.createElement('select')

        for (let i =0; i < data.lenses.length; i++){   //on loop dans l'array 'lenses' pour creer automatiquement une balise 'option' avec la valeur dedans
            let option = document.createElement('option');
            option.textContent=data.lenses[i];
            option.value=data.lenses[i];
        }


    }
}




loadProductPage()
