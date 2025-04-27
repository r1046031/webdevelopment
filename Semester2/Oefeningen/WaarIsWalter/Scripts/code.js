global = {
    clicks: 0
}

//zorgt ervoor dat alles pas wordt uitgevoerd als de pagina geladen is
const setup = () => {
    reset();
}

const reset = () => {
    //clicks weer op nul zetten als het nog niet op nul stond
    if(global.clicks !== 0) {
        global.clicks = 0;

        //en de tekst van de p-tag ook veranderen
        let aantalKliks = document.getElementById('aantalKliks');
        aantalKliks.textContent = "Aantal keer geklikt: ";
    }

    //tekst van finishP (krijg je te zien als je het spel hebt beëindigt)
    let finishP = document.getElementById("finishP");
    finishP.textContent = "";

    //je kunt niet op btnOpnieuw klikken als je bezig bent met het spel
    let btnOpnieuw = document.getElementById('btnOpnieuw');
    btnOpnieuw.style.pointerEvents = 'none';

    //als er al images zijn eerst verwijderen
    //voor ze dan nog eens toe te voegen zodat walter weer op een random locatie staat
    let images = document.querySelectorAll('img');
    if(images !== null) {
        for(let i=0;i<images.length;i++) {
            images[i].remove();
        }
    }

    veldVullen();
}

//veldVullen plaatst de images en zet walter op een random locatie
//walter kun je eerst niet zien, dus bepaal ik waar walter is met een speciaal id
//als je op een image mat dat speciaal id klikt, zie je dan een image met walter en heb je het spel gewonnen
const veldVullen = () => {
    let random = Math.round(Math.random() * 7);

    for(let i = 0; i <= 7; i++) {
        if(i === random) {
            imagesAanmaken("imgWalter", 'Images/walter_background.png');
        } else {
            imagesAanmaken(("img" + i), 'Images/walter_background.png');
        }
    }
}

//functie die helpt met het aanmaken van de images
const imagesAanmaken = (id, src) => {
    let imagesGame = document.getElementsByClassName('imagesGame')[0];

    let newImg = document.createElement("img");
    newImg.setAttribute('id', id);
    newImg.setAttribute('src', src);
    newImg.addEventListener('click', () => isImageWalter(newImg))

    imagesGame.appendChild(newImg);
}

//voor de images onklikbaar te maken als je klaar bent met het spel (wordt ook dan pas uitgevoerd)
const imagesUnclickableMaken = () => {
    let images = document.querySelectorAll('img');

    for(let i = 0; i < images.length; i++) {
        images[i].style.pointerEvents = 'none';
    }
}

//dit wordt uitgevoerd als je op een image klikt
//het kijkt of de image waarop je hebt geklikt het speciale id van walter heeft of niet
//als het het speciale id van walter heeft heb je gewonnen en eindigt het spel (functie finish)
//anders gaat het spel gewoon door
const isImageWalter = (event) => {
    //aantal keer dat je op een kaartje hebt geklikt vermeerderen
    global.clicks += 1;

    if(event.id === "imgWalter") {
        event.src = 'Images/walter.jpg';

        finish();
    } else {
        event.removeEventListener('click', () => isImageWalter(event));
        omdraaien(event);

        //het kaartje draait weer terug om na een seconde
        let timeout = setTimeout(() => omdraaien(event), 1000);
    }

    //het aantal keer dat je op een kaartje hebt geklikt tonen (in een p tag)
    if(global.clicks !== 0) {
        let spanId = document.getElementById("aantalKliksSpan");

        if(spanId !== null) {
            spanId.textContent = global.clicks;
        } else {
            let aantalKliks = document.getElementById('aantalKliks');

            spanId = document.createElement('span');
            spanId.setAttribute('id', 'aantalKliksSpan');
            spanId.setAttribute('class', 'spanClass');
            spanId.textContent = global.clicks;

            aantalKliks.appendChild(spanId);
        }
    }
}

//als het image niet van walter is dan zal deze functie gebeuren
//draait de kaart om naar de "womp womp" afbeelding en omgekeerd
const omdraaien = (event) => {
    if((event.id).toString().includes("Fout")) {
        event.src = 'Images/walter_background.png';
        event.id = event.id.toString().substring(0, (event.id.toString()).indexOf("Fout"));
    } else {
        event.src = 'Images/fout.png';
        event.id = event.id + "Fout";
    }

    event.addEventListener("click", () => isImageWalter(event));
}

//deze functie wordt uitgevoerd wanneer je klaar bent met het spel
const finish = () => {
    console.log("finish!");
    imagesUnclickableMaken();

    //finishP toont een soort felicitatie dat je Walter hebt gevonden
    let finishP = document.getElementById("finishP");

    finishP.textContent = "Proficiat, je hebt Walter na ";

    let finishPSpan = document.createElement('span');
    finishPSpan.setAttribute('class', 'spanClass');
    finishPSpan.textContent = global.clicks;
    finishP.appendChild(finishPSpan);

    finishP.append(" keer zoeken gevonden!");

    //je kunt weer op btnOpnieuw klikken
    let btnOpnieuw = document.getElementById('btnOpnieuw');
    btnOpnieuw.style.pointerEvents = 'auto';
    btnOpnieuw.addEventListener('click', reset);

    speelGeluidje();
}

const speelGeluidje = () => {
    let audio = new Audio('Sounds/you_have_found_walter.mp3');
    audio.play();
}

window.addEventListener("load", setup);