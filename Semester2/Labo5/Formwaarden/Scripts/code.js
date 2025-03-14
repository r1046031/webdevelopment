const setup = () => {
    let btnResultaat = document.getElementById("btnResultaat");
    btnResultaat.addEventListener("click", resultaat)
}

const resultaat = (event) => {
    event.preventDefault();
    let chkRoker = document.getElementById("chkRoker");
    let rdbNederlands = document.getElementById("rdbNederlands");
    let rdbFrans = document.getElementById("rdbFrans");
    let rdbEngels = document.getElementById("rdbEngels");
    let slcBuurland = document.getElementById("slcBuurland");
    let slcBestelling = document.getElementById("slcBestelling");

    //roker?
    let roker = "is ";
    if(chkRoker.checked) {
        roker += "roker";
    }
    else {
        roker += "geen roker";
    }

    //moedertaal?
    let moedertaal = "moedertaal is ";
    if(rdbNederlands.checked) {
        moedertaal += rdbNederlands.value + " ";
    }

    if(rdbFrans.checked) {
        moedertaal += rdbFrans.value + " ";
    }

    if(rdbEngels.checked) {
        moedertaal += rdbEngels.value + " ";
    }
    if (!(rdbNederlands.checked) && !(rdbFrans.checked) && !(rdbFrans.checked)) {
        moedertaal += "--niet geselecteerd--";
    }
    moedertaal = moedertaal.trim();

    //favoriete buurland?
    let buurland = "favoriete buurland is ";
    let i = 0;
    let gevonden = false;
    while(gevonden === false && i < slcBuurland.options.length) {
        if(slcBuurland.options[i].selected) {
            buurland += slcBuurland.options[i].value;
            gevonden = true;
        }
        i++;
    }

    //bestelling?
    let bestelling = "bestelling bestaat uit: ";
    i = 0;
    for(i=0;i<slcBestelling.options.length;i++) {
        if(slcBestelling.options[i].selected) {
            bestelling += slcBestelling.options[i].value + " ";
        }
    }
    bestelling = bestelling.trim();

    //resultaat
    console.log(roker);
    console.log(moedertaal);
    console.log(buurland);
    console.log(bestelling);
}

window.addEventListener("load", setup);