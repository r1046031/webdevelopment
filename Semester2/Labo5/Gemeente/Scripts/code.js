const setup = () => {
    let gemeenteLijst = document.getElementById('gemeenteLijst');
    let gemeentes = [];
    let stop = false;
    let i = 0;
    let ingegeven;

    while(stop === false) {
        ingegeven = prompt("Geef een gemeente in, typ \"stop\" om te stoppen:");
        if(ingegeven === "stop") {
            stop = true;
        }
        else if(ingegeven !== "") {
            gemeentes[i] = ingegeven;
        }

        i++;
    }

    console.log(gemeentes);

    i = 0;
    gemeenteLijst.innerHTML = "";
    gemeentes = gemeentes.toSorted();

    for(i=0;i<gemeentes.length;i++) {
        gemeenteLijst.innerHTML += "<option>" + gemeentes[i] + "</option>";
    }
}

window.addEventListener("load", setup);