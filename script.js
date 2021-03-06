let x;
let y; //our future variables

const buttonSet = document.querySelectorAll('.numButton');
Array.from(buttonSet).forEach(element => element.addEventListener("click", updateNumSet));

const problemDisplay = document.querySelector('.problemDisplay'); // display the problem
const answerSubmit = document.querySelector('.answerField'); // the input field
const answerClick = document.querySelector('.answerClick'); // the answer/new problem button
//const answerEval = document.querySelector('.answerEval'); // the response - in future, will contain motivational messages
const scoreStreak = document.querySelector('.scoreStreak'); // current streak
const scoreTotal = document.querySelector('.scoreTotal'); // number of correct answers
const incorrect = document.querySelector('.incorrect'); // number of incorrect answers
let currentStreak = 0; //the streak of correct answers
let totalScore = 0; //number of correct answers
let mistakes = 0; //number of incorrect answers


answerClick.value = `New problem`;
answerSubmit.value = "";



answerClick.addEventListener('click', whatToDo);

//deciding on the value of x

let possValues = [];

function updateNumSet(click) {
  const clicked = click.target;
  clicked.classList.toggle("included");
  if (possValues.includes(clicked.value)) {
    console.log("Remove it");
    let i = possValues.indexOf(clicked.value);
    possValues.splice(i, 1);
  }
  else possValues.push(clicked.value);
  console.log(possValues);
}

function addAll() {
  possValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
}

// the all and reset buttons are too much of a headache right now

// (clicked.value === "all") {
//   possValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// }

// else if (clicked.value === "reset") {
//   possValues.length = 0;
// } 


function randomElement(array) {
  let randomNum = Math.floor(Math.random() * (array.length - 1)); //generates a number between 0 and the length of the array
  console.log(`${randomNum}`);
  let randomArray = array[randomNum];
  return randomArray;
};

function whatToDo() {
  if (answerClick.value == 'New problem') { // there's no problem displayed, so we need to generate one
    if (possValues.length === 0) {
      alert("Please choose the numbers you'd like to work with.");
    } else {
      x = randomElement(possValues);
      console.log(`Out of possible values of ${possValues}, x is ${x}`);
      y = Math.floor(Math.random() * 12 + 1); // a random number between 1 and 12
      problemDisplay.textContent = `${x} * ${y}`; // the problem display
      answerClick.value = "Answer";
      answerSubmit.value = "";
    }
  } else if (answerClick.value == 'Answer') {  //there is a problem displayed, so we need to evaluate the answer
    const answer = +answerSubmit.value;
    if (answer == x * y) {
      problemDisplay.textContent = `Correct! ${x} * ${y} = ${x * y}`;
      console.log("Correct answer submitted");
      currentStreak += 1;
      totalScore += 1;
    } else {
      problemDisplay.textContent = `Incorrect. ${x} * ${y} = ${x * y}`;
      console.log("Incorrect answer submitted");
      currentStreak = 0;
      mistakes += 1;
    }

    answerSubmit.value = "";
    answerClick.value = `New problem`;
    let percentCorrect = (totalScore / (totalScore + mistakes)) * 100;
    scoreStreak.textContent = `That's ${currentStreak} correct answers in a row!`;
    scoreTotal.textContent = `You've answered ${totalScore} out of ${totalScore + mistakes} questions correctly this session! That's ${Math.round(percentCorrect)}%!`;
    incorrect.textContent = `You've gotten ${mistakes} questions incorrect.`;

  }
  else { console.log("I don't understand what's going wrong") }
}


