global = {
    savedDates: []
}

const setup = () => {
    let btnToevoegen = document.getElementById('btnToevoegen');
    let txtDatum = document.getElementById('txtDatum');

    btnToevoegen.addEventListener('click', () => {
        let datum = new Date(txtDatum.value);
        toevoegen(datum);
    });

    //TODO
    let stringArray = localStorage.getItem("savedDatesArray");
    if(stringArray) {
        global.savedDates = JSON.parse(stringArray);

        console.log(global.savedDates);
    }
}

const toevoegen = (datum) => {
    let countdowns = document.getElementById('countdowns');
    if(countdowns === null) {
        let main = document.querySelector('main');

        countdowns = document.createElement('section');
        countdowns.id = 'countdowns';

        main.appendChild(countdowns);
    }

    let errorP = document.getElementById('errorP');
    if(datumValidatie(datum) !== false) {
        let countdowns = document.getElementById('countdowns');

        if(errorP !== null) {
            errorP.remove();
        }

        //div opbouwen
        let newDiv = document.createElement('div');
        newDiv.className = "countdownDiv";

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

        //toevoegen aan localStorage
        global.savedDates.push(datum);
        localStorage.setItem("savedDatesArray", JSON.stringify(global.savedDates));
    } else {
        if(errorP !== null) {
            errorP.textContent = "Voeg een datum in groter dan " + datumDisplay(new Date(Date.now())) + "!";
        } else {
            let countdowns = document.getElementById('countdowns');

            errorP = document.createElement('p');
            errorP.id = "errorP";
            errorP.className = "errorMessage";
            let test = new Date(Date.now());
            errorP.textContent = "Voeg een datum in groter dan " + datumDisplay(test) + "!";

            countdowns.appendChild(errorP);
        }
    }
}

const deleteCountdown = (event) => {
    //TODO
    event.parentElement.remove();
}

const datumValidatie = (datum) => {
    if(datum === undefined || datum < Date.now()) {
        return false;
    } else {
        //TODO
        let bestaatAlTest = true;
        let i = 0;

        while(bestaatAlTest === true && i<global.savedDates.length) {
            console.log(global.savedDates[i]);
            console.log(datum.toISOString());

            if (global.savedDates[i]=== datum.toISOString()) {
                bestaatAlTest = false;
            }

            i++;
        }

        return bestaatAlTest;
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