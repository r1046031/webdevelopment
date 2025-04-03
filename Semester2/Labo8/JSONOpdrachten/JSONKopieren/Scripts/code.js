const setup = () => {
    let student1 = JSON.parse("{\"voornaam\":\"Ilona\",\"familienaam\":\"Defevere\",\"geboorteDatum\"" +
        ":\"2006-09-16T00:00:00.000Z\",\"adres\":{\"straat\":\"Doorniksesteenweg 145\",\"postcode\":\"8500\",\"gemeente\":\"Kortrijk\"}" +
        ",\"isIngeschreven\":true,\"aantalAutos\":0}");
    console.log(student1.voornaam);
}

window.addEventListener("load", setup);