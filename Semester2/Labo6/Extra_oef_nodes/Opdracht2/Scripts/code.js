const setup = (event) => {
    event.preventDefault();

    let li = document.querySelectorAll('li');
    let i = 0;

    for(i = 0; i < li.length; i++) {
        li[i].setAttribute('class', 'listitem');
    }

    let newStyle = document.createElement("style");
    newStyle.innerHTML =
    `.listitem {
    color: red
    }`;
    document.body.appendChild(newStyle);

    let newImg = document.createElement('img');
    newImg.setAttribute('src', "../Img/you.png");
    newImg.setAttribute('alt', "img");
    document.body.appendChild(newImg);
}

window.addEventListener("load", setup);