global = {
    items: []
}

const setup = () => {
    let btnToevoegen = document.getElementById('btnToevoegen');
    let btnHighlighten = document.getElementById('btnHighlighten');

    btnToevoegen.addEventListener('click', toevoegen);
    btnHighlighten.addEventListener('click', highlighten)
}

const toevoegen = () => {
    let txtToevoegen = document.getElementById('txtToevoegen');

    if(txtToevoegen.value !== "") {
        global.items.push(txtToevoegen.value);
    }

    refreshItems();
}

const highlighten = () => {
    let txtHighlight = document.getElementById('txtHighlight');

    for(let i = 0;i<global.items.length;i++) {
        let i2 = 0;
        while(i2 < global.items[i].length) {
            if (global.items[i].substring(i2, i2 + txtHighlight.value.length) === txtHighlight.value) {

            }
        }
    }
}

const refreshItems = () => {
    let resultaat = "";

    for(let i=0;i<global.items.length;i++) {
        if(i !== global.items[i].length - 1) {
            resultaat += global.items[i] + "newline";
        } else {
            resultaat += global.items[i];
        }
    }

    console.log(resultaat);

    let resultaatP = document.getElementById('resultaatP');
    if(resultaatP === null) {
        resultaatP = document.createElement('p');
        resultaatP.setAttribute('id', 'resultaatP');

        let main = document.getElementsByTagName('main');
        main[0].appendChild(resultaatP);
    }

    //resultaat
    //alles waar er span staat moet er een span tag komen
    //alles waar er newline staat moet er newline komen
    if(resultaat.includes("newline") === true) {
        let allFound = false;
        let searchstring = resultaat;
        let newResultaat = "";
        let i = 0;

        do {
            console.log("ss " + searchstring);

            //newresultaat werkt
            newResultaat += searchstring.substring(0, searchstring.indexOf("newline"));

            //hier nu nog br tags toevoegen
            //per keer hierboven een br tag toevoegen en daaraan dan newResultaat appenden aan de p tag
            //wel nog kijken voor dat bij begin geen br tag wordt toegevoegd

            console.log("nr " + newResultaat);

            if(searchstring.includes("newline") === false || searchstring.indexOf("newline") + 7 === searchstring.length) {
                allFound = true;
            } else {
                searchstring = searchstring.substring(searchstring.indexOf("newline") + 7, resultaat.length);
            }

            console.log("ss " + searchstring);

            i++;
        } while(allFound === false || i === resultaat.length - 1)
    }

    /*
    if(resultaat.includes("span") === true) {

    }
     */


}

window.addEventListener("load", setup);