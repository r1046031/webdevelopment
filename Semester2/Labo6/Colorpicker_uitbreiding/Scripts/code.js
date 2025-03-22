let savedAmount = 0;

const setup = () => {
	let sliders = document.getElementsByClassName("slider");
	let btnSave = document.getElementById("btnSave");
	btnSave.addEventListener("click", save);

	for (let i = 0; i < sliders.length; i++) {
		sliders[i].addEventListener("change", update);
		sliders[i].addEventListener("input", update);
	}

	sliders[0].value = 128;
	sliders[1].value = 255;
	sliders[2].value = 128;

	update();

	document.addEventListener("click", (event) => {
		if (event.target.classList.contains("btnColorDemoDelete")) {
			deleteSavedDemo(event);
		}
	});
}


const update = () => {
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

const save = () => {
	if(savedAmount < 13) {
		let savedDemos = document.getElementsByClassName("savedDemos")[0];
		let colorDemoMainVak=document.getElementsByClassName("colorDemoVak")[0];
		let sliders = document.getElementsByClassName("slider");

		let valueR=sliders[0].value;
		let valueG=sliders[1].value;
		let valueB=sliders[2].value;

		let colorDemoNieuwVak = document.createElement('div');
		colorDemoNieuwVak.setAttribute('class', 'colorDemoVak');
		colorDemoNieuwVak.style.backgroundColor = `rgb(${valueR}, ${valueG}, ${valueB})`;

		let btnColorDemoDelete = document.createElement('button');
		btnColorDemoDelete.setAttribute('class', 'btnColorDemoDelete');
		btnColorDemoDelete.textContent = 'X';

		colorDemoNieuwVak.appendChild(btnColorDemoDelete);
		savedDemos.appendChild(colorDemoNieuwVak);
		return savedAmount++;
	}
}

const deleteSavedDemo = (event) => {
	event.target.parentElement.remove();

	savedAmount--;
}

window.addEventListener("load", setup);