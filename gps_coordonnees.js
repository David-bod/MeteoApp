if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) { // RECUPERATION POSITION GPS
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
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

async function fonctionRecupDataGPS(){ // RECUPERATION DES DONNEES
    console.log("Fonction GPS OK");

    const recupDataJSON = await getApiData;

    const villeData = document.getElementById("ville"); // AFFICHAGE VILLE ET PAYS
    villeData.innerHTML = recupDataJSON.list[0].name + ", " + recupDataJSON.list[0].sys.country;

    const weatherClouds = document.getElementById("li1"); // TYPE DE NUAGE ET DESCRIPTION DETAILLES
    weatherClouds.innerHTML = "Le temps est actuellement : " + recupDataJSON.list[0].weather[0].description;

    const weatherTemperature = document.getElementById("li2"); // TEMPERATURE + CONVERSION EN CELCIUS
    let tempBrut = recupDataJSON.list[0].main.temp - 273.15;
    let resultat = tempBrut.toFixed(2);
    weatherTemperature.innerHTML = "Température : " + resultat + "°C";

    const weatherPressure = document.getElementById("li3"); // PRESSION ATMOSHPERIQUE
    weatherPressure.innerHTML = "Pression atmosphérique : " + recupDataJSON.list[0].main.pressure + " hPa";

    const weatherHumidity = document.getElementById("li4"); // TAUX HUMIDITE DANS L'AIR
    weatherHumidity.innerHTML = "Humidité dans l'air : " + recupDataJSON.list[0].main.humidity + "%";
    if(recupDataJSON.list[0].main.humidity >= 10 && recupDataJSON.list[0].main.humidity <= 70){
        weatherHumidity.style.color = "#196F3D";
    }else{
        weatherHumidity.style.color = "#EB984E";
    }

    const weatherVisibility = document.getElementById("li5"); // VISIBILITE EN METRES
    weatherVisibility.innerHTML = "Visibilité : Non disponible par GPS";

    const weatherCloudsPercentage = document.getElementById("li6"); // POUCENTAGE DE NUAGES
    weatherCloudsPercentage.innerHTML = "Ciel couvert à : " + recupDataJSON.list[0].clouds.all + "%";

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

    if(recupDataJSON.list[0].weather[0].description === "couvert" || recupDataJSON.list[0].weather[0].description === "nuageux"){ // AFFICHAGE DES LOGOS
        const typeOfCloud = document.getElementById("3");
        typeOfCloud.title = "Actuellement " + recupDataJSON.list[0].weather[0].description;
        typeOfCloud.style.color = "grey";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.list[0].weather[0].description === "ciel dégagé"){
        const typeOfCloud = document.getElementById("5");
        typeOfCloud.title = "Actuellement " + recupDataJSON.list[0].weather[0].description;
        typeOfCloud.style.color = "#FFD000";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.list[0].weather[0].description === "partiellement nuageux" || recupDataJSON.list[0].weather[0].description === "peu nuageux"){
        const typeOfCloud = document.getElementById("4");
        typeOfCloud.title = "Actuellement " + recupDataJSON.list[0].weather[0].description;
        typeOfCloud.style.color = "#C3B46E";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.transition = "2s";
    }

    console.log("Affichage des paramètres : OK");

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

}