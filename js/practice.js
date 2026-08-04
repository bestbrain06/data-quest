/* =====================================================
   DATAQUEST STATISTICS PRACTICE ENGINE
===================================================== */

/* =====================================================
   QUESTION DATABASE
===================================================== */

const questions = [
  {
    id: 1,

    topic: "Types of Data",

    question: "Which of the following is an example of qualitative data?",

    options: [
      "Number of students in a class",
      "Height of students",
      "Colour of a student's bag",
      "Marks obtained in Mathematics",
    ],

    answer: "Colour of a student's bag",

    hint: "Qualitative data describes characteristics or categories.",

    explanation:
      "Colour is a description and cannot be measured numerically, therefore it is qualitative data.",
  },

  {
    id: 2,

    topic: "Qualitative and Quantitative Data",

    question: "Which of the following represents quantitative data?",

    options: [
      "Favourite subject of students",
      "Gender of students",
      "Number of books owned by students",
      "Colour of cars",
    ],

    answer: "Number of books owned by students",

    hint: "Quantitative data involves numbers and measurements.",

    explanation:
      "The number of books is numerical data, making it quantitative.",
  },

  {
    id: 3,

    topic: "Discrete and Continuous Data",

    question: "Which of the following is continuous data?",

    options: [
      "Number of children in a family",
      "Number of cars in a garage",
      "Height of students",
      "Number of classrooms",
    ],

    answer: "Height of students",

    hint: "Continuous data can take any value within a range.",

    explanation:
      "Height can be measured using decimals, such as 165.5 cm, so it is continuous data.",
  },

  {
    id: 4,

    topic: "Frequency Distribution",

    question:
      "A table that shows how often each value occurs in a dataset is called:",

    options: [
      "Frequency distribution table",
      "Pie chart",
      "Histogram",
      "Scatter plot",
    ],

    answer: "Frequency distribution table",

    hint: "Think about counting occurrences.",

    explanation:
      "A frequency distribution table organises data values and shows their frequencies.",
  },

  {
    id: 5,

    topic: "Mean",

    question: "Find the mean of 4, 6, 8 and 10.",

    options: ["6", "7", "8", "9"],

    answer: "7",

    hint: "Add all values then divide by the number of values.",

    explanation: "Mean = (4 + 6 + 8 + 10) ÷ 4 = 28 ÷ 4 = 7.",
  },

  {
    id: 6,

    topic: "Median",

    question: "What is the median of 3, 5, 7, 9 and 11?",

    options: ["5", "7", "9", "11"],

    answer: "7",

    hint: "Arrange data and find the middle value.",

    explanation: "The numbers are already arranged. The middle value is 7.",
  },

  {
    id: 7,

    topic: "Mode",

    question: "Find the mode of 2, 4, 4, 5, 6.",

    options: ["2", "4", "5", "No mode"],

    answer: "4",

    hint: "Mode is the value that appears most often.",

    explanation:
      "4 appears twice while the other values appear once, therefore the mode is 4.",
  },

  {
    id: 8,

    topic: "Range",

    question: "What is the range of 5, 9, 12, 15?",

    options: ["5", "10", "15", "20"],

    answer: "10",

    hint: "Range = largest value - smallest value.",

    explanation: "Range = 15 - 5 = 10.",
  },

  {
    id: 9,

    topic: "Charts",

    question: "Which graph is most suitable for showing changes over time?",

    options: ["Pie chart", "Line graph", "Bar chart", "Frequency table"],

    answer: "Line graph",

    hint: "Think about trends and movement.",

    explanation:
      "Line graphs are used to display changes and trends over time.",
  },

  {
    id: 10,

    topic: "Data Interpretation",

    question:
      "A bar chart shows Mathematics has the highest frequency among subjects. What does this mean?",

    options: [
      "Mathematics has the lowest number of students",
      "Mathematics occurs most frequently",
      "All subjects have equal frequency",
      "The chart is incorrect",
    ],

    answer: "Mathematics occurs most frequently",

    hint: "The tallest bar represents the greatest frequency.",

    explanation: "The category with the highest bar has the largest frequency.",
  },
];

/* =====================================================
   VARIABLES
===================================================== */

let currentQuestion = 0;

let score = 0;

let answeredQuestions = {};

let selectedAnswer = "";

/* =====================================================
   ELEMENTS
===================================================== */

const questionText = document.getElementById("questionText");

const answerContainer = document.getElementById("answerContainer");

const questionCounter = document.getElementById("questionCounter");

const progressFill = document.getElementById("progressFill");

