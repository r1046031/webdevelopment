const setup = () => {
    let btnSubmit = document.getElementById("btnSubmit");

    btnSubmit.addEventListener("click", berekenInitialen)
}

const berekenInitialen = () => {
    let txtTekst = document.getElementById("txtTekst");
    let errTekst = document.getElementById("errTekst");
    let section = document.getElementsByTagName("section");

    if(txtTekst.value === "") {
        errTekst.textContent = "Je hebt niets ingevuld!";
    } else if (txtTekst.value.indexOf(" ") === -1) {
        errTekst.textContent = "Het formaat is niet juist!";
    } else {
        let split = txtTekst.value.substring(txtTekst.value.indexOf(" ") + 1, txtTekst.value.length - 1)
        let resultaat = txtTekst.value.substring(0, 1) + split.substring(0,1);

        let resultaatPBestaat = document.getElementById('resultaatP');
        if(resultaatPBestaat !== null) {
            resultaatPBestaat.textContent = resultaat.toUpperCase();
        } else {
            let resultaatP = document.createElement('p');
            resultaatP.setAttribute('id', 'resultaatP');
            resultaatP.textContent = resultaat.toUpperCase();
            section[0].appendChild(resultaatP);
        }
    }
}

window.addEventListener("load", setup);