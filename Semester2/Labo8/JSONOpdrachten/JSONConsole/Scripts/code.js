let student1={
    voornaam : "Ilona",
    familienaam : "Defevere",
    geboorteDatum : new Date("2006-09-16"),
    adres : { // een object
        straat : "Doorniksesteenweg 145",
        postcode : "8500",
        gemeente : "Kortrijk"
    },
    isIngeschreven : true,
    aantalAutos : 0
}

const setup = () => {
    let student1JSON = JSON.stringify(student1);
    console.log(student1JSON);
}

window.addEventListener("load", setup);