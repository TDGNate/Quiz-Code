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
const msgEm = document.getElementById('rightWrongText');

// End Game Score Elements 
const scoreDiv = document.querySelector('.screen-score');
const scoreSpan = document.getElementById('score');
const scoreInput = document.getElementById('screen-score-inputText');
const scoreSaveBtn = document.getElementById('screen-score-Btn');

// Highlight Screen Elements 
const highlightDiv = document.querySelector('.screen-highlight');
const scoreBoardUl = document.getElementById('scoreContainer');
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
let scoreHighlightsMsgs = [];
let scoreHighlights = [];
let isPlayingGame = false;
let timerState = 90;
let score = 0;

// Function to start the game 
function startGame() {
  isPlayingGame = true;
  // displaying HTML Elements for Questions 
  startBtnContainer.style.display = 'none';
  card.style.display = 'block';
  playEl.style.display = 'block';
  // Enable play function 
  playingGame();
  
  // start the time 
  var timerFunction = setInterval(() => {
    if (timerState <= 1 || isPlayingGame === false) {
      clearInterval(timerFunction);
      saveScore();
      timerEl.textContent = null;
      timerEl.style.removeProperty('animation');
      if (isPlayingGame) {
        isPlayingGame === false;
      }
    }
    timerState -= 1;
    timerEl.textContent = timerState;
    if (timerState > 60) {
      timerEl.textContent = `1:${timerState - 60}`
      if (timerEl.textContent.length < 4) {
        timerEl.textContent = `1:0${timerState - 60}`
      }
    }
    if (timerState <= 11) {
      timerEl.style.setProperty("animation", "blinking-red 5s infinite");
    }
  }, 1000);

}

function playingGame() {
    // get a random question 
  let questionAnswer = randomQuestion();
  
  if (questionAnswer === 'All Answered') {
    // console.log('All the questions have been answered!')
    isPlayingGame = false;

  } else if (questionAnswer === 'call again') {
    playingGame();
  } else {
    
    // reset content on screen

    questionEl.textContent = ''
    answersEl.textContent = ''
    msgEm.textContent = ''
    let question = questionAnswer[0];
    let answer = questionAnswer[1];
    let solution = questionAnswer[2];

    // console.log(questionsAnswersState.includes(question))
    // console.log(questionsAnswersState)

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
          // when you lose it adds red styles and deducts score and time
          // console.log('naw g')
          element.classList.add('wrong')
          setTimeout(() => {
            element.classList.remove('wrong')
          }, 1000);
          let randomLostScore = Math.floor(Math.random() * (6 - 2) + 2);
          let randomLostTime = Math.floor(Math.random() * (19 - 15) + 15);
          score -= randomLostScore;
          timerState -= randomLostTime;
          if (score < 0) {
            score = 0;
          }
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

// function restoreScore() {
//   if (localStorage.length > 0) {
//     for (i = 0; i < localStorage.length; i++) {
//       let scores = JSON.parse(localStorage.getItem('userScore'));
//       let Msgs = JSON.parse(localStorage.getItem('userInput'));
//       scoreHighlights.push(scores[i]);
//       scoreHighlightsMsgs.push(Msgs[i]);
//     }
//   }
// }
// restoreScore()

if (localStorage.length > 0) {
  let scores = JSON.parse(localStorage.getItem('userScore'));
  let Msgs = JSON.parse(localStorage.getItem('userInput'));
  for (i = 0; i < localStorage.length / 2; i++) {
    scoreHighlights.push(scores[i]);
    scoreHighlightsMsgs.push(Msgs[i]);
  }
}

// Score Screen Function 

function saveScore() {
  // display score contents 
  playEl.style.display = 'none';
  scoreDiv.style.display = 'block';
  let finalScore = score;
  scoreSpan.textContent = finalScore;
  scoreSaveBtn.addEventListener('click', () => {
    if (scoreInput.value === '') {
      alert("Please add your initials!\nReload page if you don't want to save score")
    } else {
      scoreHighlights.push(finalScore);
      scoreHighlightsMsgs.push(scoreInput.value);
      // Add updated array to localstorage

      
      localStorage.setItem('userScore', JSON.stringify(scoreHighlights));
      localStorage.setItem('userInput', JSON.stringify(scoreHighlightsMsgs));

      
      scoreSpan.textContent = '';
      userScoreMsg = '';
      // call highlight function 
      highlightBoard();
    }
  })
}

// This function are the your highlights to save ur best scores

//scoreBoardUl
function highlightBoard() {
    // display score contents 
  card.style.display = 'none';
  scoreDiv.style.display = 'none';
  highlightDiv.style.display = 'block';

  // get array in storage 
  let storedScores = JSON.parse(localStorage.getItem('userScore'));
  let storedMsgs = JSON.parse(localStorage.getItem('userInput'));

  if (localStorage.length === null) {
    let subTitleHighlight = document.createElement('span');
    subTitleHighlight.textContent = 'No Score Recorded';
    subTitleHighlight.setAttribute('class', 'subTitle')
    scoreBoardUl.append(subTitleHighlight)
    // don't show the clear button 
    clearBtn.style.setProperty('display', 'none');
    // go back to home page 
    homeBtn.addEventListener('click', () => {
      location.reload();
    })
  } else {
    clearBtn.style.setProperty('display', 'block');

    for (i = 0; i < localStorage.length; i++) {

      // creating DOM elements to store items in local storage 
      // Add list items 
      let li = document.createElement('li');
      li.textContent = storedScores[i];
      li.setAttribute('class', 'screen-highlight-score');
      // Add span element 
      let span = document.createElement('span');
      span.textContent = storedMsgs[i];
      span.setAttribute('class', 'screen-highlight-score-initial');
      // appending to eachother to show
      li.appendChild(span);
      scoreBoardUl.appendChild(li);
    }
    // Event listeners 
    homeBtn.addEventListener('click', () => {
      location.reload();
    })

    clearBtn.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
      highlightBoard();
    })
  }
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
    // console.log('the state is greater than 0')
    if (questionsAnswersState.includes(question)) {
      return 'call again'
    }
  }
}

  startBtn.addEventListener('click', startGame)
