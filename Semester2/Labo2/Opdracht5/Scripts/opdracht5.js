const setup = () => {
    let btnWijzig = document.getElementById("btnWijzig");
    btnWijzig.addEventListener("click", wijzigen);
};

const wijzigen = () => {
    let pElement=document.getElementById("txtOutput");
    if(pElement.innerHTML === "Hello world!") {
        pElement.innerHTML="Welkom!";
    } else {
        pElement.innerHTML="Hello world!";
    }
};

window.addEventListener("load", setup);