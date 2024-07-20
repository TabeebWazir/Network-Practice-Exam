const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const reviewContainerElement = document.getElementById('review-container');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let userAnswers = [];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    resultContainerElement.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const row = document.createElement('div');
        row.classList.add('btn-row');
        const button = document.createElement('button');
        button.innerText = String.fromCharCode(65 + index);
        button.classList.add('choice', 'btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        const answerText = document.createElement('span');
        answerText.innerText = answer.text;
        row.appendChild(button);
        row.appendChild(answerText);
        answerButtonsElement.appendChild(row);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    userAnswers.push({
        question: shuffledQuestions[currentQuestionIndex].question,
        answers: shuffledQuestions[currentQuestionIndex].answers,
        selectedAnswer: selectedButton.innerText,
        correct: correct === 'true'
    });
    clearSelectedClass(answerButtonsElement);
    selectedButton.classList.add('selected');
    if (correct) {
        score++;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        showResults();
    }
}

function clearSelectedClass(container) {
    const buttons = container.getElementsByClassName('choice');
    for (let button of buttons) {
        button.classList.remove('selected');
    }
}


function showResults() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    scoreElement.innerText = `${score} / ${shuffledQuestions.length}`;

    // Calculate percentage and round to the nearest whole number
    const percentage = Math.round((score / shuffledQuestions.length) * 100);

    // Create a new element for the percentage
    const percentageElement = document.createElement('h2');
    percentageElement.innerText = `${percentage}%`;
    percentageElement.style.textAlign = 'center';
    percentageElement.style.fontSize = '24px'; // Same size as the score element

    // Clear existing review content and append the new percentage element
    reviewContainerElement.innerHTML = '';
    reviewContainerElement.appendChild(percentageElement);

    userAnswers.forEach(answer => {
        const questionRow = document.createElement('div');
        questionRow.classList.add('btn-row');
        const questionText = document.createElement('div');
        questionText.innerText = answer.question;
        questionRow.appendChild(questionText);
        reviewContainerElement.appendChild(questionRow);

        answer.answers.forEach((ans, index) => {
            const row = document.createElement('div');
            row.classList.add('btn-row');
            const button = document.createElement('button');
            button.innerText = String.fromCharCode(65 + index);
            button.classList.add('choice', 'btn');
            button.disabled = true;

            // Highlight the selected answer
            if (button.innerText === answer.selectedAnswer) {
                if (answer.correct) {
                    button.style.backgroundColor = 'lightgreen';
                } else {
                    button.style.backgroundColor = 'lightcoral';
                }
            }

            const answerText = document.createElement('span');
            answerText.innerText = ans.text;
            row.appendChild(button);
            row.appendChild(answerText);
            reviewContainerElement.appendChild(row);
        });
    });
}


const questions = [
    {
        question: 'Where does (did) a hub send data?',
        answers: [
            { text: 'Only to the receiving system', correct: false },
            { text: 'Only to the sending system', correct: false },
            { text: 'To all the systems connected to the hub', correct: true },
            { text: 'Only to the server', correct: false }
        ]
    },
    {
        question: 'What uniquely identifies every NIC(network interface card)?',
        answers: [
            { text: 'IP address', correct: false },
            { text: 'Media access control address', correct: true },
            { text: 'ISO number', correct: false },
            { text: 'Packet ID number', correct: false }
        ]
    },
    {
        question: 'What Windows utility do you use to find the MAC address for a system?',
        answers: [
            { text: 'ipconfig /all', correct: true },
            { text: 'ipcfg /all', correct: false },
            { text: 'ping', correct: false },
            { text: 'mac', correct: false }
        ]
    },
    {
        question: 'A MAC(media access control) address is known as a(n) __________ address.',
        answers: [
            { text: 'IP', correct: false },
            { text: 'logical', correct: false },
            { text: 'physical', correct: true },
            { text: 'OEM', correct: false }
        ]
    },
    {
        question: 'A NIC sends data in discrete chunks called __________.',
        answers: [
            { text: 'segments', correct: false },
            { text: 'sections', correct: false },
            { text: 'frames', correct: true },
            { text: 'layers', correct: false }
        ]
    },
    {
        question: 'The MAC address of which of the following begins a frame?',
        answers: [
            { text: 'Receiving system', correct: true },
            { text: 'Sending system', correct: false },
            { text: 'Network', correct: false },
            { text: 'Router', correct: false }
        ]
    },
    {
        question: 'A frame ends with a special bit called the frame check sequence (FCS). What does the FCS do?',
        answers: [
            { text: 'Cycles data across the network', correct: false },
            { text: 'Verifies that the MAC addresses are correct', correct: false },
            { text: 'Verifies that the data arrived correctly', correct: true },
            { text: 'Verifies that the IP address is correct', correct: false }
        ]
    },
    {
        question: 'Which of the following is an example of a MAC address?',
        answers: [
            { text: '0–255', correct: false },
            { text: '00–50–56–A3–04–0C', correct: true },
            { text: 'SBY3M7', correct: false },
            { text: '192.168.4.13', correct: false }
        ]
    },
    {
        question: 'Which layer of the OSI model controls the segmentation and reassembly of data?',
        answers: [
            { text: 'Application layer', correct: false },
            { text: 'Presentation layer', correct: false },
            { text: 'Session layer', correct: false },
            { text: 'Transport layer', correct: true }
        ]
    },
    {
        question: 'Which layer of the OSI model keeps track of a system’s connections to send the right response to the right computer?',
        answers: [
            { text: 'Application layer', correct: false },
            { text: 'Presentation layer', correct: false },
            { text: 'Session layer', correct: true },
            { text: 'Transport layer', correct: false }
        ]
    }
    
    
];