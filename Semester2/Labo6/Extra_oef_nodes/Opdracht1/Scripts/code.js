const setup = () => {
    let paragraph = document.querySelectorAll('p');
    paragraph[0].firstChild.nodeValue = "Good job!";
}

window.addEventListener("load", setup);