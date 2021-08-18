let url = "https://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("city") + ",fr&appid=83e43e88bae5408164e0f42de0a475a4&lang=FR";

choice.value = localStorage.getItem("city");

if(localStorage.getItem("city") == null){ // SI LE LOCALSTORAGE VIDE
    alert("Oups, il semblerait qu'aucune ville ne soit sélectionnée.");
}else{
    fonctionGetApi();
}

function gpsVerif(){ // XMLHTTPREQUEST POUR GPS SEULEMENT ET VERIF LOCALSTORAGE LATITUDE ET LONGITUDE
    if(localStorage.getItem("lat") != null && localStorage.getItem("long") != null){
        let url = "https://api.openweathermap.org/data/2.5/find?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&cnt=5&appid=83e43e88bae5408164e0f42de0a475a4&lang=FR"
        console.log("Localisation GPS en cours");
        getApiData = new Promise((resolve) => {
            var getData = new XMLHttpRequest()
            getData.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText))
                    console.log(this.response);
                    fonctionRecupDataGPS();
                } else {
                    reject = console.log("Erreur dans le chargement de la page. Essayez de selectionner une ville. Si le problème persiste, contactez l'admin du site.");
                    return
                }
            }
            getData.open("GET", url);
            getData.send();
            console.log("Connexion OK");
        });
    }else{
        fonctionGetApi();
    }
}

function fonctionGetApi(){
    if(localStorage.getItem("city") == null){ // SI LE LOCALSTORAGE NE CONTIENT PAS DE VILLE
        alert("Sélectionnez une ville avant d'actualiser les données.");
    }else{ // SINON RECUPERER LES DONNEES DE LA VILLE
        getApiData = new Promise((resolve) => {
            var getData = new XMLHttpRequest()
            getData.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText))
                    console.log(this.response);
                    fonctionRecupData();
                } else {
                    reject = console.log("Erreur dans le chargement de la page. Essayez de selectionner une ville. Si le problème persiste, contactez l'admin du site.");
                    return
                }
            }
            getData.open("GET", url);
            getData.send();
        });
    }
}

async function fonctionRecupData(){ // RECUPERATION DES DONNEES
    if (localStorage.getItem("mode") == "light"){
        lightActivate();
    }else if(localStorage.getItem("mode") == null){
        localStorage.setItem("mode", "dark");
    }
    localStorage.removeItem("GPS");

    const recupDataJSON = await getApiData;

    const villeData = document.getElementById("ville"); // AFFICHAGE VILLE ET PAYS
    villeData.innerHTML = recupDataJSON.name + ", " + recupDataJSON.sys.country;

    const weatherClouds = document.getElementById("li1"); // TYPE DE NUAGE ET DESCRIPTION DETAILLES
    weatherClouds.innerHTML = "Le temps est actuellement : " + recupDataJSON.weather[0].description;

    const weatherTemperature = document.getElementById("li2"); // TEMPERATURE + CONVERSION EN CELCIUS
    let tempBrut = recupDataJSON.main.temp - 273.15;
    let resultat = tempBrut.toFixed(2);
    weatherTemperature.innerHTML = "Température : " + resultat + "°C";

    const weatherPressure = document.getElementById("li3"); // PRESSION ATMOSHPERIQUE
    weatherPressure.innerHTML = "Pression atmosphérique : " + recupDataJSON.main.pressure + " hPa";

    const weatherHumidity = document.getElementById("li4"); // TAUX HUMIDITE DANS L'AIR
    weatherHumidity.innerHTML = "Humidité dans l'air : " + recupDataJSON.main.humidity + "%";
    if(recupDataJSON.main.humidity >= 10 && recupDataJSON.main.humidity <= 70){
        weatherHumidity.style.color = "#196F3D";
    }else{
        weatherHumidity.style.color = "#EB984E";
    }

    const weatherVisibility = document.getElementById("li5"); // VISIBILITE EN METRES
    weatherVisibility.innerHTML = "Visibilité : " + recupDataJSON.visibility + " mètres";

    const weatherCloudsPercentage = document.getElementById("li6"); // POUCENTAGE DE NUAGES
    weatherCloudsPercentage.innerHTML = "Ciel couvert à : " + recupDataJSON.clouds.all + "%";

    const weatherWindSpeed = document.getElementById("li7"); // VITESSE DU VENT
    let speedBrut = recupDataJSON.wind.speed * 3.6;
    let resultatSpeed = speedBrut.toFixed(2);
    weatherWindSpeed.innerHTML = "Vitesse du vent : " + resultatSpeed + " km/h";
    if(resultatSpeed >= 0 && resultatSpeed <= 20){
        weatherWindSpeed.style.color = "#196F3D";
    }else if(resultatSpeed >= 20.01 && resultatSpeed <= 40){
        weatherWindSpeed.style.color = "#2ECC71";
    }else if(resultatSpeed >= 40.01 && resultatSpeed <= 70){
        weatherWindSpeed.style.color = "#F7DC6F";
    }else if(resultatSpeed >= 70.01 && resultatSpeed <= 90){
        weatherWindSpeed.style.color = "#EB984E";
    }else if(resultatSpeed >= 90.01 && resultatSpeed <= 110){
        weatherWindSpeed.style.color = "#BA4A00";
    }else if(resultatSpeed >= 110.01 && resultatSpeed <= 130){
        weatherWindSpeed.style.color = "#E74C3C";
    }else{
        weatherWindSpeed.style.color = "#8E44AD";
    }

    if(recupDataJSON.weather[0].description === "couvert" || recupDataJSON.weather[0].description === "nuageux"){ // AFFICHAGE DES LOGOS
        const typeOfCloud = document.getElementById("3");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "grey";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "ciel dégagé"){
        const typeOfCloud = document.getElementById("5");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#FFD000";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "partiellement nuageux" || recupDataJSON.weather[0].description === "peu nuageux"){
        const typeOfCloud = document.getElementById("4");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#C3B46E";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "bruine légère"){
        const typeOfCloud = document.getElementById("2bis");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "gray";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }

    if(localStorage.getItem("fav1") != null && localStorage.getItem("fav2") == null){ // VERIFICATION ET AFFICHAGE FAVORIS
        const fav1 = document.getElementById("fav1");
        fav1.innerHTML = localStorage.getItem("fav1");
    }else if(localStorage.getItem("fav1") != null && localStorage.getItem("fav2") != null){
        const fav1 = document.getElementById("fav1");
        fav1.innerHTML = localStorage.getItem("fav1");
        const fav2 = document.getElementById("fav2");
        fav2.innerHTML = localStorage.getItem("fav2");
    }else if(localStorage.getItem("fav1") == null && localStorage.getItem("fav2") != null){
        const fav2 = document.getElementById("fav2");
        fav2.innerHTML = localStorage.getItem("fav2");
    }

    if(localStorage.getItem("city") != null && localStorage.getItem("GPS") == null){ // GESTION DU TITRE
        const title = document.getElementById("title");
        title.innerHTML = localStorage.getItem("city");
    }else if(localStorage.getItem("city") == null && localStorage.getItem("GPS") == null){
        const title = document.getElementById("title");
        title.innerHTML = "Choisissez une ville";
    }else if(localStorage.getItem("GPS") != null){
        const title = document.getElementById("title");
        title.innerHTML = localStorage.getItem("GPS");
    }

}


