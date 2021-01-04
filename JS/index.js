
document.addEventListener('DOMContentLoaded', ()=>{
    function fetchData() {
        fetch('http://localhost:3000/api/cameras')
        .then(resp => resp.json())
        .then(data => pageAcceuil(data))
      }
      function pageAcceuil(data) {  //faire une loop dans le tableau json
          for (let q of data) {

    //Chercher la div qui contiendra tout le contenu
          const bigContainer  = document.querySelector('.bigContainer');

    //Créer les elements du DOM nécessaires
          const blocArticle = document.createElement('article');
          const blocCamera = document.createElement('a');
          const imageBoite = document.createElement ('img');
          const titreCamera = document.createElement('h3');

    //Ajouter les classes et ID + inserer des data si necessaire
          blocArticle.className = 'containerArticle';    
          blocCamera.className = 'blocCamera';       
          titreCamera.className = 'titreCamera';            
          imageBoite.setAttribute('src', q.imageUrl);
          imageBoite.classList.add('cameraImg');
          blocCamera.classList.add('containerBlocCamera')
          blocCamera.setAttribute('href', './index.html') //Changer le link vers la page produit

    //mettre les data dans l'element HTML
          titreCamera.textContent = q.name;
          
    //Tout ajouter dans la balise container creée sur le index.HTML
          blocCamera.append(titreCamera, imageBoite);
          blocArticle.append(blocCamera);
          bigContainer.append(blocArticle);
          }
       }
    //Appeler la fonction qui fait tout fonctionner 
       fetchData();
    })