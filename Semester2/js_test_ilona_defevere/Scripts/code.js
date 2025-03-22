const setup = () => {
    let slcEi = document.getElementById('slcEi');
    let txtLetter = document.getElementById('txtLetter');

    slcEi.addEventListener('change', afbeeldingKip);
    txtLetter.addEventListener('enter', letter);
}

const afbeeldingKip = () => {
    let img = document.getElementById('img');
    let slcEi = document.getElementById('sclEi');

    if(slcEi.options.selected.value === 'metEi') {
        img.className = 'with-egg';
    } else {
        img.className = '';
    }
}

const letter = () => {
    let txtLetter = document.getElementById('txtLetter');
    let note = document.getElementById('note');
    let slcEi = document.getElementById('slcEi');
    let counter = 0;
    let i = 0;

    note.textContent = "Hierboven, een " + slcEi.options.value;

    for(i=0;i<slcEi.options.selected.length;i++) {
        if(slcEi.options.value[i] === txtLetter.value) {
            counter++;
        }
    }

    note.textContent += "\nLetter \"e\" komt " + counter + " keer voor in bovenstaande zin.";
}

window.addEventListener("load", setup);