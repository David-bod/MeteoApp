let url = "http://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem("city") + ",fr&appid=83e43e88bae5408164e0f42de0a475a4&lang=FR";

choice.value = localStorage.getItem("city");

if(localStorage.getItem("city") == null){
    const oups = document.createElement("h3");
    oups.className = "oups";
    oups.innerHTML = "Oups, quelque chose fonctionne mal ! Selectionnez une ville pour résoudre le problème.";
    const main = document.getElementById("main");

    main.appendChild(oups);
}else{
    fonctionGetApi();

}

function fonctionGetApi(){
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

async function fonctionRecupData(){
    const recupDataJSON = await getApiData;

    const villeData = document.getElementById("ville"); // city
    villeData.innerHTML = recupDataJSON.name + ", " + recupDataJSON.sys.country;

    const weatherClouds = document.getElementById("li1"); // type of clouds + description
    weatherClouds.innerHTML = "Le temps est actuellement : " + recupDataJSON.weather[0].description;

    const weatherTemperature = document.getElementById("li2"); // temperature
    let tempBrut = recupDataJSON.main.temp - 273.15;
    let resultat = tempBrut.toFixed(2);
    weatherTemperature.innerHTML = "Température : " + resultat + "°C";

    const weatherPressure = document.getElementById("li3"); // pressure
    weatherPressure.innerHTML = "Pression atmosphérique : " + recupDataJSON.main.pressure + " hPa";

    const weatherHumidity = document.getElementById("li4"); // Humidity of air
    weatherHumidity.innerHTML = "Humidité dans l'air : " + recupDataJSON.main.humidity + "%";
    if(recupDataJSON.main.humidity >= 10 && recupDataJSON.main.humidity <= 70){
        weatherHumidity.style.color = "#196F3D";
    }else{
        weatherHumidity.style.color = "#F7DC6F";
    }

    const weatherVisibility = document.getElementById("li5"); // Visibility in meters
    weatherVisibility.innerHTML = "Visibilité : " + recupDataJSON.visibility + " mètres";

    const weatherCloudsPercentage = document.getElementById("li6");
    weatherCloudsPercentage.innerHTML = "Ciel couvert à : " + recupDataJSON.clouds.all + "%";

    const weatherWindSpeed = document.getElementById("li7");
    let speedBrut = recupDataJSON.wind.speed * 3.6;
    let resultatSpeed = speedBrut.toFixed(2);
    weatherWindSpeed.innerHTML = "Vitesse du vent : " + resultatSpeed + " km/h";
    if(resultatSpeed >= 0 && resultatSpeed <= 20){
        weatherWindSpeed.style.color = "#196F3D";
    }else if(resultatSpeed >= 21 && resultatSpeed <= 40){
        weatherWindSpeed.style.color = "#2ECC71";
    }else if(resultatSpeed >= 41 && resultatSpeed <= 70){
        weatherWindSpeed.style.color = "#F7DC6F";
    }else if(resultatSpeed >= 71 && resultatSpeed <= 90){
        weatherWindSpeed.style.color = "#EB984E";
    }else if(resultatSpeed >= 91 && resultatSpeed <= 110){
        weatherWindSpeed.style.color = "#BA4A00";
    }else if(resultatSpeed >= 111 && resultatSpeed <= 130){
        weatherWindSpeed.style.color = "#E74C3C";
    }else{
        weatherWindSpeed.style.color = "#8E44AD";
    }
}


function choiceCity(){
    localStorage.removeItem("city");
    const choice = document.getElementById("choice");
    localStorage.setItem("city", choice.value);
    console.log("valeur city initialisée");
}

function suggestionsChoice(){
    localStorage.removeItem("city");
    const Suggestions1 = document.getElementById("Value1");

        localStorage.setItem("city", "nantes");
        fonctionGetApi();
        console.log("city selectionnée");
        location.reload();
}