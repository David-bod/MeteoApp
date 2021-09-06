let url = "https://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("city") + ",fr&appid=83e43e88bae5408164e0f42de0a475a4&lang=FR";
// ---------------------------------------------------------------------------------------------------------------------------------
// SI LE LOCALSTORAGE VIDE

if(localStorage.getItem("city") == null){
    localStorage.setItem("city", "Paris");
    location.reload();
}else{ // SINON LANCER LA FONCTION
    fonctionGetApi();
}

// ---------------------------------------------------------------------------------------------------------------------------------
// RECUPERATION DES DONNEES SANS LE GPS

function fonctionGetApi(){
    if(localStorage.getItem("city") == null){ // SI LE LOCALSTORAGE NE CONTIENT PAS DE VILLE
        console.log("Oups. Pas de ville sélectionnée");
    }else{ // SINON RECUPERER LES DONNEES DE LA VILLE
        getApiData = new Promise((resolve) => {
            var getData = new XMLHttpRequest()
            getData.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText))
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

// ---------------------------------------------------------------------------------------------------------------------------------

async function fonctionRecupData(){ // RECUPERATION DES DONNEES

    if (localStorage.getItem("mode") == "light"){ // GESTION MODE CLAIR OU SOMBRE
        lightActivate();
    }else if(localStorage.getItem("mode") == null){
        localStorage.setItem("mode", "dark");
    }

    gestionFavoris(); // Gestion coeur favoris
    initIcons(); // initialisation des icons à 1em
    console.log("Ville affichée : " + localStorage.getItem("city") + ".");

    localStorage.removeItem("GPS"); // remove du GPS

    const recupDataJSON = await getApiData;

    const villeData = document.getElementById("ville"); // AFFICHAGE VILLE ET PAYS
    villeData.innerHTML = recupDataJSON.name + ", " + recupDataJSON.sys.country;

    const weatherClouds = document.getElementById("temps-actuel"); // TYPE DE NUAGE ET DESCRIPTION DETAILLES
    weatherClouds.innerHTML = "Actuellement : " +  recupDataJSON.weather[0].description;

    const weatherTemperature = document.getElementById("temperature"); // TEMPERATURE + CONVERSION EN CELCIUS
    let tempBrut = recupDataJSON.main.temp - 273.15;
    let resultat = tempBrut.toFixed(2);
    weatherTemperature.innerHTML = "Température : " + resultat + "°C";
    const progress3 = document.getElementById("progress3");
    progress3.value = resultat + 15;

    const weatherPressure = document.getElementById("pression-atmo"); // PRESSION ATMOSHPERIQUE
    weatherPressure.innerHTML = "Pression atmosphérique : " + recupDataJSON.main.pressure + " hPa";

    const weatherHumidity = document.getElementById("taux-humidite"); // TAUX HUMIDITE DANS L'AIR
    weatherHumidity.innerHTML = "Humidité dans l'air : " + recupDataJSON.main.humidity + "%";
    if(recupDataJSON.main.humidity >= 10 && recupDataJSON.main.humidity <= 70){ // COULEUR PAR RAPPORT AU TAUX D'HUMIDITE
        weatherHumidity.style.color = "#196F3D";
    }else{
        weatherHumidity.style.color = "#EB984E";
    }
    const progress4 = document.getElementById("progress4");
    progress4.value = recupDataJSON.main.humidity;

    const weatherCloudsPercentage = document.getElementById("couverture-ciel"); // POURCENTAGE DE NUAGES
    weatherCloudsPercentage.innerHTML = "Ciel couvert à : " + recupDataJSON.clouds.all + "%";
    const progress = document.getElementById("progress");
    progress.value = recupDataJSON.clouds.all;

    const weatherWindSpeed = document.getElementById("vitesse-vent"); // VITESSE DU VENT
    let speedBrut = recupDataJSON.wind.speed * 3.6;
    let resultatSpeed = speedBrut.toFixed(2);
    weatherWindSpeed.innerHTML = "Vitesse du vent : " + resultatSpeed + " km/h";
    if(resultatSpeed >= 0 && resultatSpeed <= 20){ // COULEUR PAR RAPPORT A LA VITESSE DU VENT
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

    if(recupDataJSON.weather[0].description === "couvert" || recupDataJSON.weather[0].description === "nuageux"){
        const typeOfCloud = document.getElementById("3");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "grey";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.opacity = "1";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "ciel dégagé"){
        const typeOfCloud = document.getElementById("5");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#FFD000";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.opacity = "1";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "partiellement nuageux" || recupDataJSON.weather[0].description === "peu nuageux"){
        const typeOfCloud = document.getElementById("4");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#C3B46E";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.opacity = "1";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "bruine légère" || recupDataJSON.weather[0].description === "brume" || recupDataJSON.weather[0].description === "brouillard"){
        const typeOfCloud = document.getElementById("2bis");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "gray";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.opacity = "1";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "pluie modérée"){
        const typeOfCloud = document.getElementById("1");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#4386FF";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.opacity = "1";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "légère pluie"){
        const typeOfCloud = document.getElementById("2");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#A5BCE5";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.opacity = "1";
        typeOfCloud.style.transition = "2s";
    }else if(recupDataJSON.weather[0].description === "orage"){
        const typeOfCloud = document.getElementById("bolt");
        typeOfCloud.title = "Actuellement " + recupDataJSON.weather[0].description;
        typeOfCloud.style.color = "#FFD000";
        typeOfCloud.style.fontSize = "3em";
        typeOfCloud.style.opacity = "1";
        typeOfCloud.style.transition = "2s";
    }

        // RESTE ECLAIRCIE, ORAGE et NEIGE A DEFINIR

// ---------------------------------------------------------------------------------------------------------------------------------
// VERIFICATION ET AFFICHAGE FAVORIS

    if(localStorage.getItem("fav1") != null && localStorage.getItem("fav2") == null){ 
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

// ---------------------------------------------------------------------------------------------------------------------------------
// GESTION DU TITRE

    if(localStorage.getItem("city") != null && localStorage.getItem("GPS") == null){ 
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

// ---------------------------------------------------------------------------------------------------------------------------------
// CHOIX DE LA VILLE DANS LE CHAMPS TEXTE

function choiceCity(){ 
    localStorage.removeItem("city");
    const choice = document.getElementById("choice");
    localStorage.setItem("city", choice.value);
}

// ---------------------------------------------------------------------------------------------------------------------------------
// NETTOYER LE LOCALSTORAGE

function clearLocalStorage(){ 
    if(localStorage.getItem("city") == null){ // SI C'EST DEJA VIDE
        console.log("Oups. Le cache est déjà vide");
    }else{ // SI LA VALEUR CITY EST ENCORE PLEINE
        localStorage.removeItem("city");
        location.reload();
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------
// FONCTION AJOUTER DES FAVORIS

function ajouterFavoris(){
    const villeActuelle = localStorage.getItem("city");
    if(localStorage.getItem("fav1") == null && localStorage.getItem("fav2") != localStorage.getItem("city")){
        localStorage.setItem("fav1", villeActuelle);
        location.reload();
    }else if(localStorage.getItem("fav1") != null && localStorage.getItem("fav2") == null && localStorage.getItem("fav1") != localStorage.getItem("city")){
        localStorage.setItem("fav2", villeActuelle);
        location.reload();
    }else if(localStorage.getItem("fav1") != null && localStorage.getItem("fav2") != null){
        const erreur = document.getElementById("erreur_texte");
        const divErreur = document.getElementById("erreur");
        const iconErreur = document.getElementById("icon_erreur");

        erreur.style.display = "block";
        divErreur.style.display = "inline-block";
        iconErreur.style.display = "block";
        erreur.style.color = "white";
        erreur.style.transition = ".5s";
        erreur.style.fontSize = "1.4em";
        erreur.innerHTML = "Vous avez atteint le nombre maximum de favoris possible";
    }else if(localStorage.getItem("fav1") == localStorage.getItem("city") || localStorage.getItem("fav2") == localStorage.getItem("city")){
        const erreur = document.getElementById("erreur_texte");
        const divErreur = document.getElementById("erreur");
        const iconErreur = document.getElementById("icon_erreur");

        erreur.style.display = "block";
        divErreur.style.display = "inline-block";
        iconErreur.style.display = "block";
        erreur.style.color = "white";
        erreur.style.transition = ".5s";
        erreur.style.fontSize = "1.4em";
        erreur.innerHTML = "Vous avez déjà cette ville dans vos favoris"
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------
// GESTION DES FAVORIS AVEC LE COEUR + SUPPRESSION

function gestionFavoris(){
    const ajouterFavorisN = document.getElementById("ajouterFavoris");
    const favorisActuel = document.getElementById("favorisActuel");
    
    if(localStorage.getItem("city") == localStorage.getItem("fav1") || localStorage.getItem("city") == localStorage.getItem("fav2")){
        favorisActuel.style.display = "block"; // Favoris en cours
        favorisActuel.title = "Supprimer cette ville des favoris";

        ajouterFavorisN.style.display = "none";
    }else if(localStorage.getItem("city") !== localStorage.getItem("fav1") || localStorage.getItem("city") !== localStorage.getItem("fav2")){
        ajouterFavorisN.style.display = "block";
        ajouterFavorisN.title = "Ajouter cette ville aux favoris";

        favorisActuel.style.display = "none";
    }else{
        console.log("Erreur dans la gestion des favoris.");
    }
}

// SUPPRESSION COEUR

function suppressionCoeur(){
    if(localStorage.getItem("city") == localStorage.getItem("fav1")){
        localStorage.removeItem("fav1");
        location.reload();
    }else if(localStorage.getItem("city") == localStorage.getItem("fav2")){
        localStorage.removeItem("fav2");
        location.reload();
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------
// SUPPRIMER LE FAVORIS 1

function deleteFav1(){ 
    localStorage.removeItem("fav1");
    location.reload();
}

// SUPPRIMER LE FAVORIS 2

function deleteFav2(){ 
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

// VERIFICATION DES CARACTERES UTILISES DANS L'INPUT RECHERCHER

function verif(){
    let inputText = document.getElementById("choice").value;
    let regex = /^[a-zA-Z\- ]+$/;
    console.log(inputText);

    if (!regex.test(inputText)) {
        console.log("Caractère interdit.");
      resetInput();
    }else{
        fonctionRecupDataGeo();
    }
}

function resetInput(){
    let resetInput = document.getElementById("choice");
    resetInput.value = "";
}

function supprimerErreur(){
    const erreur = document.getElementById("erreur_texte");
    const divErreur = document.getElementById("erreur");
    const iconErreur = document.getElementById("icon_erreur");

    erreur.style.display = "none";
    divErreur.style.display = "none";
    iconErreur.style.display = "none";
}