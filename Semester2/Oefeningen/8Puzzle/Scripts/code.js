global = {
    puzzelplaatjes: [],
    aantalKliks: 0
}

const setup = () => {
    //localstorage ophalen, indien nog geen nieuwe puzzel aanmaken
    let puzzelLocalStorage = JSON.parse(localStorage.getItem('puzzelplaatjesWaarden'));
    if(puzzelLocalStorage) {
        global.puzzelplaatjes = puzzelLocalStorage;

        if(isFinished() === true) {
            deletePuzzle(true);
        } else {
            refreshPuzzle();
        }
    } else {
        make8Puzzle();
    }

    let aantalKliks = JSON.parse(localStorage.getItem('aantalKliks'));
    if(aantalKliks) {
        global.aantalKliks = parseInt(aantalKliks);
    }

    //refreshButton eventhandler
    let refreshButton = document.getElementById("refreshButton");
    refreshButton.addEventListener('click', () => deletePuzzle(true));
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
    makeTilesClickable();

    for(let i = 0;i<global.puzzelplaatjes.length;i++) {
        tileAanmaken(i, global.puzzelplaatjes[i]);
    }
}

const deletePuzzle = (nieuwePuzzelAanmaken) => {
    let finishedP = document.getElementById('finishedP');
    if(finishedP !== null) {
        finishedP.remove();
    }

    let puzzleTiles = document.getElementsByClassName("puzzleTile");
    while(puzzleTiles.length > 0) {
        puzzleTiles[0].remove();
    }

    if(nieuwePuzzelAanmaken) {
        global.puzzelplaatjes = [];
        global.aantalKliks = 0;
        localStorage.setItem("aantalKliks", global.aantalKliks);
        make8Puzzle();
    }
}

const tileAanmaken = (id, waarde) => {
    let puzzleBorder = document.getElementById('puzzleBorder');

    let newDiv = document.createElement('div');
    newDiv.className = 'puzzleTile';
    newDiv.setAttribute('id', ("puzzleTile" + id));
    newDiv.addEventListener('click', () => verlegPlaatje(newDiv))

    let divP = document.createElement('p');

    if(waarde === 9) {
        divP.textContent = "";
    } else {
        divP.textContent = waarde;
    }

    newDiv.appendChild(divP);
    puzzleBorder.appendChild(newDiv);
}

const verlegPlaatje = (event) => {
    let idTile = event.getAttribute('id');
    let index = idTile.substring(idTile.length - 1, idTile.length);
    index = parseInt(index);

    let emptyIndex = global.puzzelplaatjes.indexOf(9);

    if(isSwappable(index, emptyIndex) === true) {
        let valueIndex = global.puzzelplaatjes[index];

        global.puzzelplaatjes[index] = global.puzzelplaatjes[emptyIndex];
        global.puzzelplaatjes[emptyIndex] = valueIndex;

        global.aantalKliks += 1;
        localStorage.setItem("aantalKliks", global.aantalKliks);

        localStorage.setItem("puzzelplaatjesWaarden", JSON.stringify(global.puzzelplaatjes));

        deletePuzzle(false);
        refreshPuzzle();

        if(isFinished() === true) {
            finished();
        }
    }
}

const isSwappable = (index, emptyIndex) => {
    let swappable = false;

    if(index !== emptyIndex) {
        let vakjeLinksCheck = true;
        let vakjeRechtsCheck = true;
        let vakjeBovenCheck = true;
        let vakjeOnderCheck = true;

        //er is dus een array van lengte 9
        //[3,6,7,
        // 8,4,5,
        // 1,9,2]
        //degene helemaal rechts hebben geen rechtse vakje
        //degene helemaal links hebben geen linkse vakje
        //degene bovenaan hebben geen bovenstje vakje
        //degene onderaan hebben geen onderste vakje
        //het midden heeft links, rechts, onder en boven als vakjes

        //is er een vakje rechts?
        if((index + 1) % 3 === 0) {
            vakjeRechtsCheck = false;
        }

        //is er een vakje links?
        if(index === 0 || index === 3 || index === 6) {
            vakjeLinksCheck = false;
        }

        //is er een vakje boven?
        if(index < 3) {
            vakjeBovenCheck = false;
        }

        //is er een vakje beneden?
        if(index > 5 && index < 9) {
            vakjeOnderCheck = false;
        }

        //checken, afhankelijk van de positie, of swappableIndex dichtbij is
        if(vakjeRechtsCheck === true) {
            if((index + 1) === emptyIndex) {
                swappable = true;
            }
        }

        if(vakjeLinksCheck === true) {
            if((index - 1) === emptyIndex) {
                swappable = true;
            }
        }

        if(vakjeBovenCheck === true) {
            if((index - 3) === emptyIndex) {
                swappable = true;
            }
        }

        if(vakjeOnderCheck === true) {
            if((index + 3) === emptyIndex) {
                swappable = true;
            }
        }
    }

    return swappable;
}

const isFinished = () => {
    let finished = true;
    let i = 1;

    while(finished === true && i <= global.puzzelplaatjes.length) {
        if(global.puzzelplaatjes[(i - 1)] !== i) {
            finished = false;
        }

        i++;
    }

    return finished;
}

const finished = () => {
    makeTilesUnclickable();

    let finishedP = document.createElement('p');
    finishedP.setAttribute('id', 'finishedP');
    finishedP.textContent = "You've done it! Het heeft enkel maar ";
    let span = document.createElement('span');
    span.textContent = global.aantalKliks;
    finishedP.appendChild(span);
    finishedP.append(" kliks genomen!");

    let puzzleSection = document.getElementById('puzzleSection');
    puzzleSection.appendChild(finishedP);
}

const makeTilesUnclickable = () => {
    document.getElementById('puzzleBorder').classList.add('locked');
}

const makeTilesClickable = () => {
    document.getElementById('puzzleBorder').classList.remove('locked');
}

window.addEventListener("load", setup);