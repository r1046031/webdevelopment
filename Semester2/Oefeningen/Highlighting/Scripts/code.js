const global = {
    items: []
};

const setup = () => {
    let btnToevoegen = document.getElementById('btnToevoegen');
    let btnHighlighten = document.getElementById('btnHighlighten');

    btnToevoegen.addEventListener('click', toevoegen);
    btnHighlighten.addEventListener('click', highlighten);
};

const toevoegen = () => {
    const txtToevoegen = document.getElementById('txtToevoegen');

    if (txtToevoegen.value.trim() !== "") {
        global.items.push(txtToevoegen.value);
        txtToevoegen.value = "";
        refreshItems();
    }
};

const highlighten = () => {
    const txtHighlight = document.getElementById('txtHighlight');
    const value = txtHighlight.value.trim();

    if (value !== "") {
        refreshItems(value);
    }
};

const refreshItems = (highlightValue = "") => {
    // Remove existing result if present
    let oldP = document.getElementById('resultaatP');
    if (oldP) oldP.remove();

    const resultaatP = document.createElement('p');
    resultaatP.id = 'resultaatP';

    global.items.forEach((item, index) => {
        if (index > 0) {
            resultaatP.appendChild(document.createElement('br'));
        }

        if (highlightValue && item.includes(highlightValue)) {
            // Highlight all occurrences
            let remaining = item;
            while (remaining.length > 0) {
                const index = remaining.indexOf(highlightValue);

                if (index === -1) {
                    resultaatP.appendChild(document.createTextNode(remaining));
                    break;
                }

                // Add text before match
                if (index > 0) {
                    resultaatP.appendChild(document.createTextNode(remaining.slice(0, index)));
                }

                // Add highlighted span
                const span = document.createElement('span');
                span.textContent = highlightValue;
                span.style.backgroundColor = 'yellow';
                resultaatP.appendChild(span);

                // Cut processed part
                remaining = remaining.slice(index + highlightValue.length);
            }
        } else {
            resultaatP.appendChild(document.createTextNode(item));
        }
    });

    document.querySelector('main').appendChild(resultaatP);
};

window.addEventListener("load", setup);
