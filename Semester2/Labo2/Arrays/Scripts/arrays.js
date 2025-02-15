const setup = () => {
    const voegNaamToe = () => {
        familieleden.push(prompt("Voeg een naam in."));
    };

    let familieleden = ["mama", "papa", "opa", "oma", "zus"];
    console.log(familieleden.length);
    console.log(familieleden[0]);
    console.log(familieleden[2]);
    console.log(familieleden[4]);
    voegNaamToe();
    console.log("index 5: " + familieleden[5]);
    console.log(familieleden.toString());
};

window.addEventListener("load", setup);