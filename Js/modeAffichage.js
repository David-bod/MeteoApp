function modeAffichage(){
    if(localStorage.getItem("mode") == "dark"){ // passage en light
        const html = document.body; // vers le body
        let li1 = document.getElementById("value1"); // vers les suggestions
        let li2 = document.getElementById("value2");
        let li3 = document.getElementById("value3");
        let li4 = document.getElementById("value4");
        let li5 = document.getElementById("value5");
        let li6 = document.getElementById("value6");
        let li7 = document.getElementById("value7");
        let li8 = document.getElementById("value8");
        const idVille = document.getElementById("ville");
        const containWeather1 = document.getElementById("bc1");
        const containWeather2 = document.getElementById("bc2");
        const containWeather3 = document.getElementById("bc3");
        const buttonChangeText = document.getElementById("darkText"); // vers le span texte
        const marginCoords = document.getElementById("position_texte");

        html.style.background = "no-repeat linear-gradient(90deg, rgb(200, 200, 200) 0%, rgb(255, 255, 255) 50%, rgb(200, 200, 200) 100%)"
        li1.style.color = "black";
        li2.style.color = "black";
        li3.style.color = "black";
        li4.style.color = "black";
        li5.style.color = "black";
        li6.style.color = "black";
        li7.style.color = "black";
        li8.style.color = "black";
        idVille.style.color = "black";
        containWeather1.style.backgroundColor = "rgb(130, 130, 130, 0.5)";
        containWeather2.style.backgroundColor = "rgb(130, 130, 130, 0.5)";
        containWeather3.style.backgroundColor = "rgb(130, 130, 130, 0.5)";
        marginCoords.style.color = "black";


        buttonChangeText.innerHTML = "Mode sombre ";
        localStorage.setItem("mode", "light");
    }else if(localStorage.getItem("mode") == "light"){ // passage en dark
        const html = document.body; // vers le body
        let li1 = document.getElementById("value1"); // vers les suggestions
        let li2 = document.getElementById("value2");
        let li3 = document.getElementById("value3");
        let li4 = document.getElementById("value4");
        let li5 = document.getElementById("value5");
        let li6 = document.getElementById("value6");
        let li7 = document.getElementById("value7");
        let li8 = document.getElementById("value8");
        const idVille = document.getElementById("ville");
        const containWeather1 = document.getElementById("bc1");
        const containWeather2 = document.getElementById("bc2");
        const containWeather3 = document.getElementById("bc3");
        const buttonChangeText = document.getElementById("darkText"); // vers le span texte
        const marginCoords = document.getElementById("position_texte");

        html.style.background = "no-repeat linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(36, 39, 61) 50%, rgb(0, 0, 0) 100%)"
        li1.style.color = "white";
        li2.style.color = "white";
        li3.style.color = "white";
        li4.style.color = "white";
        li5.style.color = "white";
        li6.style.color = "white";
        li7.style.color = "white";
        li8.style.color = "white";
        idVille.style.color = "white";
        containWeather1.style.backgroundColor = "rgb(34, 31, 31, 0.5)";
        containWeather2.style.backgroundColor = "rgb(34, 31, 31, 0.5)";
        containWeather3.style.backgroundColor = "rgb(34, 31, 31, 0.5)";
        marginCoords.style.color = "white";

        buttonChangeText.innerHTML = "Mode clair ";
        localStorage.setItem("mode", "dark");
    }
}

/* SAUVERGARDE MODE LOCAL STORAGE */

function lightActivate(){
    const html = document.body; // vers le body
    let li1 = document.getElementById("value1"); // vers les suggestions
    let li2 = document.getElementById("value2");
    let li3 = document.getElementById("value3");
    let li4 = document.getElementById("value4");
    let li5 = document.getElementById("value5");
    let li6 = document.getElementById("value6");
    let li7 = document.getElementById("value7");
    let li8 = document.getElementById("value8");
    const idVille = document.getElementById("ville");
    const containWeather1 = document.getElementById("bc1");
    const containWeather2 = document.getElementById("bc2");
    const containWeather3 = document.getElementById("bc3");
    const buttonChangeText = document.getElementById("darkText"); // vers le span texte
    const marginCoords = document.getElementById("position_texte");

    html.style.background = "no-repeat linear-gradient(90deg, rgb(200, 200, 200) 0%, rgb(255, 255, 255) 50%, rgb(200, 200, 200) 100%)"
    li1.style.color = "black";
    li2.style.color = "black";
    li3.style.color = "black";
    li4.style.color = "black";
    li5.style.color = "black";
    li6.style.color = "black";
    li7.style.color = "black";
    li8.style.color = "black";
    idVille.style.color = "black";
    containWeather1.style.backgroundColor = "rgb(130, 130, 130, 0.5)";
    containWeather2.style.backgroundColor = "rgb(130, 130, 130, 0.5)";
    containWeather3.style.backgroundColor = "rgb(130, 130, 130, 0.5)";
    marginCoords.style.color = "black";


    buttonChangeText.innerHTML = "Mode sombre ";
    localStorage.setItem("mode", "light");
}