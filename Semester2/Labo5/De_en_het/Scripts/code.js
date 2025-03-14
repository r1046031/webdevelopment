const setup = () => {
    const tekst = "Gisteren zat de jongen op de stoep en at de helft van de appel";
    console.log("Origineel:");
    console.log(tekst);
    console.log("De vervangen:");
    deVervangen(tekst);
}

const deVervangen = (tekst) => {
    let i = 0;
    let nieuweTekst = "";

    for(i=0;i<tekst.length;i++) {
        if(tekst[i].toLowerCase() === "d" && tekst[i + 1] === "e") {
            if(tekst[i] === "D") {
                nieuweTekst += "Het ";
            }
            else if(i === (tekst.length - 2)) {
                nieuweTekst += "het";
            }
            else {
                nieuweTekst += "het ";
            }
            i += 2;
        }
        else {
            nieuweTekst += tekst[i];
        }

        nieuweTekst.trim();
    }

    console.log(nieuweTekst);
}

window.addEventListener("load", setup);