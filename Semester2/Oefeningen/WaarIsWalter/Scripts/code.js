const setup = () => {
    //TODO
    //onderstaande code weg en reset functie toevoegen
    veldVullen();
}

const reset = () => {
    //TODO
    //reset functie aanvullen
}

const veldVullen = () => {
    //TODO
    //de random werkt nog niet
    let random = Math.random() * 8;

    for(let i = 0; i < 8; i++) {
        if(i === random) {
            imagesAanmaken("imgWalter", 'Images/walter_background.png');
        } else {
            imagesAanmaken(("img" + i), 'Images/walter_background.png');
        }
    }
}

const imagesAanmaken = (id, src) => {
    let section = document.querySelector('section');

    let newImg = document.createElement("img");
    newImg.setAttribute('id', id);
    newImg.setAttribute('src', src);
    newImg.addEventListener('click', () => isImageWalter(newImg))

    section.appendChild(newImg);
}

const isImageWalter = (event) => {
    console.log("click");

    if(event.id === "imgWalter") {
        event.src = 'Images/walter.jpg';
    } else {
        //TODO
        //dit deel werkt ook nog niet
        if(event.src === "Images/fout.png") {
            event.src = 'Images/walter_background.png';
        } else {
            event.src = 'Images/fout.png';
        }
    }
}

window.addEventListener("load", setup);