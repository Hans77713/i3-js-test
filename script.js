"use strict";

const questions = Array.from({ length: 4 }, (_, i) => ({
  question: `Pitanje broj ${i + 1}`,
  answers: Array.from(
    { length: Math.floor(Math.random() * 7) + 2 },
    (_, j) => j + 1
  ),
}));

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");

let currentQuestionIndex = 0;

function toggleNavButtons() {
  prevButton.style.visibility =
    currentQuestionIndex === 0 ? "hidden" : "visible";
  if (currentQuestionIndex === 3) {
    nextButton.textContent = "Show results";
    if (selectedAnswersTexts.every((x) => x.length > 0)) {
      nextButton.disabled = false;
      nextButton.classList.remove("btn-disabled");
    } else {
      nextButton.disabled = true;
      nextButton.classList.add("btn-disabled");
    }
  } else {
    nextButton.textContent = "Next";
    nextButton.disabled = false;
    nextButton.classList.remove("btn-disabled");
  }

  question1Btn.classList.toggle("answered", selectedAnswersTexts[0].length > 0);
  question2Btn.classList.toggle("answered", selectedAnswersTexts[1].length > 0);
  question3Btn.classList.toggle("answered", selectedAnswersTexts[2].length > 0);
  question4Btn.classList.toggle("answered", selectedAnswersTexts[3].length > 0);
}

const question1Btn = document.getElementById("question-1-btn");
const question2Btn = document.getElementById("question-2-btn");
const question3Btn = document.getElementById("question-3-btn");
const question4Btn = document.getElementById("question-4-btn");

question1Btn.addEventListener("click", () => navigateToQuestion(0));
question2Btn.addEventListener("click", () => navigateToQuestion(1));
question3Btn.addEventListener("click", () => navigateToQuestion(2));
question4Btn.addEventListener("click", () => navigateToQuestion(3));

function navigateToQuestion(index) {
  currentQuestionIndex = index;
  showQuestion();
}

const toast = document.getElementById("toast");
function showToast(message, duration) {
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(function () {
    toast.style.display = "none";
  }, duration);
}

const selectedAnswersTexts = Array.from({ length: 4 }, () => []);

function startQuiz() {
  currentQuestionIndex = 0;
  showQuestion();
}

function resetState() {
  questionElement.textContent = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showQuestion() {
  resetState();
  toggleNavButtons();

  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.textContent = questionNo + ". " + currentQuestion.question;

  for (let j = 0; j < currentQuestion.answers.length; j++) {
    const button = document.createElement("button");
    button.textContent = j + 1;
    button.classList.add("btn");
    button.addEventListener("click", (e) => {
      selectAnswer(e);
    });
    if (
      selectedAnswersTexts[currentQuestionIndex].includes(button.textContent)
    ) {
      button.classList.add("selected");
    }
    answerButtons.appendChild(button);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const answerText = selectedBtn.textContent.trim();

  const maxSelectableAnswers = 2 + currentQuestionIndex;

  if (selectedBtn.classList.contains("selected")) {
    selectedBtn.classList.remove("selected");
    const index =
      selectedAnswersTexts[currentQuestionIndex].indexOf(answerText);
    if (index !== -1) {
      selectedAnswersTexts[currentQuestionIndex].splice(index, 1);
    }
  } else {
    if (
      answerButtons.querySelectorAll(".selected").length <= maxSelectableAnswers
    ) {
      selectedBtn.classList.add("selected");
      selectedAnswersTexts[currentQuestionIndex].push(answerText);
    } else {
      showToast("Odabran je maksimalni broj odgovora", 3000);
    }
  }

  toggleNavButtons();
}

function showScore() {
  resetState();

  selectedAnswersTexts.forEach((answers, index) => {
    const answersText = document.createElement("p");
    answersText.textContent = `Question ${index + 1}: ${answers.join(", ")}`;
    questionElement.appendChild(answersText);
  });
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex === 3) {
    currentQuestionIndex++;
    showScore();
  } else {
    currentQuestionIndex++;
    showQuestion();
  }
});

prevButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
});

startQuiz();
