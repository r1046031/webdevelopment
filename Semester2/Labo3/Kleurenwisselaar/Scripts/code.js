const setup = () => {
    let buttons = document.getElementsByClassName('button');
    buttons[0].addEventListener('click', function() { kleurverandering('red', buttons[0])});
    buttons[1].addEventListener('click', function() { kleurverandering('blue', buttons[1])});
    buttons[2].addEventListener('click', function() { kleurverandering('green', buttons[2])});
};

const kleurverandering = (kleur, button) => {
    if(button.style.backgroundColor === kleur) {
        button.style.backgroundColor = '';
        button.style.color = 'black';
    }
    else {
        button.style.backgroundColor = kleur;
        button.style.color = 'white';
    }
};

window.addEventListener("load", setup);