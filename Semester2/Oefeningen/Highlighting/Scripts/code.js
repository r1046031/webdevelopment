let items = [];
let pTagAanwezig = false;

const setup = () => {
    let btnToevoegen = document.getElementById('btnToevoegen');
    let btnHighlighten = document.getElementById('btnHighlighten');

    btnToevoegen.addEventListener('click', toevoegen);
    btnHighlighten.addEventListener('click', highlighten)
}

const toevoegen = () => {
    let txtToevoegen = document.getElementById('txtToevoegen');

    if(pTagAanwezig === false) {
        let resultaatP = document.createElement('p');
        resultaatP.setAttribute('id', 'resultaatP');
        resultaatP.textContent = txtToevoegen.value;

        let main = document.querySelector('main');
        main.appendChild(resultaatP);

        pTagAanwezig = true;
    } else {
        let resultaatP = document.getElementById('resultaatP');
        let br = document.createElement('br');
        resultaatP.appendChild(br);
        resultaatP.append(txtToevoegen.value);
    }

    items.push(txtToevoegen.value);
}

const highlighten = () => {
    let txtHighlight = document.getElementById('txtHighlight');

    for(let i = 0;i<items.length;i++) {
        let i2 = 0;
        while(i2 < items[i].length) {
            if (items[i].substring(i2, i2 + txtHighlight.value.length) === txtHighlight.value) {

            }
        }
    }
}

const refreshItems = () => {
    
}

window.addEventListener("load", setup);