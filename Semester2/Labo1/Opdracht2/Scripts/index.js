const setup = () => {
    const btnOptellen=document.getElementById("btnOptellen");
    const btnAftrekken=document.getElementById("btnAftrekken");
    const btnVermenigvuldigen=document.getElementById("btnVermenigvuldigen");
    const btnDelen=document.getElementById("btnDelen");

    let txtOutput=document.getElementById("txtOutput");
    let txtLinks=document.getElementById("txtLinks");
    let txtRechts=document.getElementById("txtRechts");

    btnOptellen.addEventListener("click", optellen);
    btnAftrekken.addEventListener("click", aftrekken);
    btnVermenigvuldigen.addEventListener("click", vermenigvuldigen);
    btnDelen.addEventListener("click", delen);
};

const optellen = () => {
    let g1=parseInt(txtLinks.value, 10);
    let g2=parseInt(txtRechts.value, 10);
    let resultaat = g1+g2;

    let resultaatTekst=g1+" + "+g2+" = "+resultaat;
    txtOutput.innerHTML=resultaatTekst;
};

const aftrekken = () => {
    let g1=parseInt(txtLinks.value, 10);
    let g2=parseInt(txtRechts.value, 10);
    let resultaat = g1-g2;

    let resultaatTekst=g1+" - "+g2+" = "+resultaat;
    txtOutput.innerHTML=resultaatTekst;
};

const vermenigvuldigen = () => {
    let g1=parseInt(txtLinks.value, 10);
    let g2=parseInt(txtRechts.value, 10);
    let resultaat = g1*g2;

    let resultaatTekst=g1+" * "+g2+" = "+resultaat;
    txtOutput.innerHTML=resultaatTekst;
};

const delen = () => {
    let g1=parseInt(txtLinks.value, 10);
    let g2=parseInt(txtRechts.value, 10);
    let resultaat;

    if(g2>0) {
        resultaat = g1/g2;
    } else {
        resultaat = 'niet mogelijk, je kan niet delen door 0 of een getal kleiner dan 0';
    }

    let resultaatTekst=g1+" / "+g2+" = "+resultaat;
    txtOutput.innerHTML=resultaatTekst;
};

window.addEventListener('load',setup);