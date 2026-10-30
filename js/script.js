import { quizQuetions, initQuizResults } from "./quiz.js";

const homePage = document.getElementById("homepg");
const loaderPage = document.getElementById('loader');
const featurePage = document.getElementById('featurepg');
const factsPage = document.getElementById('factspg');
const galleryPage = document.getElementById('gallerypg');
const quizPage = document.getElementById('quizpg');
const questionsPage = document.getElementById("questionspg");
const resultsPage = document.getElementById("resultspg");

const allHomePages = [homePage, loaderPage, featurePage, factsPage, galleryPage ,quizPage]


const cards = document.querySelectorAll('.features__grid--card');

const slides = document.querySelectorAll(".facts__slider--slide");
const nextBtnSlide = document.querySelector(".facts__slider--btn--right");
const prevBtnSlide = document.querySelector(".facts__slider--btn--left");

const gallery = document.querySelector(".gallery");
const galleryCards = document.querySelectorAll(".gallery__grid--box");

const quizForm = document.getElementById("quiz-form");

const navQuizBtn = document.querySelector('.nav__cta--quiz');
const startQuizBtn = document.querySelector(".quiz__cta--btn");
const exitQuizBtn = document.querySelector(".questions__exit");
const exitResultsBtn = document.querySelector('.results__exit--btn');

// 1. ROTATING CARDS
cards.forEach((card) => {
    const learnMoreBtn = card.querySelector('.features__grid--card--btn');
    
    learnMoreBtn.addEventListener('click', () => {
        cards.forEach((otherCard) => {
            if (otherCard !== card) {
                otherCard.classList.remove("is-flipped");
            }
        });

        card.classList.add("is-flipped");
    })
})


// 2. SLIDER
let currentSlide = 0;
const maxSlide = slides.length;

function goToSlide(slideNumber) {
  slides.forEach((slide, index) => {
    slide.style.transform =
      `translateX(${100 * (index - slideNumber)}%)`;
  });

  updateButtons();
}

function updateButtons() {
  prevBtnSlide.style.visibility =
    currentSlide === 0 ? "hidden" : "visible";

  nextBtnSlide.style.visibility =
    currentSlide === maxSlide - 1 ? "hidden" : "visible";
}

goToSlide(0);

nextBtnSlide.addEventListener("click", () => {
  if (currentSlide < maxSlide - 1) {
    currentSlide++;
    goToSlide(currentSlide);
  }
});

prevBtnSlide.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    goToSlide(currentSlide);
  }
});

// 3. GALLERY CARDS
function resetGallery() {
  galleryCards.forEach((card) => {
    card.classList.remove("is-active", "is-dimmed");
  });
}

galleryCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    e.stopPropagation();

    const isActive = card.classList.contains("is-active");

    resetGallery();

    if (!isActive) {
      card.classList.add("is-active");

      galleryCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.add("is-dimmed");
        }
      });
    }
  });
});

gallery.addEventListener("click", () => {
  resetGallery();
});

// QUIZ

// QUIZ
function renderQuiz() {
  if (!quizForm) return;

  const letters = ["A", "B", "C", "D"];
  quizForm.innerHTML = "";

  quizQuetions.forEach((question) => {

    const options = question.options.map((option, i) => {
      const letter = letters[i];

      const isCorrect =
        letter === question.correct
          ? 'data-correct="true"'
          : "";

      const labelMarkup = `
        <label>
          <input
            type="radio"
            name="q${question.number}"
            value="${letter}"
            ${isCorrect}
          />
          ${letter}. ${option}
        </label>
      `;

      return labelMarkup;
    });

    // Combine all four labels into one string
    const optionsHTML = options.join("");

    // Create the fieldset
    const questionMarkup = `
      <fieldset class="questions__form--question">
        <legend>
          ${question.number}. ${question.question}
        </legend>

        ${optionsHTML}
      </fieldset>
    `;

    // Insert the question into the form
    quizForm.insertAdjacentHTML("beforeend", questionMarkup);
  });
  quizForm.insertAdjacentHTML(
    "beforeend",
    `
      <button type="submit" class="questions__form--submit">
        Submit Answers
      </button>
    `
  );
}

renderQuiz();
initQuizResults();

// Load pages
function smoothScroll() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
}

[navQuizBtn, startQuizBtn].forEach((btn) => {
  btn.addEventListener('click', (e) => {

      e.preventDefault();

      allHomePages.forEach((pg) => {
        pg.hidden = true;
      });

        resultsPage.hidden = true;
        questionsPage.hidden = false;

        smoothScroll();

  });
});

[exitQuizBtn, exitResultsBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    // questionsPage.hidden = true;
    // resultsPage.hidden = true;

    // allHomePages.forEach((pg) => {
    //   pg.hidden = false;
    // });

    // smoothScroll();
    window.location.reload();
  });
});

// Revealing sections
const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hide");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll(".page");

// Just observe — don't add the hidden class here
allSections.forEach(function (section) {
  sectionObserver.observe(section);
});