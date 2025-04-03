let global = {
    previousGuess: 0,
    guesses: []
}

const setup = () => {
    let btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.addEventListener("click", higherLower);

    let txtHogerLager = document.getElementById("txtHogerLager");
    txtHogerLager.setAttribute("readonly", "true");
}

const higherLower = () => {
    let nmbGetal = document.getElementById("nmbGetal");
    let txtHogerLager = document.getElementById("txtHogerLager");
    let resultaatPBestaat = document.getElementById("resultaatP");

    let guess;
    let hogerLager;
    let finished = false;
    let resultaat = "";
    let check = true;

    if(global.guesses.length === 0) {
        check = numberCheck();
    }

    if(check === true) {
        //hogerLager value
        if(txtHogerLager.value === "hoger" || global.previousGuess === 0) {
            hogerLager = "h";
        } else if(txtHogerLager.value === "lager") {
            hogerLager = "l";
        } else if(txtHogerLager.value === "correct") {
            finished = true;
        } else {
            hogerLager = "x";
        }

        //previousguess pushen
        global.guesses.push([global.previousGuess, hogerLager]);

        //tekst te komen in de p-tag + guess berekenen indien nodig
        if(finished === false) {
            //guess berekenen
            guess = randomMetGrenzen();
            global.previousGuess = guess;

            resultaat = guess;
        } else {
            resultaat = "Finished! " + global.guesses[global.guesses.length - 1][0]+ " geraden in " + (global.guesses.length - 1) + " keer.";

            let section = document.getElementsByTagName('section');

            let resetButton = document.createElement('button');
            resetButton.setAttribute("id", "btnReset");
            resetButton.textContent = "Opnieuw!";
            resetButton.addEventListener('click', reset);

            section[0].appendChild(resetButton);
        }

        //resultaat in p-tag zetten
        if(resultaatPBestaat !== null) {
            let resultaatP = document.getElementById("resultaatP");
            resultaatP.textContent = resultaat;
        } else {
            let section = document.getElementsByTagName('section');

            let resultaatP = document.createElement('p');
            resultaatP.setAttribute('id', 'resultaatP');
            resultaatP.textContent = resultaat;

            section[0].appendChild(resultaatP);
        }
    }
}

const numberCheck = () => {
    let nmbGetal = document.getElementById("nmbGetal");
    let errorPTekst = "";
    let errorAanwezig = document.getElementsByClassName("errorMessage");
    let txtHogerLager = document.getElementById("txtHogerLager");

    let resultaat = true;

    nmbGetal.removeAttribute("readonly");

    if(nmbGetal.value === "") {
        errorPTekst = "Geef een getal in hoger dan 0 of lager en gelijk aan 100.";
    } else if(nmbGetal.value < 1) {
        errorPTekst = "Geef een getal in hoger dan 0!";
    } else if(nmbGetal.value > 100) {
        errorPTekst = "Geef een getal lager dan 100 of gelijk aan 100 in!"
    }

    if(errorPTekst !== "") {
        if(errorAanwezig.length === 0) {
            let section = document.getElementsByTagName('section');

            let newErrorP = document.createElement('p');
            newErrorP.className = "errorMessage";
            newErrorP.textContent = errorPTekst;

            section[0].appendChild(newErrorP);
        } else {
            let errorP = document.getElementsByClassName('errorMessage')[0];
            errorP.textContent = errorPTekst;
        }

        resultaat = false;
    } else {
        if (errorAanwezig.length !== 0) {
            let errorP = document.getElementsByClassName('errorMessage')[0];
            errorP.remove();
        }

        txtHogerLager.removeAttribute("readonly");
        nmbGetal.setAttribute("readonly", "true");
    }

    return resultaat;
}

const randomMetGrenzen = () => {
    let min = 1;
    let max = 100;

    //alles in guesses overlopen en
    //min = het grootste getal waarvan hij hoger zegt
    //max = het kleinste getal waarvan hij lager zegt
    for(let i = 0;i<global.guesses.length;i++) {
        if(global.guesses[i][1] === "h" && global.guesses[i][0] > min) {
            min = global.guesses[i][0];
        } else if(global.guesses[i][1] === "l" && global.guesses[i][0] < max) {
            max = global.guesses[i][0];
        }
    }

    return Math.round(min + Math.random() * (max - min));
}

const reset = () => {
    let nmbGetal = document.getElementById("nmbGetal");
    let txtHogerLager = document.getElementById("txtHogerLager");
    let resultaatP = document.getElementById("resultaatP");
    let btnReset = document.getElementById("btnReset");

    nmbGetal.removeAttribute("readonly");
    nmbGetal.value = "";
    txtHogerLager.value = "";

    txtHogerLager.setAttribute("readonly", "true");

    resultaatP.remove();
    btnReset.remove();

    global.guesses = [];
    global.previousGuess = 0;
}

window.addEventListener("load", setup);