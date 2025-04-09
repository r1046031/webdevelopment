const setup = () => {
    let datumSamen = new Date("2025/01/28");

    let main = document.getElementsByTagName('main');

    let resultaatP = document.createElement('p');
    resultaatP.append("Het is nu al:");

    let br = document.createElement('br');
    resultaatP.appendChild(br);

    let span = document.createElement('span');
    span.textContent = maandenBerekenen() + " maanden, en " + dagenBerekenen() + " dagen sinds:";
    resultaatP.appendChild(span);

    let br2 = document.createElement('br');
    resultaatP.appendChild(br2);

    resultaatP.append(datumDisplay(datumSamen));

    main[0].appendChild(resultaatP);
}

let maandenBerekenen = () => {
    let datumSamen = new Date("2025/01/28");
    let datumVandaag = new Date(Date.now());

    console.log(datumSamen);
    console.log(datumVandaag);

    //moet ik nog doen klopt nog niet
    return Math.round((datumVandaag - datumSamen) /1000 / 60 / 60 / 24);
}

let dagenBerekenen = () => {
    let datumSamen = new Date("2025/01/28");
    let datumVandaag = new Date(Date.now());
    return Math.floor((datumVandaag - datumSamen) / 1000 / 60 / 60 / 24);
}

let datumDisplay = (datum) => {
    let dagDisplay = datum.getDate();
    let maandDisplay = datum.getMonth() + 1;

    if(dagDisplay.toString().length === 1) {
        dagDisplay = "0" + dagDisplay;
    }

    if(maandDisplay.toString().length === 1) {
        maandDisplay = "0" + maandDisplay;
    }

    return dagDisplay + "/" + maandDisplay + "/" + datum.getFullYear();
}

window.addEventListener("load", setup);