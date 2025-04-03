global = {
    added: 0
}

const setup = () => {
    let btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.addEventListener('click', verwerken);
}

const verwerken = (event) => {
    event.preventDefault();

    let txtVoornaam = document.getElementById('txtVoornaam');
    let txtFamilienaam = document.getElementById('txtFamilienaam');
    let txtTitel = document.getElementById('txtTitel');
    let txtAuteur = document.getElementById('txtAuteur');
    let rdbFantasy = document.getElementById('rdbFantasy');
    let rdbSciFi = document.getElementById('rdbSciFi');
    let rdbDrama = document.getElementById('rdbDrama');
    let rdbNonFictie = document.getElementById('rdbNonFictie');
    let slcLeesdoel = document.getElementById('slcLeesdoel');

    if (global.added === 1) {
        let resultPDel = document.getElementById('resultP');
        resultPDel.remove();
    }

    let resultP = document.createElement('p');
    resultP.setAttribute('id', 'resultP');

    resultP.textContent = "Voornaam: " + txtVoornaam.value;
    let br1 = document.createElement('br');
    resultP.appendChild(br1);
    resultP.append("Familienaam: " + txtFamilienaam.value);
    let br2 = document.createElement('br');
    resultP.appendChild(br2);
    resultP.append("Favoriete boek")
    let br3 = document.createElement('br');
    resultP.appendChild(br3);
    resultP.append("Titel: " + txtTitel.value);
    let br4 = document.createElement('br');
    resultP.appendChild(br4);
    resultP.append("Auteur: " + txtAuteur.value);
    let br5 = document.createElement('br');
    resultP.appendChild(br5);

    let radiobuttons = "Favoriete genres: ";
    if(rdbFantasy.checked) {
        radiobuttons += rdbFantasy.value + " ";
    }

    if(rdbSciFi.checked) {
        radiobuttons += rdbSciFi.value + " ";
    }

    if(rdbDrama.checked) {
        radiobuttons += rdbDrama.value + " ";
    }

    radiobuttons = radiobuttons.trim();

    resultP.append(radiobuttons);
    let br6 = document.createElement('br');
    resultP.appendChild(br6);
    resultP.append("Leesdoel: " + slcLeesdoel.value + " boeken");


    let main = document.querySelector('main');
    main.appendChild(resultP);

    global.added = 1;
}

window.addEventListener("load", setup);