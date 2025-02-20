const setup = () => {
	let colorDemos=document.getElementsByClassName("colorDemo");
	let sliders = document.getElementsByClassName("slider");
	let spans = document.getElementsByTagName("span");

	// we moeten zowel op het input als het change event reageren,
	// zie http://stackoverflow.com/questions/18544890
	for (let i = 0; i < sliders.length; i++) {
		sliders[i].addEventListener("change", update);
		sliders[i].addEventListener("input", update);
	}

	sliders[0].value = 128;
	sliders[1].value = 255;
	sliders[2].value = 128;

	update();
}

const update = () => {
	let sliders = document.getElementsByClassName("slider");
	let colorDemos=document.getElementsByClassName("colorDemo");
	let spans = document.getElementsByTagName("span");

	let valueR=sliders[0].value;
	let valueG=sliders[1].value;
	let valueB=sliders[2].value

	spans[0].innerHTML = "Red: " + valueR;
	spans[1].innerHTML = "Green: " + valueG;
	spans[2].innerHTML = "Blue: " + valueB;

	colorDemos[0].style.backgroundColor = `rgb(${valueR}, ${valueG}, ${valueB})`;
}

// dit is de eerste regel code die uitgevoerd wordt,
// de bovenstaande functie declaraties introduceren
// enkel de functies en voeren ze niet uit natuurlijk.
// Onderstaande zorgt ervoor dat de setup functie wordt
// uitgevoerd zodra de DOM-tree klaar is.
window.addEventListener("load", setup);