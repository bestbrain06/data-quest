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
      "Number of books in a library",
    ],

    answer: "Colour of a student's bag",

    hint: "Qualitative data describes characteristics or categories.",

    explanation:
      "Colour describes a characteristic or category rather than a numerical quantity, so it is qualitative data.",
  },

  {
    id: 2,

    topic: "Data Collection Methods",

    question:
      "A teacher wants to find out the favourite subjects of students in a class. Which method would be most suitable for collecting this information?",

    options: [
      "Questionnaire",
      "Experiment",
      "Measuring students' heights",
      "Drawing a pie chart",
    ],

    answer: "Questionnaire",

    hint: "Think about a method where students can provide their responses.",

    explanation:
      "A questionnaire allows the teacher to ask students questions and collect their responses about their favourite subjects.",
  },

  {
    id: 3,

    topic: "Data Collection Methods",

    question:
      "A researcher watches students during break time and records the number of students who play different games. Which data collection method is being used?",

    options: ["Interview", "Observation", "Questionnaire", "Experiment"],

    answer: "Observation",

    hint: "The researcher is watching and recording what happens.",

    explanation:
      "Observation involves watching events or behaviours and recording the information obtained.",
  },

  {
    id: 4,

    topic: "Raw and Ordered Data",

    question:
      "Which of the following represents data that has been arranged from smallest to largest?",

    options: [
      "12, 5, 8, 3, 10",
      "5, 3, 10, 12, 8",
      "3, 5, 8, 10, 12",
      "8, 12, 3, 5, 10",
    ],

    answer: "3, 5, 8, 10, 12",

    hint: "Ordered data is arranged according to a particular order.",

    explanation:
      "The values 3, 5, 8, 10 and 12 are arranged from the smallest to the largest, so this is ordered data.",
  },

  {
    id: 5,

    topic: "Tally Tables",

    question:
      "What is the main purpose of using tally marks when collecting data?",

    options: [
      "To draw a graph",
      "To record and count occurrences quickly",
      "To calculate the mean",
      "To arrange data alphabetically",
    ],

    answer: "To record and count occurrences quickly",

    hint: "Tally marks help you keep track of how many times something occurs.",

    explanation:
      "Tally marks provide a quick and organised way of recording the number of times each response or value occurs.",
  },

  {
    id: 6,

    topic: "Frequency Distribution",

    question:
      "The table below records the favourite sports of students. What does the frequency of a category represent?",

    options: [
      "The name of the category",
      "The number of times the category occurs",
      "The colour of the category",
      "The order of the categories",
    ],

    answer: "The number of times the category occurs",

    hint: "Frequency tells us how often something occurs.",

    explanation:
      "Frequency represents the number of times a particular value or category occurs in a dataset.",
  },

  {
    id: 7,

    topic: "Bar Charts",

    question:
      "Which type of graph is most suitable for comparing the number of students who chose different subjects?",

    options: ["Bar chart", "Line graph", "Pie chart", "Pictogram only"],

    answer: "Bar chart",

    hint: "Think about a graph used to compare separate categories.",

    explanation:
      "A bar chart is suitable for comparing frequencies or quantities across different categories such as school subjects.",
  },

  {
    id: 8,

    topic: "Pie Charts",

    question:
      "A school wants to show how a group of students is divided among different favourite sports. Which representation would be most suitable for showing the parts of the whole?",

    options: ["Line graph", "Pie chart", "Tally table", "Ordered list"],

    answer: "Pie chart",

    hint: "Think about a representation that shows parts of a whole.",

    explanation:
      "A pie chart divides a circle into sectors to show how different categories make up a whole.",
  },

  {
    id: 9,

    topic: "Line Graphs",

    question:
      "A school records the number of students attending school each day for one week. Which graph is most suitable for showing changes across the days?",

    options: ["Pie chart", "Line graph", "Pictogram", "Tally table"],

    answer: "Line graph",

    hint: "Think about a graph used to show changes and trends.",

    explanation:
      "A line graph is useful for showing how data changes over an ordered period such as the days of a week.",
  },

  {
    id: 10,

    topic: "Choosing Appropriate Representation",

    question:
      "A teacher wants to show the number of books read by students in each month of the school term. Which representation would be most appropriate?",

    options: ["Line graph", "Pie chart", "Tally marks only", "Pictogram"],

    answer: "Line graph",

    hint: "The data is recorded across different months, so think about showing change over time.",

    explanation:
      "A line graph is appropriate because the number of books is being recorded across different months, allowing changes and trends over time to be seen clearly.",
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
