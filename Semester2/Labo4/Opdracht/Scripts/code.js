const setup = () => {
    let leeftijd = 34;
    let interest = 0.12;
    let isGevaarlijk = true;
    let vandaag = new Date();
    const print = (message) => {
      console.log(message);
    };

    console.log(typeof leeftijd);
    console.log(typeof interest);
    console.log(typeof isGevaarlijk);
    console.log(typeof vandaag);
};

window.addEventListener("load", setup);