const setup = () => {
    let btnSubmit = document.getElementById("submit");
    let txtTekst = document.getElementById("text");
    btnSubmit.addEventListener("click", () => maakMetSpaties(txtTekst.value));
};

const maakMetSpaties = (inputText) => {
    let resultaat = "";

    for(let i=0; i < inputText.length; i++) {
        resultaat += inputText[i] + " ";
    }

    console.log(resultaat);
};

window.addEventListener("load", setup);