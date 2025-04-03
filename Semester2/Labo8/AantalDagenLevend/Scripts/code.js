const setup = () => {
    let geboortedatum = new Date("2006/09/16");
    let vandaag = new Date(Date.now());
    let dagenSinds = Math.floor((vandaag - geboortedatum) / 1000 /60 / 60 /24);

    console.log("Geboortedatum: " + datumWeergeven(geboortedatum));
    console.log("Datum van vandaag: " + datumWeergeven(vandaag));
    console.log("Hoeveelheid dagen tussen de twee datums: " + dagenSinds);
}

const datumWeergeven = (datum) => {
    //0 voor dag en maand indien nodig
    let dagDisplay = (datum.getDate());
    let monthDisplay = (datum.getMonth() + 1);

    if(dagDisplay.toString().length === 1) {
        dagDisplay = "0" + dagDisplay;
    }

    if(monthDisplay.toString().length === 1) {
        monthDisplay = "0" + monthDisplay;
    }

    return dagDisplay + "/" + monthDisplay + "/" + (datum.getFullYear());
}

window.addEventListener("load", setup);