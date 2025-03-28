let global = {
    IMAGE_COUNT: 5, // aantal figuren
    IMAGE_SIZE: 48, // grootte van de figuur
    IMAGE_PATH_PREFIX: "images/", // map van de figuren
    IMAGE_PATH_SUFFIX: ".png", // extensie van de figuren
    MOVE_DELAY: 3000, // aantal milliseconden voor een nieuwe afbeelding verschijnt
    score: 0, // aantal hits
    huidige_img: 0,
    timeoutId: 0, // id van de timeout timer, zodat we die kunnen annuleren
    defaultImageLeft: 5,
    defaultImageTop: 80
};

const setup = () => {
    let btnStart = document.getElementById('btnStart');
    btnStart.addEventListener('click', game);
};

const game = () => {
    let btnStart = document.getElementById('btnStart');
    btnStart.className = "hidden";

    let img = document.querySelector('img');
    img.addEventListener("click", clicked);
    global.timeoutId = setInterval(verplaatsen, global.MOVE_DELAY);
}

const clicked = () => {
    let img = document.querySelector('img');
    let hits = document.getElementById('hits');
    let btnStart = document.getElementById('btnStart');

    if(img.alt === "0") {
        alert("GAME OVER");

        clearTimeout(global.timeoutId);
        btnStart.className = '';

        hits.textContent = "Aantal hits: 0";
        global.score = 0;

        img.style.left=global.defaultImageLeft + "px";
        img.style.top=global.defaultImageTop + "px";
    } else {
        global.huidige_img = parseInt(img.alt);

        global.score++;
        hits.textContent = "Aantal hits: " + global.score;

        verplaatsen();

        clearTimeout(global.timeoutId);
        global.timeoutId = setInterval(verplaatsen, global.MOVE_DELAY);
    }
}

const verplaatsen = () => {
    let img = document.querySelector('img');
    let playField = document.getElementById('playField');

    let maxLeft=playField.clientWidth - img.offsetWidth;
    let maxHeight=playField.clientHeight - img.offsetHeight;

    let left=Math.floor(Math.random()*maxLeft);
    let top=Math.floor(Math.random()*maxHeight);
    img.style.left=left+"px";
    img.style.top=top+"px";

    let randGenerated = false;
    let randImg = 0;
    while(randGenerated === false) {
        randImg = Math.floor(Math.random() * 4);
        if (randImg !== global.huidige_img) {
            randGenerated = true;
        }
    }

    img.setAttribute('src',(global.IMAGE_PATH_PREFIX + randImg + global.IMAGE_PATH_SUFFIX));
    img.setAttribute('alt', randImg.toString());
}

window.addEventListener("load", setup);