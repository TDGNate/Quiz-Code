// Get DOM elements

// Start Game Element 
const startBtn = document.getElementById('startGame');
const startBtnContainer = document.getElementById('startGameContainer');
// Card Container 
const card = document.querySelector('.card');
// Playing State Elements 
const playEl = document.querySelector('.screen-playing');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers-section');
// const answerLi = document.querySelectorAll('.answer');
const msgEm = document.getElementById('rightWrongText');

// End Game Score Elements 
const scoreh3 = document.getElementById('score');
const scoreInput = document.getElementById('screen-score-inputText');
const scoreSaveBtn = document.getElementById('screen-score-Btn');

// Highlight Screen Elements 
const scoreBoard = document.getElementById('scoreContainer');
const homeBtn = document.getElementById('homeBtn');
const clearBtn = document.getElementById('clearScoreBtn');

let questionsAnswers = [
  {
    id: 0,
    question: 'Arrays in JavaScript can be used to store ______.',
    answers: ['numbers and strings', 'booleans', 'other arrays', 'all of the above'],
    solution: 'all of the above'
  },
  {
    id: 1,
    question: 'String values must be enclosed within ______ when being assigned to variables.',
    answers: ['quotes', 'curly brackets', 'commas', 'parentheses'],
    solution: 'quotes'
  },
  {
    id: 2,
    question: 'Commonly used data types DO NOT include:',
    answers: ['alerts', 'numbers', 'strings', 'booleans'],
    solution: 'alerts'
  },
  {
    id: 3,
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    answers: ['terminal/bash', 'JavaScript', 'console.log', 'for loops'],
    solution: 'console.log'
  },
  {
    id: 4,
    question: 'The condition in an if/else statement is enclosed within ______.',
    answers: ['curly brackets', 'parentheses', 'quotes', 'square brackets'],
    solution: 'parentheses'
  }
]

let questionsAnswersState = [];
let timerState = '';
let score = 0;

// Function to start the game 
function startGame() {
  // displaying HTML Elements for Questions 
  startBtnContainer.style.display = 'none';
  card.style.display = 'block';
  playEl.style.display = 'block';
  // Enable play function 
    playingGame();
}

function playingGame() {
    // get a random question 
  let questionAnswer = randomQuestion();
  let question = questionAnswer[0];
  // if (!questionAnswer === null) {
  //   console.log(questionAnswer)
  // } else if (questionAnswer === 'call again') {
  // }
  if (questionAnswer === 'All Answered') {
    console.log('All the questions have been answered!')
  } else if (questionAnswer === 'call again') {
    playingGame();
  } else {

  // if (questionAnswer === 'call again') {
  //   playingGame()
  // } else if (questionAnswer === 'All Answered') {
  //   console.log('game over')
  // } else {

    questionEl.textContent = ''
    answersEl.textContent = ''
    msgEm.textContent = ''

    let answer = questionAnswer[1];
    let solution = questionAnswer[2];

    // console.log(questionsAnswersState.includes(question))
    console.log(questionsAnswersState)

    questionEl.textContent = question;
    
    // Add each Answer Li to Page 
    for (i = 0; i < answer.length; i++) {
      let answerLi = document.createElement('li');
      answerLi.textContent = answer[i]
      answerLi.setAttribute('class', 'answer')
      answersEl.appendChild(answerLi)
    };
    // Gets all answer li's to listen for click, then add class and return value 
    let answerLi = document.querySelectorAll('.answer');
    answerLi.forEach((element) => {
      element.addEventListener('click', (e) => {
        if (element.textContent === solution) {
          // When you Win, adds styles to element, and increase score 
          // console.log('Good work')
          element.classList.add('correct')
          setTimeout(() => {
            element.classList.remove('correct')
          }, 1000);
          let randomWinScore = Math.floor(Math.random() * (25 - 15) + 15);
          score += randomWinScore;
          msgEm.textContent = 'Correct!'
          setTimeout(() => {
            playingGame();
          }, 1100)
        } else {
          // when you lose it adds red styles and no score 
          // console.log('naw g')
          element.classList.add('wrong')
          setTimeout(() => {
            element.classList.remove('wrong')
          }, 1000);
          let randomLostScore = Math.floor(Math.random() * (6 - 2) + 2);
          score -= randomLostScore;
          msgEm.textContent = 'Wrong...'
          setTimeout(() => {
            playingGame();
          }, 1100)
        }
      })
    })
  }


  // console.log(questionsAnswersState)
}

function randomQuestion() {
  let random = Math.floor(Math.random() * questionsAnswers.length)
  let currentQuestionAnswer = questionsAnswers[random];
  let question = currentQuestionAnswer.question;
  let answer = currentQuestionAnswer.answers;
  let solution = currentQuestionAnswer.solution;

  if (questionsAnswersState.length === 0 || !questionsAnswersState.includes(question)) {
    questionsAnswersState.push(question)
    return [question, answer, solution];
  } else if (questionsAnswersState.length > null && questionsAnswersState.length === questionsAnswers.length) {
    return 'All Answered'
  } else {
    console.log('the state is greater than 0')
    if (questionsAnswersState.includes(question)) {
      return 'call again'
    }
  }


  // if (questionsAnswersState.length === 0 || !questionsAnswersState.includes(question)) {
  //   questionsAnswersState.push(question)
  //   return [question, answer, solution];
  // } else if (questionsAnswersState.length > null) {
  //   console.log('the state is greater than 0')
  //   if (questionsAnswersState.includes(question)) {
  //     return 'call again'
  //   } else if (questionsAnswersState.length === questionsAnswers.length) {
  //     return 'All Answered'
  //   }
  // } 

}

  startBtn.addEventListener('click', startGame)
