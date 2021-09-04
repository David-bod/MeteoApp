function modeAffichage(){
    if(localStorage.getItem("mode") == "dark"){ // passage en mode clair

        const buttonChangeText = document.getElementById("darkText");
        const h1 = document.querySelector("h1"); // balise <h1>
        const h2 = document.querySelector("h2"); // balise <h2>
        const choice = document.getElementById("choice"); // input texte choix de ville
        const buttonSearch = document.getElementById("buttonSearch"); // Bouton rechercher
        const GPS = document.getElementById("GPS"); // Bouton Me localiser
        let li1 = document.getElementById("value1"); // balise <li>
        let li2 = document.getElementById("value2");
        let li3 = document.getElementById("value3");
        let li4 = document.getElementById("value4");
        let li5 = document.getElementById("value5");
        let li6 = document.getElementById("value6");
        let li7 = document.getElementById("value7");
        let li8 = document.getElementById("value8");


        h1.style.color = "black";
        h2.style.color = "black";
        choice.style.backgroundColor = "white"
        choice.style.color = "black";
        buttonSearch.style.backgroundColor = "white";
        buttonSearch.style.color = "black";
        GPS.style.backgroundColor = "rgb(200, 220, 255)";
        GPS.style.color = "black";
        li1.style.color = "black";
        li2.style.color = "black";
        li3.style.color = "black";
        li4.style.color = "black";
        li5.style.color = "black";
        li6.style.color = "black";
        li7.style.color = "black";
        li8.style.color = "black";

        buttonChangeText.innerHTML = "Mode sombre ";
        localStorage.setItem("mode", "light");
        
// PASSAGE EN MODE CLAIR
// ---------------------------------------------------------------------------------------------------------------------------------
// PASSAGE EN MODE SOMBRE

    }else if(localStorage.getItem("mode") == "light"){ // passage en mode sombre
        
        const buttonChangeText = document.getElementById("darkText");
        const h1 = document.querySelector("h1");
        const h2 = document.querySelector("h2");
        const choice = document.getElementById("choice");
        const buttonSearch = document.getElementById("buttonSearch");
        const GPS = document.getElementById("GPS");
        let li1 = document.getElementById("value1");
        let li2 = document.getElementById("value2");
        let li3 = document.getElementById("value3");
        let li4 = document.getElementById("value4");
        let li5 = document.getElementById("value5");
        let li6 = document.getElementById("value6");
        let li7 = document.getElementById("value7");
        let li8 = document.getElementById("value8");


        h1.style.color = "white";
        h2.style.color = "white";
        choice.style.backgroundColor = "#000B39"
        choice.style.color = "white";
        buttonSearch.style.backgroundColor = "#000B39";
        buttonSearch.style.color = "white";
        GPS.style.backgroundColor = "#000B39";
        GPS.style.color = "white";
        li1.style.color = "white";
        li2.style.color = "white";
        li3.style.color = "white";
        li4.style.color = "white";
        li5.style.color = "white";
        li6.style.color = "white";
        li7.style.color = "white";
        li8.style.color = "white";

        buttonChangeText.innerHTML = "Mode clair ";
        localStorage.setItem("mode", "dark");
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------
/* SAUVERGARDE MODE LOCAL STORAGE */

function lightActivate(){
    const buttonChangeText = document.getElementById("darkText");

    buttonChangeText.innerHTML = "Non disponible ";
    localStorage.setItem("mode", "light");
}