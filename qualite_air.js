const urlMap = "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + localStorage.getItem("lat") + "&lon=" + localStorage.getItem("long") + "&appid=83e43e88bae5408164e0f42de0a475a4";

fonctionGetQualite();

// ---------------------------------------------------------------------------------------------------------------------------------
// RECUPERATION DES DONNEES POUR LES CARTES EN IMAGE

function fonctionGetQualite(){
        getQualiteData = new Promise((resolve) => {
            var getDataAir = new XMLHttpRequest()
            getDataAir.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText))
                    affichageQualite();
                } else {
                    reject = console.log("Erreur lors de la récupération des données pour la qualité de l'air");
                    return
                }
            }
        getDataAir.open("GET", urlMap);
        getDataAir.send();
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------
// Affichage de la carte sur la page index.html

async function affichageQualite(){
    qualiteAir = await getQualiteData;

    // Selection des icons RONDS VIDE
    const q1 = document.getElementById("q1");
    const q2 = document.getElementById("q2");
    const q3 = document.getElementById("q3");
    const q4 = document.getElementById("q4");
    const q5 = document.getElementById("q5");

    // Selection des icons RONDS PLEINS
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    const p3 = document.getElementById("p3");
    const p4 = document.getElementById("p4");
    const p5 = document.getElementById("p5");

    const titreQualite = document.getElementById("qualite-air-title");
    titreQualite.style.display = "none";

    const qualiteData = document.getElementById("qualite-data");

    if(qualiteAir.list[0].main.aqi == 1){
        qualiteData.innerHTML = "Qualité de l'air : ( 5/5 ) ";

        q1.style.display = "none";
        q2.style.display = "none";
        q3.style.display = "none";
        q4.style.display = "none";
        q5.style.display = "none";

        p1.style.display = "block";
        p2.style.display = "block";
        p3.style.display = "block";
        p4.style.display = "block";
        p5.style.display = "block";

        p1.style.color = "#27AE60";
        p2.style.color = "#27AE60";
        p3.style.color = "#27AE60";
        p4.style.color = "#27AE60";
        p5.style.color = "#27AE60";

    }else if(qualiteAir.list[0].main.aqi == 2){
        qualiteData.innerHTML = "Qualité de l'air : ( 4/5 ) ";

        q1.style.display = "none";
        q2.style.display = "none";
        q3.style.display = "none";
        q4.style.display = "none";

        p1.style.display = "block";
        p2.style.display = "block";
        p3.style.display = "block";
        p4.style.display = "block";

        p1.style.color = "#2ECC71";
        p2.style.color = "#2ECC71";
        p3.style.color = "#2ECC71";
        p4.style.color = "#2ECC71";

    }else if(qualiteAir.list[0].main.aqi == 3){
        qualiteData.innerHTML = "Qualité de l'air : ( 3/5 ) ";

        q1.style.display = "none";
        q2.style.display = "none";
        q3.style.display = "none";

        p1.style.display = "block";
        p2.style.display = "block";
        p3.style.display = "block";

        p1.style.color = "#F1C40F";
        p2.style.color = "#F1C40F";
        p3.style.color = "#F1C40F";

    }else if(qualiteAir.list[0].main.aqi == 4){
        qualiteData.innerHTML = "Qualité de l'air : ( 2/5 ) ";

        q1.style.display = "none";
        q2.style.display = "none";


        p1.style.display = "block";
        p2.style.display = "block";

        p1.style.color = "#E67E22";
        p2.style.color = "#E67E22";

    }else if(qualiteAir.list[0].main.aqi == 5){
        qualiteData.innerHTML = "Qualité de l'air : ( 1/5 ) ";

        q1.style.display = "none";

        p1.style.display = "block";

        p1.style.color = "#E74C3C";

    }else{
        const iconsQualite = document.getElementById("icons-qualite");

        titreQualite.style.display = "block";
        iconsQualite.style.display = "none";
    }
}