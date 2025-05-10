global = {
    puzzelplaatjes: [],
    aantalKeerVerlegd: 0
}

const setup = () => {
    //localstorage ophalen, indien nog geen nieuwe puzzel aanmaken
    let puzzelLocalStorage = JSON.parse(localStorage.getItem('puzzelplaatjesWaarden'));
    if(puzzelLocalStorage) {
        global.puzzelplaatjes = puzzelLocalStorage;
        refreshPuzzle();
    } else {
        make8Puzzle();
    }

    //refreshButton eventhandler
    let refreshButton = document.getElementById("refreshButton");
    refreshButton.addEventListener("click", deletePuzzle);
}

const make8Puzzle = () => {
    let stukjesTeLeggen = 9;
    let i = 0;

    while(i < stukjesTeLeggen) {
        let random = Math.floor(1 + Math.random() * stukjesTeLeggen);
        let inArray = false;
        let i2 = 0;

        while(inArray === false && i2 < global.puzzelplaatjes.length) {
            if(global.puzzelplaatjes[i2] === random) {
                inArray = true;
            }
            i2++;
        }

        if(inArray === false) {
            global.puzzelplaatjes[i] = random;
            i++;
        }
    }

    localStorage.setItem("puzzelplaatjesWaarden", JSON.stringify(global.puzzelplaatjes));

    refreshPuzzle();
}

const refreshPuzzle = () => {
    for(let i = 0;i<global.puzzelplaatjes.length;i++) {
        tileAanmaken(global.puzzelplaatjes[i]);
    }
}

const deletePuzzle = () => {
    let puzzleTiles = document.getElementsByClassName("puzzleTile");
    while(puzzleTiles.length > 0) {
        puzzleTiles[0].remove();
    }

    global.puzzelplaatjes = [];
    make8Puzzle();
}

const tileAanmaken = (id) => {
    let puzzleBorder = document.getElementById('puzzleBorder');

    let newDiv = document.createElement('div');
    newDiv.className = 'puzzleTile';
    newDiv.addEventListener('click', () => verlegPlaatje(newDiv))

    let divP = document.createElement('p');

    if(id === 9) {
        divP.textContent = "";
        newDiv.setAttribute('id', "puzzleTileLeeg");
    } else {
        divP.textContent = id;
        newDiv.setAttribute('id', ("puzzleTile" + id));
    }

    newDiv.appendChild(divP);
    puzzleBorder.appendChild(newDiv);
}

//TODO
const verlegPlaatje = (event) => {
    let idTile = event.getAttribute('id');
    let index = idTile.substring(idTile.length - 1, idTile.length);
    index = parseInt(index);

    isSwappable(index);
}

const isSwappable = (index) => {

}

//TODO
const finished = () => {

}

window.addEventListener("load", setup);