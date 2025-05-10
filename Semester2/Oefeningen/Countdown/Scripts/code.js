global = {
    savedDates: []
}

const setup = () => {
    let btnToevoegen = document.getElementById('btnToevoegen');
    let txtDatum = document.getElementById('txtDatum');

    btnToevoegen.addEventListener('click', () => {
        let datum = new Date(txtDatum.value);
        nieuweDatumToevoegen(datum);
    });

    let stringArray = localStorage.getItem("savedDatesArray");
    if(stringArray) {
        global.savedDates = JSON.parse(stringArray);
    }

    refreshCountdowns();
}

const nogGeenCountdowns = () => {
    let countdowns = document.getElementById('countdownsSection');

    let nogGeenDatumsP = document.createElement('p');
    nogGeenDatumsP.textContent = "Nog geen datums toegevoegd.";
    nogGeenDatumsP.setAttribute('id', 'nogGeenDatumsP');

    countdowns.appendChild(nogGeenDatumsP);

    //errorP kan er nog staan
    let errorP = document.getElementById('errorP');
    if(errorP !== null) {
        errorP.remove();
    }
}

const refreshCountdowns = () => {
    if(global.savedDates.length === 0) {
        nogGeenCountdowns();
    } else {
        for(let i=0; i<global.savedDates.length; i++) {
            let datum = new Date(global.savedDates[i]);
            countdownToevoegen(datum, i);
        }
    }
}

const nieuweDatumToevoegen = (datum) => {
    let nogGeenDatumsP = document.getElementById('nogGeenDatumsP');
    if(nogGeenDatumsP !== null) {
        nogGeenDatumsP.remove();
    }

    let errorP = document.getElementById('errorP');
    if(datumValidatie(datum) !== false) {
        if(errorP !== null) {
            errorP.remove();
        }

        //toevoegen aan localStorage
        global.savedDates.push(datum);
        localStorage.setItem("savedDatesArray", JSON.stringify(global.savedDates));

        countdownToevoegen(datum, (global.savedDates.length - 1));
    } else {
        if(errorP !== null) {
            errorP.textContent = "Voeg een datum in groter dan " + datumDisplay(new Date(Date.now())) + " en een datum die niet al eerder is toegevoegd!";
        } else {
            let countdowns = document.getElementById('countdownsSection');

            errorP = document.createElement('p');
            errorP.id = "errorP";
            errorP.className = "errorMessage";
            errorP.textContent = "Voeg een datum in groter dan " + datumDisplay(new Date(Date.now())) + " en een datum die niet al eerder is toegevoegd!";

            countdowns.appendChild(errorP);
        }
    }
}

const countdownToevoegen = (datum, id) => {
    let countdowns = document.getElementById('countdownsSection');

    //div opbouwen
    let newDiv = document.createElement('div');
    newDiv.className = "countdownDiv";
    newDiv.setAttribute('id', ('countdownDiv' + id));

    //verwijder-knop
    let delButton = document.createElement('button');
    delButton.textContent = "X";
    delButton.addEventListener('click', () => deleteCountdown(delButton));

    newDiv.appendChild(delButton);

    //p tag
    let p = document.createElement('p');
    p.textContent = "Binnen";

    let br = document.createElement('br');
    p.appendChild(br);

    let span = document.createElement('span');
    span.textContent = countdownBerekenen(datum);

    p.appendChild(span);

    let br2 = document.createElement('br');
    p.appendChild(br2);

    p.append("is het: ");

    let br3 = document.createElement('br');
    p.appendChild(br3);

    let span2 = document.createElement('span');
    span2.textContent = datumDisplay(datum);

    p.appendChild(span2);

    newDiv.appendChild(p);

    countdowns.appendChild(newDiv);
}

const deleteCountdown = (event) => {
    //uit de localstorage verwijderen
    let id = event.parentElement.getAttribute('id');
    let indexSubstring = parseInt(id.substring(id.length - 1, id.length));

    global.savedDates.splice(indexSubstring, 1);
    localStorage.setItem("savedDatesArray", JSON.stringify(global.savedDates));

    event.parentElement.remove();

    if(global.savedDates.length === 0){
        nogGeenCountdowns();
    }
}

const datumValidatie = (datum) => {
    if(datum === undefined || datum < Date.now()) {
        return false;
    } else {
        let bestaatNiet = true;
        let i = 0;

        while(bestaatNiet === true && i<global.savedDates.length) {
            let datumArray = new Date(global.savedDates[i]);
            console.log(datumArray.toISOString());
            console.log(datum.toISOString());

            if (datumArray.toISOString() === datum.toISOString()) {
                bestaatNiet = false;
            }

            i++;
        }

        return bestaatNiet;
    }
}

const countdownBerekenen = (datum) => {
    let datumVandaag = new Date(Date.now());

    let years = datum.getFullYear() - datumVandaag.getFullYear();
    let months = datum.getMonth() - datumVandaag.getMonth();
    let days = datum.getDate() - datumVandaag.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(datum.getFullYear(), datum.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    //tekstdisplay
    let yearsText = "";
    if(years !== 0) {
        yearsText = years.toString();
        if(yearsText.length === 1) {
            yearsText = yearsText + " jaar, ";
        } else {
            yearsText = yearsText + " jaren, ";
        }
    }

    let monthsText = "";
    if(months === 1) {
        monthsText = months + " maand, ";
    } else if (months !== 0) {
        monthsText = months + " maanden, ";
    }

    let daysText = "";
    if(days === 1) {
        daysText = days + " dag";
    } else if (days !== 0) {
        daysText = days + " dagen";
    }

    return yearsText + monthsText + daysText;
}

const datumDisplay = (datum) => {
    let maand = datum.getMonth() + 1;
    let dag = datum.getDate();

    if(maand.toString().length === 1) {
        maand = "0" + maand;
    }

    if(dag.toString().length === 1) {
        dag = "0" + dag;
    }

    return dag + "/" + maand + "/" + datum.getFullYear();
}

window.addEventListener("load", setup);