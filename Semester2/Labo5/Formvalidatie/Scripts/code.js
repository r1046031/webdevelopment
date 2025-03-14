const setup = () => {
    let btnValideer = document.getElementById("btnValideer");
    btnValideer.addEventListener("click", valideer)
}

const valideer = (event) => {
    event.preventDefault();
    let txtVoornaam = document.getElementById("txtVoornaam");
    let txtFamilienaam = document.getElementById("txtFamilienaam");
    let txtGeboortedatum = document.getElementById("txtGeboortedatum");
    let txtEmail = document.getElementById("txtEmail");
    let txtKinderen = document.getElementById("txtKinderen");

    let errVoornaam = document.getElementById("errVoornaam");
    let errFamilienaam = document.getElementById("errFamilienaam");
    let errGeboortedatum = document.getElementById("errGeboortedatum");
    let errEmail = document.getElementById("errEmail");
    let errKinderen = document.getElementById("errKinderen");

    let voornaamOk = true;
    let familieNaamOk = true;
    let geboorteDatumOk = true;
    let emailOk = true;
    let kinderenOk = true;

    //txtVoornaam controleren
    if(txtVoornaam.value === "") {
        txtVoornaam.className = "invalid";
        errVoornaam.innerText = "verplicht veld";
        voornaamOk = false;
    }
    else if(txtVoornaam.value.length >= 30) {
        txtVoornaam.className = "invalid";
        errVoornaam.innerText = "max. 30 karakters";
        voornaamOk = false;
    }

    //txtFamilienaam controleren
    if(txtFamilienaam.value === "") {
        txtFamilienaam.className = "invalid";
        errFamilienaam.innerText = "verplicht veld";
        familieNaamOk = false;
    }
    else if(txtFamilienaam.value.length >= 50) {
        txtFamilienaam.className = "invalid";
        errFamilienaam.innerText = "max. 50 karakters";
        familieNaamOk = false;
    }

    //txtGeboortedatum controleren
    txtGeboortedatum.value = txtGeboortedatum.value.trim();

    if(txtGeboortedatum.value === "") {
        txtGeboortedatum.className = "invalid";
        errGeboortedatum.innerText = "verplicht veld";
        geboorteDatumOk = false;
    }
    else if(txtGeboortedatum.value.length !== 10
        || !txtGeboortedatum.value.includes("-")
        || !(txtGeboortedatum.value.substring(txtGeboortedatum.value.indexOf("-"), txtGeboortedatum.value.length - 1)).includes("-")
        || isNaN(parseInt(txtGeboortedatum.value.substring(0,4)))
        || isNaN(parseInt(txtGeboortedatum.value.substring(5,7)))
        || isNaN(parseInt(txtGeboortedatum.value.substring(8,10)))) {
        txtGeboortedatum.className = "invalid";
        errGeboortedatum.innerText = "formaat is niet jjjj-mm-dd";
        geboorteDatumOk = false;
    }

    //txtEmail controleren
    let regex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if(txtEmail.value === "") {
        txtEmail.className = "invalid";
        errEmail.innerText = "verplicht veld";
        geboorteDatumOk = false;
    }
    else if(!regex.test(txtEmail.value)) {
        txtEmail.className = "invalid";
        errEmail.innerText = "geen geldig e-mail adres";
        emailOk = false;
    }

    //txtKinderen controleren
    if(isNaN(txtKinderen.value)) {
        txtKinderen.className = "invalid";
        errKinderen.innerText = "is geen getal";
        kinderenOk = false;
    }
    else if(parseInt(txtKinderen.value) < 0) {
        txtKinderen.className = "invalid";
        errKinderen.innerText = "is geen positief getal";
        kinderenOk = false;
    }
    else if(parseInt(txtKinderen.value) >= 99) {
        txtKinderen.className = "invalid";
        errKinderen.innerText = "is te vruchtbaar";
        kinderenOk = false;
    }

    if(voornaamOk === true && familieNaamOk === true && geboorteDatumOk === true && emailOk === true && kinderenOk === true) {
        window.confirm("Proficiat!");
    }
}

window.addEventListener("load", setup);