const setup = () => {
    let datumSamen = new Date("2025/01/28");

    let main = document.getElementsByTagName('main');

    //resultaatP opbouwen
    let resultaatP = document.createElement('p');
    resultaatP.append("Het is nu al:");

    let br = document.createElement('br');
    resultaatP.appendChild(br);

    let span = document.createElement('span');

    //als jaren nul is moet jaren er niet opkomen
    let jarenTekst = "";
    let jaren = jarenMaandenDagenBerekenen(datumSamen)[0];
    if (jaren !== 0) {
        if(jaren.toString().length !== 1) {
            jarenTekst = jaren + " jaren, ";
        } else {
            jarenTekst = jaren + " jaar, ";
        }
    }

    span.textContent = jarenTekst + jarenMaandenDagenBerekenen(datumSamen)[1] + " maanden en " + jarenMaandenDagenBerekenen(datumSamen)[2] + " dagen";

    resultaatP.appendChild(span);

    let br2 = document.createElement('br');
    resultaatP.appendChild(br2);

    resultaatP.append("sinds: ");

    let br3 = document.createElement('br');
    resultaatP.appendChild(br3);

    let span2 = document.createElement('span');
    span2.className = "blueSpan";
    span2.textContent = datumDisplay(datumSamen);

    resultaatP.appendChild(span2);

    main[0].appendChild(resultaatP);

    //check if 28, maakt een image die als je die klikt een geluid afspeelt
    //door google's autoplay policy...
    checkIf28(new Date(Date.now()));
}

const jarenMaandenDagenBerekenen = (datum) => {
    let resultatenArray = [];
    let datumVandaag = new Date(Date.now());

    let years = datumVandaag.getFullYear() - datum.getFullYear();
    let months = datumVandaag.getMonth() - datum.getMonth();
    let days = datumVandaag.getDate() - datum.getDate();

    if (days < 0) {
        months--;
        let prevMonth = new Date(datumVandaag.getFullYear(), datumVandaag.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    resultatenArray.push(years, months, days);
    return resultatenArray;
}

const checkIf28 = (datum) => {
    if(datum.getDate() === 28) {
        let main = document.getElementsByTagName('main');

        let partyPopperDiv = document.createElement('div');
        partyPopperDiv.setAttribute('id', 'partyPopperDiv');

        let newImg = document.createElement('img');
        newImg.setAttribute('src', "Images/party_popper.jpg");
        newImg.setAttribute('alt', "party_popper");
        newImg.setAttribute('id', 'partyPopperImg');
        newImg.addEventListener('click', playSound);

        partyPopperDiv.appendChild(newImg);

        main[0].appendChild(partyPopperDiv);
    }
}

const playSound = () => {
    let audio = new Audio('Audio/dj-airhorn-sound-39405.mp3');
    audio.play();
}

const datumDisplay = (datum) => {
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