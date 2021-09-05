const urlMap = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + localStorage.getItem("lat") +"&lon=" + localStorage.getItem("long") + "&appid=83e43e88bae5408164e0f42de0a475a4";

// ---------------------------------------------------------------------------------------------------------------------------------
// RECUPERATION DES DONNEES POUR LES CARTES EN IMAGE

function fonctionGetQualite(){
        getApiData = new Promise((resolve) => {
            var getData = new XMLHttpRequest()
            getData.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText))
                    console.log(this.response);
                } else {
                    reject = console.log("Erreur dans le chargement de la page. Essayez de selectionner une ville. Si le problème persiste, contactez l'admin du site.");
                    return
                }
            }
        getData.open("GET", urlMap);
        getData.send();
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Affichage de la carte sur la page index.html

function affichageQualite(){
    const image = document.getElementById("qualite-air-title");
}