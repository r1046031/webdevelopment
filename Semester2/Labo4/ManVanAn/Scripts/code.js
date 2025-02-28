const setup = () => {
    let zin = "De man van An";
    let counter = 0;
    let startindex = 0;

    //met indexof
    do {
        startindex = zin.indexOf("An", startindex);
        //als indexof niet lukt krijg je -1 terug
        if (startindex !== -1) {
            counter++;
            //nieuwe startpositie is na 'an', daarvan + 2
            startindex += 2;
        }
    } while (startindex !== -1);

    console.log("met indexOf:", counter);

    //met lastindexof

    //resetten
    counter = 0;
    startindex = zin.length;

    do {
        startindex = zin.lastIndexOf("An", startindex - 1);
        if (startindex !== -1) {
            counter++;
        }
    } while (startindex !== -1);

    console.log("met lastIndexOf:", counter);
};

window.addEventListener("load", setup);