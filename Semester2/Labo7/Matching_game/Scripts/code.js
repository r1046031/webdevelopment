let global = {
    //ik heb onderstaande global variables in commentaar gezet omdat ik ze niet heb gebruikt
    //AANTAL_HORIZONTAAL: 4,
    //AANTAL_VERTICAAL: 3,
    AANTAL_KAARTEN: 6,
    kaartjes: [[]],
    //ik heb zelf een beetje mijn eigen uitbreidingen toegevoegd
    //waaronder counter en aantalKliks. Counter houdt bij hoeveel kaartenreeksen de speler al heeft gevonden
    //aantalKliks houdt bij hoeveel kaartjes de speler al heeft op geklikt
    counter: 0,
    timeout1: 0,
    timeout2: 0,
    aantalKliks: 0,
    IMAGE_PATH_PREFIX: "Images/",
    IMAGE_PATH_SUFFIX: ".png"
}

const setup = () => {
    //ik heb een button toegevoegd voor het spel dan nog eens opnieuw te spelen
    let btnReset = document.getElementById("btnReset");
    btnReset.addEventListener("click", reset)

    //mijn array is een 2d array omdat ik zo bijhou hoeveel keer een type kaart al is omgedraaid
    global.kaartjes = [["bij",0], ["lieveheersbeestje",0], ["mier",0], ["rups",0], ["slak",0], ["worm",0]];
    console.log(global.kaartjes);
    kaartenToevoegen();
}

const kaartenToevoegen = () => {
    let afbeeldingen = [["bij", "bij grid-item"], ["lieveheersbeestje", "lieveheersbeestje grid-item"], ["mier", "mier grid-item"],
    ["rups", "rups grid-item"], ["slak", "slak grid-item"], ["worm", "worm grid-item"], ["bij2", "bij grid-item"], ["lieveheersbeestje2", "lieveheersbeestje grid-item"],
    ["mier2", "mier grid-item"], ["rups2", "rups grid-item"], ["slak2", "slak grid-item"], ["worm2", "worm grid-item"]];

    //zodat ze iedere keer in een random volgorde op het "speelveld" terecht komen
    //daarvan ook de array
    shuffle(afbeeldingen);

    for(let i = 0; i < afbeeldingen.length; i++) {
        createImage(afbeeldingen[i][0], afbeeldingen[i][1]);
    }
}

//shuffle is een functie die waarden in een array switcht
const shuffle = (array) => {
    let huidigeIndex = array.length;

    while (huidigeIndex !== 0) {

        let randomIndex = Math.floor(Math.random() * huidigeIndex);
        huidigeIndex--;

        [array[huidigeIndex], array[randomIndex]] = [array[randomIndex], array[huidigeIndex]];
    }
}

const kaartenVerwijderen = () => {
    let img1 = document.getElementById("bij");
    let img2 = document.getElementById("lieveheersbeestje");
    let img3 = document.getElementById("mier");
    let img4 = document.getElementById("rups");
    let img5 = document.getElementById("slak");
    let img6 = document.getElementById("worm");
    let img7 = document.getElementById("bij2");
    let img8 = document.getElementById("lieveheersbeestje2");
    let img9 = document.getElementById("mier2");
    let img10 = document.getElementById("rups2");
    let img11 = document.getElementById("slak2");
    let img12 = document.getElementById("worm2");

    img1.remove();
    img2.remove();
    img3.remove();
    img4.remove();
    img5.remove();
    img6.remove();
    img7.remove();
    img8.remove();
    img9.remove();
    img10.remove();
    img11.remove();
    img12.remove();
}

//om efficienter de images te creeëren heb ik nog een functie hiervoor gemaakt
//anders veel copy-paste
const createImage = (id, className, alt) => {
    let main = document.querySelector('main');

    const img = document.createElement('img');
    img.id = id;
    img.className = className;
    //default wordt de achterkant getoond bij het maken van een image
    img.alt = "achterkant";
    img.src = (global.IMAGE_PATH_PREFIX + "achterkant" + global.IMAGE_PATH_SUFFIX);
    img.addEventListener('click', (event) => omdraaien(event.target));
    main.appendChild(img);
}

const omdraaien = (geklikt) => {
    //if else
    //de if else zorgt ervoor dat oftwel de voorkant of achterkant wordt getoond
    //afhankelijk van welke kant er al wordt getoond
    if(geklikt.getAttribute('src') === (global.IMAGE_PATH_PREFIX + geklikt.classList[0] + global.IMAGE_PATH_SUFFIX)) {
        geklikt.setAttribute('src', (global.IMAGE_PATH_PREFIX + "achterkant" + global.IMAGE_PATH_SUFFIX));
        geklikt.style.pointerEvents = "auto";

        //aantal keer dat de kaart is geklikt weer op 0 zetten
        let statusChange = false;
        let i = 0;
        while (statusChange === false && i < global.AANTAL_KAARTEN) {
            if (global.kaartjes[i][0] === geklikt.classList[0]) {
                global.kaartjes[i][1] = 0;
                statusChange = true;
            }
            i++;
        }
    } else {
        geklikt.setAttribute('src', (global.IMAGE_PATH_PREFIX + geklikt.classList[0] + global.IMAGE_PATH_SUFFIX));
        global.aantalKliks++;
        updateAantalKeerGeklikt();

        let statusChange = false;
        let i = 0;
        while (statusChange === false && i < global.AANTAL_KAARTEN) {
            if (global.kaartjes[i][0] === geklikt.classList[0]) {
                if(global.kaartjes[i][1] !== 2) {
                    //aantal keer dat de kaart is geklikt vermeerderen
                    //met += 1 werkte het niet (ik weet niet waarom)
                    global.kaartjes[i][1] += 2;

                    geklikt.style.pointerEvents = "none";
                    global.timeout1 = setTimeout((event) => omdraaien(geklikt), 1000);
                } else {
                    console.log(global.kaartjes[i][1]);

                    //zodat als je een reeks images hebt gevonden, je nog even ze beide ziet voor ze weggaan
                    //anders waren ze zo plotseling weg
                    clearTimeout(global.timeout1);
                    global.timeout2 = setTimeout((event) => hide(geklikt), 1000);
                }

                statusChange = true;
            }
            i++;
        }
    }
}

//counter om te tellen hoeveel keer de speler al op een kaartje heeft geklikt
const updateAantalKeerGeklikt = () => {
    let aantalKeerGeklikt = document.getElementById('aantalKliks');
    aantalKeerGeklikt.textContent = "Aantal keer geklikt: " + global.aantalKliks;
}

//voor een kaart te verstoppen
const hide = (geklikt) => {
    let imagesMetClass = document.getElementsByClassName(geklikt.classList[0]);
    imagesMetClass[0].classList.add('hidden');
    imagesMetClass[1].classList.add('hidden');
    global.counter++;
    counterUpdate();
}

//counter voor te tellen hoeveel de speler al juist heeft updaten
const counterUpdate = () => {
    let counterP = document.getElementById('counter');
    counterP.textContent = "Aantal kaartjes juist: " + global.counter + "/" + global.AANTAL_KAARTEN;
}

const reset = () => {
    kaartenVerwijderen();
    kaartenToevoegen();

    for(let i=0;i<global.kaartjes.length;i++) {
        global.kaartjes[i][1] = 0;
    }

    global.counter = 0;
    global.aantalKliks = 0;

    counterUpdate();
    updateAantalKeerGeklikt();
}

window.addEventListener("load", setup);