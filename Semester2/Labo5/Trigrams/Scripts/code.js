const setup = () => {
    const woord = "onoorbaar";
    trigrams(woord);
}

const trigrams = (woord) => {
    let i = 0;

    for(i=0;i<=woord.length - 3;i++) {
        console.log(woord[i] + woord[i + 1] + woord[i + 2]);
    }
}

window.addEventListener("load", setup);