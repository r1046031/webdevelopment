global = {
	savedDemos: []
}

const setup = () => {
	let sliders = document.getElementsByClassName("slider");
	let btnSave = document.getElementById("btnSave");
	btnSave.addEventListener("click", saveDemo);

	//eventlisteners toevoegen aan sliders
	for (let i = 0; i < sliders.length; i++) {
		sliders[i].addEventListener("change", updateDemoVak);
		sliders[i].addEventListener("input", updateDemoVak);
	}

	let stringArray = localStorage.getItem("savedColorDemosArray");
	if(stringArray) {
		global.savedDemos = JSON.parse(stringArray);
		refreshSavedDemos();
	}

	//al eens update doen voor de defaultwaarden
	updateDemoVak();
}

const updateDemoVak = () => {
	let sliders = document.getElementsByClassName("slider");
	let colorDemoMainVak=document.getElementsByClassName("colorDemoVak")[0];
	let spans = document.getElementsByTagName("span");

	let valueR=sliders[0].value;
	let valueG=sliders[1].value;
	let valueB=sliders[2].value;

	spans[0].innerHTML = "Red: " + valueR;
	spans[1].innerHTML = "Green: " + valueG;
	spans[2].innerHTML = "Blue: " + valueB;

	colorDemoMainVak.style.backgroundColor = `rgb(${valueR}, ${valueG}, ${valueB})`;
}

const saveDemo = () => {
	let sliders = document.getElementsByClassName("slider");

	let valueR=sliders[0].value;
	let valueG=sliders[1].value;
	let valueB=sliders[2].value;

	let rgbValues = {
		R: valueR,
		G: valueG,
		B: valueB
	}

	if(isDemoAlGesaved(rgbValues) === false) {
		global.savedDemos.push(rgbValues);
		updateSavedDemos(rgbValues);
		localStorage.setItem("savedColorDemosArray", JSON.stringify(global.savedDemos));
	}
}

const isDemoAlGesaved = (nieuweDemoValues) => {
	let found = false;
	let i = 0;

	while(found === false && i < global.savedDemos.length) {
		if(nieuweDemoValues.R === global.savedDemos[i].R && nieuweDemoValues.G === global.savedDemos[i].G && nieuweDemoValues.B === global.savedDemos[i].B) {
			found = true;
		}

		i++;
	}

	return found;
}

const updateSavedDemos = (nieuweDemoValues) => {
	let savedDemos = document.getElementsByClassName("savedDemos")[0];

	let colorDemoNieuwVak = document.createElement('div');
	colorDemoNieuwVak.setAttribute('class', 'colorDemoVak');
	colorDemoNieuwVak.style.backgroundColor = `rgb(${nieuweDemoValues.R}, ${nieuweDemoValues.G}, ${nieuweDemoValues.B})`;

	let btnColorDemoDelete = document.createElement('button');
	btnColorDemoDelete.setAttribute('class', 'btnColorDemoDelete');
	btnColorDemoDelete.textContent = 'X';
	btnColorDemoDelete.addEventListener('click', () => deleteSavedDemo(btnColorDemoDelete));

	colorDemoNieuwVak.appendChild(btnColorDemoDelete);
	savedDemos.appendChild(colorDemoNieuwVak);
}

const refreshSavedDemos = () => {
	for(let i = 0; i < global.savedDemos.length; i++) {
		updateSavedDemos(global.savedDemos[i]);
	}
}

const deleteSavedDemo = (event) => {
	console.log(global.savedDemos);

	let rgbValues = getRgbValueVanString(getComputedStyle(event.parentElement).backgroundColor);

	let found = false;
	let i = 0;

	while(found === false && i < global.savedDemos.length) {
		if(global.savedDemos[i].R === rgbValues.R && global.savedDemos[i].G === rgbValues.G && global.savedDemos[i].B === rgbValues.B) {
			found = true;
		}

		i++;
	}

	global.savedDemos = removeValueVanArray(global.savedDemos, (i - 1));
	localStorage.setItem("savedColorDemosArray", JSON.stringify(global.savedDemos));

	event.parentElement.remove();
}

const getRgbValueVanString = (string) => {
	let restString = string;

	let valueR = restString.substring(restString.indexOf("(") + 1, restString.indexOf(","));
	restString = restString.substring(restString.indexOf(",") + 2, restString.length);
	let valueG = restString.substring(0, restString.indexOf(","));
	restString = restString.substring(restString.indexOf(",") + 2, restString.length);
	let valueB = restString.substring(0, restString.indexOf(")"));

	let rgbValues = {
		R: valueR,
		G: valueG,
		B: valueB
	}

	return rgbValues;
}

const removeValueVanArray = (array, indexTeVerwijderen) => {
	let i = indexTeVerwijderen;

	while(i < array.length - 1) {
		array[i] = array[i + 1];

		i++;
	}

	array.pop();

	return array;
}

window.addEventListener("load", setup);