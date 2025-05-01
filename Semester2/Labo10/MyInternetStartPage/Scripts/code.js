global = {
    //array voor de geschiedenis
    history: []
}

const setup = () => {
    let btnGo = document.getElementById('btnGo');
    btnGo.addEventListener('click', zoekopdracht);

    //als er al iets in history zit moeten er cards worden gemaakt
    let historyObjects = localStorage.getItem("savedHistoryObjects");
    if(historyObjects) {
        global.history = JSON.parse(historyObjects);
        refreshCards();
    }
}

//cards plaatsen
const refreshCards = () => {
    let cards = document.getElementsByClassName('card');

    for (let i = cards.length - 1; i >= 0; i--) {
        cards[i].remove();
    }

    for(let i=0; i<global.history.length; i++) {
        //functie voor een card te maken
        historyCardToevoegen(global.history[i].title, global.history[i].text);
    }
}

//zoekopdracht
const zoekopdracht = () => {
    let txtZoekopdracht = document.getElementById('txtZoekopdracht');
    let testResultaat = () => valideerZoekopdracht(txtZoekopdracht.value);

    if(testResultaat() === "") {
        //website
        let website = getWebsite(txtZoekopdracht.value[1]);

        //zoekterm vinden
        let zoekterm = txtZoekopdracht.value.substring(3, txtZoekopdracht.value.length);
        zoekterm = zoekterm.replaceAll(" ", "+");

        //opzoeken
        opzoeken(website, zoekterm);

        //card toevoegen
        historyCardToevoegen(getWebsite(txtZoekopdracht.value[1]), zoekterm);
        updateLocalStorage(getWebsite(txtZoekopdracht.value[1]), zoekterm, getUrl(website), true);
    } else {
        window.alert(testResultaat());
    }
}

//tekst zoekmelding valideren (/ en commando aanwezig of niet)
const valideerZoekopdracht = (zoekopdracht) => {
    let errorMelding = "";

    if(zoekopdracht[0] !== "/") {
        errorMelding = "Unknown command prefix";
    } else {
        if(zoekopdracht[1] !== "g" && zoekopdracht[1] !== "y" && zoekopdracht[1] !== "i" && zoekopdracht[1] !== "x"  && zoekopdracht[1] !== "/") {
            errorMelding = "Invalid command";
        }
    }

    return errorMelding;
}

const opzoeken = (website, zoekterm) => {
    let url = getUrl(website, zoekterm);

    window.open(url);
}

const getUrl = (website, zoekterm) => {
    let url = "";

    switch (website) {
        case "X":
            url = "https://x.com/hashtag/" + zoekterm;
            break;
        case "Youtube":
            url = "https://www.youtube.com/results?search_query=" + zoekterm;
            break;
        case "Instagram":
            url = "https://www.instagram.com/explore/tags/" + zoekterm + "/";
            break;
        default:
            url = "https://www.google.com/search?q=" + zoekterm;
    }

    return url;
}

const getWebsite = (letter) => {
    let website = "";

    switch (letter) {
        case "x":
            website = "X";
            break;
        case "y":
            website = "Youtube";
            break;
        case "i":
            website = "Instagram";
            break;
        default:
            website = "Google";
    }

    return website;
}

//kleuren cards via een klasse
//klasse wordt bepaald door website
const getKleurKlasse = (website) => {
    let klasse = "";

    switch (website) {
        case "X":
            klasse = "cardX";
            break;
        case "Youtube":
            klasse = "cardYoutube";
            break;
        case "Instagram":
            klasse = "cardInstagram";
            break;
        default:
            klasse = "cardGoogle";
    }

    return klasse;
}

const historyCardToevoegen = (website, zoekterm) => {
    //card maken
    let historySection = document.getElementsByClassName('historySection')[0];

    let card = document.createElement("div");

    let klasse = getKleurKlasse(website);

    card.setAttribute("class", (klasse + " card " + "col-4"));

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "cardBody");

    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "cardTitle");
    cardTitle.textContent = website;

    let cardText = document.createElement("p");
    cardText.setAttribute("class", "cardText");
    zoekterm = zoekterm.replaceAll("+", " ");
    cardText.textContent = zoekterm;

    let go = document.createElement("a");
    go.setAttribute("class", "btn btn-primary");
    go.textContent = "Go!";
    go.addEventListener("click", () => opzoeken(website, zoekterm));

    //ik heb een delete functionaliteit toegevoegd als uitbreiding
    //dit is een knop met een event listener naar updateLocalStorage, een functie die ik dan heb uitgebreid
    let del = document.createElement("a");
    del.setAttribute("class", "btn btn-secondary cardDelButton");
    del.textContent = "X";
    del.addEventListener("click", () => updateLocalStorage(website, zoekterm, getUrl(website, zoekterm), false));

    //card toevoegen
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(go);
    cardBody.appendChild(del);

    card.appendChild(cardBody);

    historySection.appendChild(card);
}

//er wordt een boolean meegegeven om te weten of het moet worden verwijderd of toegevoegd aan de localstorage
const updateLocalStorage = (titel, tekst, url, deleteOrAdd) => {
    if(deleteOrAdd === true) {
        //toevoegen aan array history en localstorage updaten
        let nieuwHistoryObject = {
            title: titel,
            text: tekst,
            url: url
        }

        global.history.push(nieuwHistoryObject);
        localStorage.setItem("savedHistoryObjects", JSON.stringify(global.history));
    //anders verwijderen
    } else {
        let nieuweWaardenArray = [];

        for (let i = 0; i < global.history.length; i++) {
            let item = global.history[i];

            console.log(item);
            console.log(titel, tekst);

            let isMatch = item.title === titel && item.text === tekst;

            if (!isMatch) {
                nieuweWaardenArray.push(item);
            }
        }

        global.history = nieuweWaardenArray;
        localStorage.setItem("savedHistoryObjects", JSON.stringify(global.history));
        refreshCards();
    }
}

window.addEventListener("load", setup);