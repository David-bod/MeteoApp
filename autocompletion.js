// ---------------------------------------------------------------------------------------------------------------------------------
// RECUPERATION DES DONNEES AVEC L'API GEO

function getGeo(){
if(localStorage.getItem("valInput") == null){
    localStorage.setItem("valInput", "0");
    console.log("Pas de recherche en cours.");
}else
    console.log("debug : autocompletion chargé --- else");
    let url = "https://geo.api.gouv.fr/communes?nom=" + localStorage.getItem("valInput") + "&fields=departement&boost=population&limit=2";
    getApiDataGeo = new Promise((resolve) => {
        var getData = new XMLHttpRequest()
        getData.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText))
                console.log("Recherche en cours...");
                console.log(this.responseText);
                injectionGeo();
            } else {
                reject = console.log("Erreur dans le chargement de la page.");
                return
            }
        }
        getData.open("GET", url);
        getData.send();
    });
 }

// ---------------------------------------------------------------------------------------------------------------------------------
// RECUPERATION DES DONNEES

 function fonctionRecupDataGeo(){
    const inputChoice = document.getElementById("choice").value;
    if(inputChoice == null || inputChoice.length < 1 ){
        let afficherSpan = document.getElementById("cityGeo");
        afficherSpan.style.display = "none";
        console.log("inputChoice.length < 2 ou vaut null");
     }else{
        let recupValeurInput = document.getElementById("choice").value;
        let afficherSpan = document.getElementById("cityGeo");
        afficherSpan.style.display = "block";
        localStorage.setItem("valInput", recupValeurInput);
        console.log("Récupération :" + recupValeurInput);
        getGeo();
     }
 }

// ---------------------------------------------------------------------------------------------------------------------------------
// INJECTION DES DONNEES

 async function injectionGeo(){
     if(localStorage.getItem("valInput") == null || localStorage.getItem("valInput").length < 1 ){
        console.log("Conditions non ok pour appel API.");
     }else{
        const recupDataGeo = await getApiDataGeo;
        let searchSuggestions = document.getElementById("cityGeo");
        searchSuggestions.innerHTML = recupDataGeo[0].nom + " (" + recupDataGeo[0].departement.code + ")";
     }

 }

 // ---------------------------------------------------------------------------------------------------------------------------------
// INJECTION DES DONNEES DANS L'INPUT

 async function injectionInput(){
    let afficherSpan = document.getElementById("cityGeo").innerHTML;
    let afficherSpanClick = document.getElementById("cityGeo");
    //let inputChoice = document.getElementById("choice").value;
    const recupDataGeo = await getApiDataGeo;
    localStorage.setItem("city", recupDataGeo[0].nom);
    afficherSpanClick.style.display = "none";
    location.reload();
 }