//array personen in een global gestopt
let globalPersonen = {
    personen : []
}

// onze setup functie die de event listeners registreert
const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", clearAll);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener('change', toonInformatiePersoon);
};

const bewaarBewerktePersoon = () => {
    // valideer alle input data en controleer of er geen errors meer zijn
    // indien ok, bewaar de ingegeven data.
    // een nieuw aangemaakte persoon voegen we toe
    // een bestaande persoon in de lijst passen we aan

    //controleren of de persoon er al inzit of niet
    //enkel achter als de validatie ok is
    let valideerOK = valideer();
    if(valideerOK === true) {
        let txtVoornaam = document.getElementById("txtVoornaam");
        let txtFamilienaam = document.getElementById("txtFamilienaam");
        let txtGeboorteDatum = document.getElementById("txtGeboorteDatum");
        let txtEmail = document.getElementById("txtEmail");
        let txtAantalKinderen = document.getElementById("txtAantalKinderen");

        let newPersoon = {
            voornaam : txtVoornaam.value,
            familienaam: txtFamilienaam.value,
            geboorteDatum : txtGeboorteDatum.value,
            email : txtEmail.value,
            aantalKinderen : txtAantalKinderen.value
        }

        let indexPersoon;

        let found = false;
        //deze if want anders probeer je een loop te doen (die 1x gaat) waar je een email van een niet-bestaand persoon probeert op te halen

        let globalPersonenLengte = globalPersonen.personen.length;
        if(globalPersonen.personen.length !== 0) {
            let i = 0;

            while (i < globalPersonenLengte && found === false) {
                if(globalPersonen.personen[i].email === newPersoon.email) {
                    indexPersoon = i;
                    found = true;
                }

                i += 1;
            }
        }

        if(found === false) {
            globalPersonen.personen.push(newPersoon);
        } else {
            globalPersonen.personen[indexPersoon] = newPersoon;
        }

        updateLijst();
    }
};

const updateLijst = () => {
    let lstPersonen = document.getElementById("lstPersonen");

    console.log(globalPersonen.personen.length);
    console.log(lstPersonen.options.length);

    if(lstPersonen.options.length !== 0) {
        let i = 0;
        for(let i = lstPersonen.options.length - 1; i >= 0; i--) {
            lstPersonen.options[i].remove();
        }
    }

    for(let i = 0; i < globalPersonen.personen.length; i++) {
        let newOption = document.createElement('option');
        newOption.textContent = globalPersonen.personen[i].voornaam + " " + globalPersonen.personen[i].familienaam;
        newOption.value = i;
        lstPersonen.appendChild(newOption);
    }
};

const toonInformatiePersoon = () => {
    let lstPersonen = document.getElementById("lstPersonen");
    let geselecteerdeOption;

    let i = 0;
    let found = false;
    while (found === false && i < lstPersonen.options.length) {
        if(lstPersonen.options[i].selected) {
            geselecteerdeOption = lstPersonen.options[i].value;
            found = true;
        }
        i++;
    }

    let geselecteerdePersoon = globalPersonen.personen[parseInt(geselecteerdeOption)];

    let txtVoornaam = document.getElementById("txtVoornaam");
    let txtFamilienaam = document.getElementById("txtFamilienaam");
    let txtGeboorteDatum = document.getElementById("txtGeboorteDatum");
    let txtEmail = document.getElementById("txtEmail");
    let txtAantalKinderen = document.getElementById("txtAantalKinderen");

    txtVoornaam.value = geselecteerdePersoon.voornaam;
    txtFamilienaam.value = geselecteerdePersoon.familienaam;
    txtGeboorteDatum.value = geselecteerdePersoon.geboorteDatum;
    txtEmail.value = geselecteerdePersoon.email;
    txtAantalKinderen.value = geselecteerdePersoon.aantalKinderen;
};

const clearAll = () => {
    let txtVoornaam = document.getElementById("txtVoornaam");
    let txtFamilienaam = document.getElementById("txtFamilienaam");
    let txtGeboorteDatum = document.getElementById("txtGeboorteDatum");
    let txtEmail = document.getElementById("txtEmail");
    let txtAantalKinderen = document.getElementById("txtAantalKinderen");

    txtVoornaam.value = "";
    txtFamilienaam.value = "";
    txtGeboorteDatum.value = "";
    txtEmail.value = "";
    txtAantalKinderen.value = "";
};

window.addEventListener("load", setup);