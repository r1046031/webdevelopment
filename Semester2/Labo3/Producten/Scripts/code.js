const setup = () => {
    let btnHerberekenen = document.getElementById('btnHerberekenen');
    btnHerberekenen.addEventListener('click', herberekenen);
};

const herberekenen = () => {
    let aantallen = document.getElementsByClassName('aantal');
    let prijzen = document.getElementsByClassName('prijs');
    let totalen = document.getElementsByClassName('totaal');
    let eindtotaal = document.getElementsByClassName('eindtotaal');

    let prijs1 = prijzen[0].innerText.substring(0, 5);
    let totaal1 = aantallen[0].value * parseFloat(prijs1);

    let prijs2 = prijzen[1].innerText.substring(0, 5);
    let totaal2 = aantallen[1].value * parseFloat(prijs1);

    let prijs3 = prijzen[2].innerText.substring(0, 5);
    let totaal3 = aantallen[2].value * parseFloat(prijs1);

    let eindtotaalBerekening = totaal1 + totaal2 + totaal3;

    totalen[0].innerHTML = totaal1.toFixed(2) + " EUR";
    totalen[1].innerHTML = totaal2.toFixed(2) + " EUR";
    totalen[2].innerHTML = totaal3.toFixed(2) + " EUR";
    eindtotaal[0].innerHTML = eindtotaalBerekening.toFixed(2) + " EUR";
};

window.addEventListener("load", setup);