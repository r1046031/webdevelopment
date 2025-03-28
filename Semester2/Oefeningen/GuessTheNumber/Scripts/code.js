let aantal = 0;
let guesses = [[]];

const setup = () => {
    let btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.addEventListener("click", higherLower)
}

const higherLower = () => {
    let txtHogerLager = document.getElementById("txtHogerLager");
    let guess = 0;
    let hogerLager = "";
    let geradenIn = "";
    let gevonden = false;

    if (txtHogerLager.value === "hoger") {
        hogerLager = "h";
        guess = randomMetGrenzen();
    } else if(txtHogerLager.value === "lager") {
        hogerLager = "l";
        guess = randomMetGrenzen();
    } else if(txtHogerLager.value === "correct") {
        guess = guesses[guesses.length - 1];
        geradenIn = guesses.length;
    } else {
        guess = Math.floor(Math.random() * 100);
    }

    if(aantal === 1) {
        let resultaatPDel = document.getElementById("resultaatP");
        resultaatPDel.remove();
    }

    let section = document.querySelector('section');
    let resultaatP = document.createElement('p');
    resultaatP.setAttribute("id", "resultaatP");

    if(gevonden === true) {
        resultaatP.textContent = guess;
        br = document.createElement('br');
        resultaatP.appendChild(br);
        resultaatP.append("Geraden in " + geradenIn + " keer");
    } else {
        guesses.push([guess, hogerLager]);
        resultaatP.textContent = guess;
        console.log(guess);
    }

    section.appendChild(resultaatP);
    aantal = 1;
}

const randomMetGrenzen = () => {
    let min = 1;
    let max = 100;

    //alles in guesses overlopen en
    //min = het grootste getal waarvan hij hoger zegt
    //max = het kleinste getal waarvan hij lager zegt
    for(let i = 0;i<guesses.length;i++) {
        if(guesses[i][1] === "h" && guesses[i][0] > min) {
            min = guesses[i][0];
        }

        if(guesses[i][1] === "l" && guesses[i][0] < max) {
            max = guesses[i][0];
        }
    }

    //nog te doen
    let resultaat;
}

window.addEventListener("load", setup);