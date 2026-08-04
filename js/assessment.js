/* =====================================================
   DATAQUEST ASSESSMENT ENGINE
===================================================== */

// ===============================
// QUESTIONS DATABASE
// ===============================

const questions = [
  {
    question: "What type of data describes categories or qualities?",

    options: [
      "Quantitative data",
      "Qualitative data",
      "Continuous data",
      "Discrete data",
    ],

    answer: 1,
  },

  {
    question: "Which of the following is an example of discrete data?",

    options: [
      "Height of students",
      "Temperature of a room",
      "Number of students in a class",
      "Weight of a person",
    ],

    answer: 2,
  },

  {
    question: "A population is best described as:",

    options: [
      "A small part of a group",
      "The complete group being studied",
      "A graph representing data",
      "A frequency table",
    ],

    answer: 1,
  },

  {
    question: "A frequency table is used to:",

    options: [
      "Draw pictures",
      "Organise data and show how often values occur",
      "Calculate only averages",
      "Measure angles",
    ],

    answer: 1,
  },

  {
    question: "Which chart is most suitable for comparing categories?",

    options: ["Pie chart", "Line graph", "Bar chart", "Histogram"],

    answer: 2,
  },

  {
    question: "A pie chart represents data using:",

    options: ["Bars", "Angles and sectors", "Points only", "Lines"],

    answer: 1,
  },

  {
    question: "Which graph is best for showing changes over time?",

    options: ["Pie chart", "Bar chart", "Line graph", "Frequency table"],

    answer: 2,
  },

  {
    question: "If a category has the highest frequency, it means:",

    options: [
      "It occurs the most often",
      "It occurs the least often",
      "It has no value",
      "It cannot be compared",
    ],

    answer: 0,
  },

  {
    question: "The total frequency in a dataset represents:",

    options: [
      "The smallest value",
      "The number of categories",
      "The total number of observations",
      "The highest value",
    ],

    answer: 2,
  },

  {
    question: "Data interpretation involves:",

    options: [
      "Ignoring information",
      "Reading and drawing conclusions from data",
      "Changing all values",
      "Removing data",
    ],

    answer: 1,
  },
];

// ===============================
// VARIABLES
// ===============================

const form = document.getElementById("assessmentForm");

const submitButton = document.getElementById("submitAssessment");

const resultSection = document.getElementById("resultSection");

const finalScore = document.getElementById("finalScore");

const answerFeedback = document.getElementById("answerFeedback");

const answeredCount = document.getElementById("answeredCount");

let savedAnswers = JSON.parse(localStorage.getItem("assessmentAnswers")) || {};

let submitted = localStorage.getItem("assessmentSubmitted") === "true";

// ===============================
// LOAD QUESTIONS
// ===============================

function loadQuestions() {
  form.innerHTML = "";

  questions.forEach((question, index) => {
    const card = document.createElement("div");

    card.className = "question-card";

    let optionsHTML = "";

    question.options.forEach((option, optionIndex) => {
      const checked = savedAnswers[index] == optionIndex ? "checked" : "";

      optionsHTML += `

<label class="answer-option">

<input 
type="radio"
name="question${index}"
value="${optionIndex}"
${checked}
>

${option}

</label>

`;
    });

    card.innerHTML = `


<h3 class="question-number">

Question ${index + 1}

</h3>


<p class="question-text">

${question.question}

</p>


<div class="answer-options">

${optionsHTML}

</div>


`;

    form.appendChild(card);
  });

  updateCounter();
}

// ===============================
// SAVE ANSWERS
// ===============================

form.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    savedAnswers[e.target.name.replace("question", "")] = Number(
      e.target.value,
    );

    localStorage.setItem(
      "assessmentAnswers",

      JSON.stringify(savedAnswers),
    );

    updateCounter();
  }
});

// ===============================
// COUNTER
// ===============================

function updateCounter() {
  answeredCount.textContent = `${Object.keys(savedAnswers).length} / ${questions.length}`;
}

// ===============================
// SUBMIT ASSESSMENT
// ===============================
submitButton.addEventListener("click", () => {
  const confirmSubmit = confirm(
    "Are you sure you want to submit your assessment?\n\nYou will not be able to change your answers afterwards.",
  );

  if (!confirmSubmit) {
    return;
  }

  let score = 0;

  questions.forEach((question, index) => {
    const userAnswer = savedAnswers[index];

    if (userAnswer === question.answer) {
      score++;
    }
  });

  localStorage.setItem("assessmentSubmitted", "true");

  showResults(score);
});

// ===============================
// SHOW RESULTS
// ===============================

function showResults(score) {
  finalScore.textContent = `${score} / ${questions.length}`;

  resultSection.classList.remove("hidden");

  answerFeedback.innerHTML = "";

  questions.forEach((question, index) => {
    const userAnswer = savedAnswers[index];

    const correct = userAnswer === question.answer;

    const div = document.createElement("div");

    div.className = correct
      ? "feedback-card correct-feedback"
      : "feedback-card wrong-feedback";

    div.innerHTML = `


<h3>

Question ${index + 1}

${correct ? "✅" : "❌"}

</h3>



<p>

Your answer:

<strong>

${userAnswer !== undefined ? question.options[userAnswer] : "No answer"}

</strong>

</p>



<p>

Correct answer:

<strong>

${question.options[question.answer]}

</strong>

</p>



`;

    answerFeedback.appendChild(div);
  });

  lockAssessment();
}

// ===============================
// LOCK AFTER SUBMISSION
// ===============================

function lockAssessment() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.disabled = true;
  });

  submitButton.disabled = true;
}

// ===============================
// RESTORE SUBMITTED STATE
// ===============================

if (submitted) {
  setTimeout(() => {
    showResults(calculateScore());
  }, 300);
}

function calculateScore() {
  let score = 0;

  questions.forEach((question, index) => {
    if (savedAnswers[index] === question.answer) {
      score++;
    }
  });

  return score;
}

// INITIAL LOAD

loadQuestions();