const scoreDisplay = document.getElementById("score");

const hintButton = document.getElementById("hintButton");

const hintBox = document.getElementById("hintBox");

const submitButton = document.getElementById("submitAnswer");

const nextButton = document.getElementById("nextQuestion");

const feedbackBox = document.getElementById("feedbackBox");

const feedbackTitle = document.getElementById("feedbackTitle");

const feedbackMessage = document.getElementById("feedbackMessage");

const explanationButton = document.getElementById("explanationButton");

const explanationBox = document.getElementById("explanationBox");

const resetButton = document.getElementById("resetPractice");

/* =====================================================
   LOCAL STORAGE
===================================================== */

function saveProgress() {
  localStorage.setItem(
    "dataquestPracticeProgress",

    JSON.stringify({
      currentQuestion,

      score,

      answeredQuestions,
    }),
  );
}

function loadProgress() {
  const saved = localStorage.getItem("dataquestPracticeProgress");

  if (saved) {
    const data = JSON.parse(saved);

    currentQuestion = data.currentQuestion || 0;

    score = data.score || 0;

    answeredQuestions = data.answeredQuestions || {};
  }
}

/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {
  const question = questions[currentQuestion];

  if (!question) {
    finishPractice();

    return;
  }

  selectedAnswer = answeredQuestions[question.id]?.answer || "";

  questionText.textContent = question.question;

  questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;

  scoreDisplay.textContent = score;

  answerContainer.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");

    button.className = "answer-option";

    button.textContent = option;

    if (option === selectedAnswer) {
      button.classList.add("selected");
    }

    button.onclick = () => {
      document
        .querySelectorAll(".answer-option")
        .forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");

      selectedAnswer = option;
    };

    answerContainer.appendChild(button);
  });

  resetFeedback();
}

/* =====================================================
   SUBMIT ANSWER
===================================================== */

submitButton.onclick = () => {
  if (selectedAnswer === "") {
    alert("Please select an answer first.");

    return;
  }

  const question = questions[currentQuestion];

  let correct = selectedAnswer === question.answer;

  if (!answeredQuestions[question.id]) {
    answeredQuestions[question.id] = {
      answer: selectedAnswer,

      correct,
    };

    if (correct) {
      score++;
    }
  }

  if (correct) {
    feedbackBox.className = "feedback-box correct";

    feedbackTitle.textContent = "Correct ✅";

    feedbackMessage.textContent = "Excellent! Your answer is correct.";
  } else {
    feedbackBox.className = "feedback-box wrong";

    feedbackTitle.textContent = "Incorrect ❌";

    feedbackMessage.textContent = `The correct answer is: ${question.answer}`;
  }

  feedbackBox.classList.remove("hidden");

  nextButton.classList.remove("hidden");

  saveProgress();
};

/* =====================================================
   HINT
===================================================== */

hintButton.onclick = () => {
  const question = questions[currentQuestion];

  hintBox.textContent = question.hint;

  hintBox.classList.remove("hidden");
};

/* =====================================================
   EXPLANATION
===================================================== */

explanationButton.onclick = () => {
  const question = questions[currentQuestion];

  explanationBox.textContent = question.explanation;

  explanationBox.classList.remove("hidden");
};

/* =====================================================
   NEXT QUESTION
===================================================== */

nextButton.onclick = () => {
  currentQuestion++;

  hintBox.classList.add("hidden");

  nextButton.classList.add("hidden");

  saveProgress();

  loadQuestion();
};

/* =====================================================
   RESET
===================================================== */

resetButton.onclick = () => {
  const confirmReset = confirm("Reset all practice progress?");

  if (confirmReset) {
    localStorage.removeItem("dataquestPracticeProgress");

    currentQuestion = 0;

    score = 0;

    answeredQuestions = {};

    loadQuestion();
  }
};

/* =====================================================
   RESET FEEDBACK
===================================================== */

function resetFeedback() {
  feedbackBox.classList.add("hidden");

  explanationBox.classList.add("hidden");

  hintBox.classList.add("hidden");
}

/* =====================================================
   FINISH
===================================================== */

function finishPractice() {
  questionText.textContent = "Practice Completed 🎉";

  answerContainer.innerHTML = `
<h3>
Final Score: ${score}/${questions.length}
</h3>
`;

  progressFill.style.width = "100%";

  questionCounter.textContent = "Completed";

  submitButton.style.display = "none";

  nextButton.style.display = "none";
}

/* =====================================================
   START
===================================================== */

loadProgress();

loadQuestion();
