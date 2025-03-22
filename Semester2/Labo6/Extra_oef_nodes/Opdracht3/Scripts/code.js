const setup = () => {
    let myDIV = document.getElementById('myDIV');
    myDIV.addEventListener('click', pTekst)
}

const pTekst = () => {
    let myDIV = document.getElementById('myDIV');
    let p = document.createElement('p');
    p.textContent = "Een paragraaf met tekst.";
    myDIV.appendChild(p);
}

window.addEventListener("load", setup);