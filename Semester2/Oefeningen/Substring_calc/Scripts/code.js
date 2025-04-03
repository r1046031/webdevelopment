const setup = () => {
    let btnSubmit = document.getElementById('btnSubmit');

    btnSubmit.addEventListener('click', berekenSubstring);
}

const berekenSubstring = () => {
    let txtTekst = document.getElementById('txtTekst');
    let nmbIndex1 = document.getElementById('nmbIndex1');
    let nmbIndex2 = document.getElementById('nmbIndex2');

    let main = document.getElementsByTagName("main");

    let substring = txtTekst.value.substring(nmbIndex1.value, nmbIndex2.value);
    if(substring === "") {
        substring = "gefaald"
    } else {
        substring = "\"" + substring + "\"";
    }

    let slice = txtTekst.value.substring(nmbIndex1.value, nmbIndex2.value);
    if(slice === "") {
        slice = "gefaald"
    } else {
        slice = "\"" + slice + "\"";
    }

    let ptag = document.getElementById('resultaatP');

    if(ptag !== null) {
        ptag = document.getElementById('resultaatP');

        ptag.textContent = "Met substring: " + substring;

        let br = document.createElement('br');
        ptag.appendChild(br);

        ptag.append("Met slice: " + slice);
    } else {
        let resultaat = document.createElement('p');

        resultaat.setAttribute('id', 'resultaatP');
        resultaat.textContent = "Met substring: " + substring;

        let br = document.createElement('br');
        resultaat.appendChild(br);

        resultaat.append("Met slice: " + slice);

        main[0].appendChild(resultaat);
    }
}

window.addEventListener("load", setup);