function choiceCity(){ // CHOIX DE LA VILLE DANS LE CHAMPS TEXTE
    localStorage.removeItem("city");
    const choice = document.getElementById("choice");
    localStorage.setItem("city", choice.value);
    console.log("valeur city initialisée");
}

function clearLocalStorage(){ // NETTOYER LE LOCALSTORAGE
    if(localStorage.getItem("city") == null){ // SI C'EST DEJA VIDE
        alert("Le cache est déjà vide.")
    }else{ // SI LA VALEUR CITY EST ENCORE PLEINE
        localStorage.removeItem("city");
        location.reload();
    }
}

function ajouterFavoris(){ // FONCTION AJOUTER DES FAVORIS
    if(localStorage.getItem("fav1") == null && localStorage.getItem("fav2") != localStorage.getItem("city")){
        localStorage.setItem("fav1", choice.value);
        location.reload();
    }else if(localStorage.getItem("fav1") != null && localStorage.getItem("fav2") == null && localStorage.getItem("fav1") != localStorage.getItem("city")){
        localStorage.setItem("fav2", choice.value);
        location.reload();
    }else if(localStorage.getItem("fav1") != null && localStorage.getItem("fav2") != null){
        let favMax = confirm("Vous avez atteint le nombre maximum de favoris. Voulez vous les supprimer ?"); // FAVORIS PLEINS
        if(favMax == true){
            localStorage.removeItem("fav1");
            localStorage.removeItem("fav2");
            location.reload();
        }else{
            console.log("Favoris non supprimés");
        }
    }else if(localStorage.getItem("fav1") == localStorage.getItem("city") || localStorage.getItem("fav2") == localStorage.getItem("city")){
        alert("Cette ville est déjà dans votre liste de favoris.")
    }
}

function deleteFav1(){ // SUPPRIMER LE FAVORIS 1
    localStorage.removeItem("fav1");
    location.reload();
}

function deleteFav2(){ // SUPPRIMER LE FAVORIS 2
    localStorage.removeItem("fav2");
    location.reload();
}

function fav1Weather(){
    choice.value = localStorage.getItem("fav1");
    choiceCity();
    location.reload();
}

function fav2Weather(){
    choice.value = localStorage.getItem("fav2");
    choiceCity();
    location.reload();
}