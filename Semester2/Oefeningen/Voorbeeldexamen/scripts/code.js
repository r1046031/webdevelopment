global = {
    highScores: [],

    quiz: [
        {
            question: "Wie is de hoofdpersoon in Final Fantasy VII Remake?",
            answers: ["Cloud Strife", "Sephiroth", "Tifa Lockhart"],
            correct: "Cloud Strife",
            selected: ""
        },
        {
            question: "Welke wereld wordt verkend in Final Fantasy XV?",
            answers: ["Gaia", "Eos", "Spira", "Cocoon"],
            correct: "Eos",
            selected: ""
        },
        {
            question: "Wie is de antagonist in Final Fantasy VIII?",
            answers: ["Ultimecia", "Kefka", "Seymour", "Kuja", "Edea"],
            correct: "Ultimecia",
            selected: ""
        },
        {
            question: "Heeft hoofdrolspeler in Final Fantasy IX een staart?",
            answers: ["Ja", "Nee"],
            correct: "Ja",
            selected: ""
        },
        {
            question: "Hoe heet de stad waarin het verhaal van Final Fantasy VII Remake begint?",
            answers: ["Midgar", "Junon", "Nibelheim", "Wutai"],
            correct: "Midgar",
            selected: ""
        },
        {
            question: "Welke summon is prominent aanwezig in Final Fantasy XV?",
            answers: ["Ifrit", "Shiva", "Ramuh", "Titan"],
            correct: "Ifrit",
            selected: ""
        },
        {
            question: "Wat is de naam van het luchtschip in Final Fantasy VIII?",
            answers: ["Ragnarok", "Highwind", "Invincible", "Falcon"],
            correct: "Ragnarok",
            selected: ""
        },
        {
            question: "Welke rol vervult Cid Highwind in Final Fantasy VII?",
            answers: ["Luchtschipkapitein", "Wapensmid", "Koning"],
            correct: "Luchtschipkapitein",
            selected: ""
        },
        {
            question: "Wat is het kenmerkende aan Cactuar-wezens in de Final Fantasy-serie?",
            answers: ["Ze zijn altijd groen", "Ze gebruiken de aanval 1000 Needles", "Ze zijn planten"],
            correct: "Ze gebruiken de aanval 1000 Needles",
            selected: ""
        },
        {
            question: "Welk Final Fantasy-wezen zorgt, met zijn aanval genaamd Bad Breath, voor verschillende statuseffecten?",
            answers: ["Malboro", "Chocobo", "Behemoth", "Tonberry"],
            correct: "Malboro",
            selected: ""
        }
    ]
}

const setup = () => {
    let btnStart = document.getElementById("start");
    btnStart.addEventListener("click", loadQuiz);

    let highScoresLocalStorage = localStorage.getItem("highScores");
    if(highScoresLocalStorage) {
        global.highScores = highScoresLocalStorage;
    } else {
        global.highScores[0] = 0;
    }
}

const loadQuiz = () => {
    let btnStart = document.getElementById("start");
    btnStart.remove();

    makeQuestionsNav();

    let question1 = document.querySelector('#quiz #questions #question1');
    question1.setAttribute('selected', 'true');

    loadQuestion(question1);

    loadHighScores();
}

const loadHighScores = () => {
    let highScores = document.querySelector("#highscores");

    for(let i = 0; i < global.highScores.length; i++) {
        let highScoreP = document.createElement("p");
        highScoreP.textContent = "Reeks " + i + ": " + global.highScores[i];
        highScores.appendChild(highScoreP);
    }
}

const refreshHighScores = () => {
    let highScores = document.querySelectorAll("#highscores p");

    for(let i = 0; i < global.highScores.length; i++) {
        highScores[i].textContent = "Reeks " + i + ": " + global.highScores[i];
    }
}

const makeQuestionsNav = () => {
    let quiz = document.getElementById("quiz");
    quiz.classList.remove('d-none');

    let navList = document.getElementById("questions");

    for(let i = 1; i <= global.quiz.length; i++) {
        let li = document.createElement('li');
        li.textContent = "Vraag " + i;
        li.setAttribute('id', ('question' + i));
        li.setAttribute('data-question', (i -1));
        li.className = 'list-group-item';
        li.addEventListener('click', () => loadQuestion(li));

        navList.appendChild(li);
    }
}

const loadQuestion = (event) => {
    let id = event.getAttribute('data-question');
    id = parseInt(id);

    event.classList.add('active');

    makeQuestionCard(id);
}

const makeQuestionCard = (id) => {
    let card = document.querySelector('#quiz .col-10 .card');

    let cardHeader = card.querySelector('.card-header');
    cardHeader.textContent = "Vraag #" + (id + 1);

    let cardTitle = card.querySelector('.card-body .card-title');
    cardTitle.textContent = global.quiz[id].question;

    let group = card.querySelector('#answers');
    let answers = global.quiz[id].answers;

    //TODO
    for(let i = 0; i < group.children.length; i++) {
        group.children[i].remove();
    }

    for(let i = 0; i < answers.length; i++) {
        let li = document.createElement('li');
        li.textContent = answers[i];
        li.className = 'list-group-item';
        li.addEventListener('click', () => selectAnswer(li, group, id));
        group.appendChild(li);
    }

    let btnOpslaan = document.querySelector("#quiz > div.col-10 > div > div.card-footer > button");
    btnOpslaan.addEventListener('click', () => opslaan(id));

    let floatEnd = card.querySelector('.card-footer .float-end #started');
    floatEnd.textContent = datumDisplay(Date.now());
}

const selectAnswer = (li, ul, id) => {
    let listItems = ul.children;
    let i = 0;

    while(i < listItems.length) {
        if(listItems[i].classList.contains('bg-info')) {
            listItems[i].classList.remove('bg-info');
        }

        i++;
    }

    if(!li.classList.contains('bg-info')) {
        li.classList.add('bg-info');
    } else {
        li.classList.remove('bg-info');
    }

    global.quiz[id].selected = li.textContent;
    console.log(global.quiz[id]);
}

//TODO
const opslaan = (id) => {
    let question = document.getElementById(('question' + (id + 1)));
    question.classList.remove('active');

    if(checkAnswer(id) === true) {
        question.classList.add('list-group-item-succes');
        global.highScores[(global.highScores.length - 1)] += 1;
    } else {
        question.classList.add('list-group-item-danger');

        if(global.highScores[(global.highScores.length - 1)] -1 > 0) {
            global.highScores[(global.highScores.length - 1)] -= 1;
        }
    }

    let firstSelectedQuestion = document.querySelector('#questions .active');
    let firstSelectedQuestionId = firstSelectedQuestion.getAttribute('data-question');
    let nextQuestion = document.getElementById(("question" + (firstSelectedQuestionId + 1)));
    loadQuestion(nextQuestion);

    refreshHighScores();
}

const checkAnswer = (id) => {
    if(global.quiz[id].selected === global.quiz[id].correct) {
        return true;
    } else {
        return false;
    }
}

const datumDisplay = (datum) => {
    let maanden = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

    datum = new Date(datum);

    let hoursDisplay = datum.getHours();
    let minutesDisplay = datum.getMinutes();

    if(hoursDisplay.toString().length === 1) {
        hoursDisplay = "0" + hoursDisplay;
    }

    if(minutesDisplay.toString().length === 1) {
        minutesDisplay = "0" + minutesDisplay;
    }

    return datum.getDay() + " " + maanden[datum.getMonth()] + " om " + hoursDisplay + ":" + minutesDisplay;
}

window.addEventListener("load", setup);