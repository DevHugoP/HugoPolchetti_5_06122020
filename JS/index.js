var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response); // response affiche tout le contenu 
        let a = document.getElementById('cameraName1').innerHTML = (response[0].name);
        let b = document.getElementById('cameraName2').innerHTML = (response[1].name);
        let c = document.getElementById('cameraName3').innerHTML = (response[2].name);
        let d = document.getElementById('cameraName4').innerHTML = (response[3].name);
        let e = document.getElementById('cameraName5').innerHTML = (response[4].name);
        let f = document.getElementById("img1").src = (response[0].imageUrl);
        let g = document.getElementById("img2").src = (response[1].imageUrl);
        let h = document.getElementById("img3").src = (response[2].imageUrl);
        let i = document.getElementById("img4").src = (response[3].imageUrl);
        let j = document.getElementById("img5").src = (response[4].imageUrl);
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();


