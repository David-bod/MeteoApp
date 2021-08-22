// VERIFICATION SI LE GPS EST DISPONIBLE DANS LE NAVIGATEUR

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) { // RECUPERATION POSITION GPS
        const positionGPS = document.getElementById("position_texte");
        positionGPS.innerHTML = "Latitude : " + position.coords.latitude + " - Longitude : " + position.coords.longitude;
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("long", position.coords.longitude);
        });
    } else { // CAS DE POSITION NON DISPONIBLE SUR LA NAVIGATEUR
    alert("Désolé, la géolocalisation ne fonctionne pas sur votre navigateur.")
    const positionGPS = document.getElementById("position_texte");
    positionGPS.innerHTML = "Coordonnées GPS non disponibles actuellement.";
}

// ---------------------------------------------------------------------------------------------------------------------------------
// RECUPERATION DES DONNEES AVEC LA FONCTION GPS

function gpsVerif(){ // XMLHTTPREQUEST POUR GPS SEULEMENT ET VERIF LOCALSTORAGE LATITUDE ET LONGITUDE
    if(localStorage.getItem("lat") != null && localStorage.getItem("long") != null){
        let url = "https://api.openweathermap.org/data/2.5/find?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&cnt=5&appid=83e43e88bae5408164e0f42de0a475a4&lang=FR";
        getApiData = new Promise((resolve) => {
            var getData = new XMLHttpRequest()
            getData.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText))
                    console.log("Data récupérée (fonctionGetApi)");
                    fonctionRecupDataGPS();
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

// ---------------------------------------------------------------------------------------------------------------------------------
// RECUPERATION DES DONNEES

async function fonctionRecupDataGPS(){ 
    const recupDataJSON = await getApiData;

    const villeData = document.getElementById("ville"); // AFFICHAGE VILLE ET PAYS
    villeData.innerHTML = recupDataJSON.list[0].name + ", " + recupDataJSON.list[0].sys.country;
    localStorage.setItem("GPS", recupDataJSON.list[0].name);
    localStorage.setItem("city", recupDataJSON.list[0].name);
    choice.value = localStorage.getItem("city");

    const weatherClouds = document.getElementById("li1"); // TYPE DE NUAGE ET DESCRIPTION DETAILLES
    weatherClouds.innerHTML = "Actuellement : " + recupDataJSON.list[0].weather[0].description;

    const weatherTemperature = document.getElementById("li2"); // TEMPERATURE + CONVERSION EN CELCIUS
    let tempBrut = recupDataJSON.list[0].main.temp - 273.15;
    let resultat = tempBrut.toFixed(2);
    weatherTemperature.innerHTML = "Température : " + resultat + "°C";
    const progress3 = document.getElementById("progress3");
    progress3.value = resultat + 15;

    const weatherPressure = document.getElementById("li3"); // PRESSION ATMOSHPERIQUE
    weatherPressure.innerHTML = "Pression atmosphérique : " + recupDataJSON.list[0].main.pressure + " hPa";

    const weatherHumidity = document.getElementById("li4"); // TAUX HUMIDITE DANS L'AIR
    weatherHumidity.innerHTML = "Humidité dans l'air : " + recupDataJSON.list[0].main.humidity + "%";
    if(recupDataJSON.list[0].main.humidity >= 10 && recupDataJSON.list[0].main.humidity <= 70){
        weatherHumidity.style.color = "#196F3D";
    }else{
        weatherHumidity.style.color = "#EB984E";
    }

    const weatherCloudsPercentage = document.getElementById("li6"); // POUCENTAGE DE NUAGES
    weatherCloudsPercentage.innerHTML = "Ciel couvert à : " + recupDataJSON.list[0].clouds.all + "%";
    const progress = document.getElementById("progress");
    progress.value = recupDataJSON.list[0].clouds.all;

    const weatherWindSpeed = document.getElementById("li7"); // VITESSE DU VENT
    let speedBrut = recupDataJSON.list[0].wind.speed * 3.6;
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
    const progress2 = document.getElementById("progress2");
    progress2.value = resultatSpeed;

// AFFICHAGE DES LOGOS PAR RAPPORT AU TEMPS EN DIRECT ------------------------------------------------------------------------------

    if(recupDataJSON.list[0].weather[0].description === "couvert" || recupDataJSON.list[0].weather[0].description === "nuageux"){
        initIcons();
        const typeOfCloud = document.getElementById("3");
        typeOfCloud.title = "Actuellement " + recupDataJSON.list[0].weather[0].description;
        typeOfCloud.style.color = "grey";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.list[0].weather[0].description === "ciel dégagé"){
        initIcons();
        const typeOfCloud = document.getElementById("5");
        typeOfCloud.title = "Actuellement " + recupDataJSON.list[0].weather[0].description;
        typeOfCloud.style.color = "#FFD000";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.list[0].weather[0].description === "partiellement nuageux" || recupDataJSON.list[0].weather[0].description === "peu nuageux"){
        initIcons();
        const typeOfCloud = document.getElementById("4");
        typeOfCloud.title = "Actuellement " + recupDataJSON.list[0].weather[0].description;
        typeOfCloud.style.color = "#C3B46E";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "bruine légère" || recupDataJSON.weather[0].description === "brume" || recupDataJSON.weather[0].description === "brouillard"){
        initIcons();
        const typeOfCloud = document.getElementById("2bis");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "gray";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "pluie modérée"){
        const typeOfCloud = document.getElementById("1");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#4386FF";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "légère pluie"){
        const typeOfCloud = document.getElementById("2");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#A5BCE5";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "orage"){
        const typeOfCloud = document.getElementById("bolt");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#FFD000";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }

        // RESTE ECLAIRCIE, ORAGE et NEIGE A DEFINIR

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

    if(localStorage.getItem("GPS") != null){
        const title = document.getElementById("title");
        title.innerHTML = localStorage.getItem("GPS");
    }

    location.reload(); // permet de fix le bug suivant : (Ville 1 > GPS (Ville 2) > actualisation de la page > Ville 1)
                       // Maintenant : (Ville 1 > GPS (Ville 2) > actualisation de la page > Ville 2)
}

// ---------------------------------------------------------------------------------------------------------------------------------
// INITIALISATION DES ICONS A 1EM ET COULEUR NOIR

function initIcons(){
    const typeOfCloud1 = document.getElementById("1"); // cherche les éléments
    const typeOfCloud2 = document.getElementById("2");
    const typeOfCloud2bis = document.getElementById("2bis");
    const typeOfCloud3 = document.getElementById("3");
    const typeOfCloud4 = document.getElementById("4");
    const typeOfCloud5 = document.getElementById("5");

    typeOfCloud1.style.fontSize = "1em"; // initialise la taille à 0.8em
    typeOfCloud2.style.fontSize = "1em";
    typeOfCloud2bis.style.fontSize = "1em";
    typeOfCloud3.style.fontSize = "1em";
    typeOfCloud4.style.fontSize = "1em";
    typeOfCloud5.style.fontSize = "1em";

    typeOfCloud1.style.color = "black"; // initialise les icons sur noir
    typeOfCloud2.style.color = "black";
    typeOfCloud2bis.style.color = "black";
    typeOfCloud3.style.color = "black";
    typeOfCloud4.style.color = "black";
    typeOfCloud5.style.color = "black";
}