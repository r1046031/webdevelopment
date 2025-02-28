const setup = () => {
    let btnHerberekenen = document.getElementById('btnHerberekenen');
    btnHerberekenen.addEventListener('click', herberekenen);
};

const herberekenen = () => {
    let aantallen = document.getElementsByClassName('aantal');
    let prijzen = document.getElementsByClassName('prijs');
    let totalen = document.getElementsByClassName('totaal');
    let eindtotaal = document.getElementsByClassName('eindtotaal');
    let btwPercentages = document.getElementsByClassName('btw');

    let prijs1 = prijzen[0].innerText.substring(0, 5);
    let btw1 = btwPercentages[0].innerText.substring(0, 1);
    let totaal1 = aantallen[0].value * parseFloat(prijs1) * (1 + (btw1 / 100));

    let prijs2 = prijzen[1].innerText.substring(0, 5);
    let btw2 = btwPercentages[0].innerText.substring(0, 2);
    let totaal2 = aantallen[1].value * parseFloat(prijs2) * (1 + (btw2 / 100));

    let prijs3 = prijzen[2].innerText.substring(0, 5);
    let btw3 = btwPercentages[0].innerText.substring(0, 2);
    let totaal3 = aantallen[2].value * parseFloat(prijs3) * (1 + (btw3 / 100));

    let eindtotaalBerekening = totaal1 + totaal2 + totaal3;

    totalen[0].innerHTML = totaal1.toFixed(2) + " EUR";
    totalen[1].innerHTML = totaal2.toFixed(2) + " EUR";
    totalen[2].innerHTML = totaal3.toFixed(2) + " EUR";
    eindtotaal[0].innerHTML = eindtotaalBerekening.toFixed(2) + " EUR";
};

window.addEventListener("load", setup);