const setup = () => {
    const btnSubstring = document.getElementById('btnSubstring');
    btnSubstring.addEventListener('click', substring);
};

const substring = () => {
  const txtInput = document.getElementById('txtInput');
  const output = document.getElementById('output');
  const txtBeginIndex = document.getElementById('txtBeginIndex');
  const txtEindIndex = document.getElementById('txtEindIndex');

  let resultaat;

  if(txtInput.value === '') {
      window.confirm("Je hebt nog niets ingevuld!");
  } else {
      resultaat = (txtInput.value).substring(txtBeginIndex.value,txtEindIndex.value);
  }

  output.innerHTML='= ' + resultaat;
};

window.addEventListener("load", setup);