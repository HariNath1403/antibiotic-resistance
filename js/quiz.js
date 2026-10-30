export const quizQuetions = [
    {
        number: 1,
        question: "What do antibiotics treat?",
        options: [
            "Bacterial infections", 
            "Viral infections", 
            "Fungal infections", 
            "All types of infections"
        ],
        correct: "A"
    }, 
     {
        number: 2,
        question: "What actually becomes resistant to antibiotics?",
        options: [
            "The human body", 
            "The immune system", 
            "Bacteria", 
            "The antibiotics themselves"
        ],
        correct: "C"
    }, 
     {
        number: 3,
        question: "What should you do if you have leftover antibiotics from a previous treatment?",
        options: [
            "Keep them for the next time you feel sick", 
            "Share them with someone who has similar symptoms", 
            "Return them to a pharmacy for safe disposal", 
            "Flush them down the toilet"
        ],
        correct: "C"
    }, 
     {
        number: 4,
        question: "You start feeling better before finishing your prescribed antibiotics. What should you do?",
        options: [
            "Stop immediately because the infection has gone", 
            "Double the next dose to finish sooner", 
            "Save the remaining tablets for another illness", 
            "Follow the prescribed directions and ask your healthcare professional before making changes"
        ],
        correct: "D"
    }, 
    {
        number: 5,
        question: "How can antibiotic-resistant bacteria spread between people?",
        options: [
            "Through contact, contaminated surfaces or poor hand hygiene", 
            "Only through taking antibiotics", 
            "Only through drinking untreated water", 
            "They cannot spread between people"
        ],
        correct: "A"
    }, 
    {
        number: 6,
        question: "Why can unnecessary antibiotic use contribute to antibiotic resistance?",
        options: [
            "It makes viruses stronger", 
            "It creates resistance in the human immune system", 
            "It gives resistant bacteria a survival advantage", 
            "It permanently weakens every antibiotic"
        ],
        correct: "C"
    }, 
    {
        number: 7,
        question: "Which statement about broad-spectrum antibiotics is most accurate?",
        options: [
            "They are always better than narrow-spectrum antibiotics", 
            "They act against a wider range of bacteria but should only be used when appropriate", 
            "They can treat both viruses and bacteria", 
            "They prevent all future antibiotic resistance"
        ],
        correct: "B"
    }, 
    {
        number: 8,
        question: "Why does antibiotic resistance make some medical procedures riskier?",
        options: [
            "It prevents anaesthetic medicines from working", 
            "It stops the body from producing white blood cells", 
            "It makes all surgical wounds become infected", 
            "It can make infections associated with surgery, chemotherapy or transplantation harder to prevent or treat"
        ],
        correct: "D"
    }, 
    {
        number: 9,
        question: "Why can antibiotic resistance increase in a bacterial population even when antibiotics do not directly cause resistance mutations?",
        options: [
            "Antibiotics encourage bacteria to deliberately change their DNA.", 
            "Antibiotics allow resistant bacteria to survive and multiply while susceptible bacteria are eliminated.", 
            "Antibiotics permanently alter the human immune system.", 
            "Antibiotics prevent bacteria from transferring resistance genes."
        ],
        correct: "B"
    }, 
    {
        number: 10,
        question: "How can some bacteria prevent an antibiotic from working effectively?",
        options: [
            "By increasing the body's ability to eliminate the antibiotic.", 
            "By producing enzymes that break down or inactivate the antibiotic.", 
            "By converting the antibiotic into neurotransmitters.", 
            "By preventing the patient's immune system from recognising the antibiotic."
        ],
        correct: "B"
    },
]


export function initQuizResults() {
  const quizForm = document.querySelector("#quiz-form");
  const questionsPage = document.querySelector("#questionspg");
  const resultsPage = document.querySelector("#resultspg");

  if (!quizForm || !questionsPage || !resultsPage) return;

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let score = 0;

    // Calculate the score
    quizQuetions.forEach((question) => {
      const selected = quizForm.querySelector(
        `input[name="q${question.number}"]:checked`
      );

      if (selected?.value === question.correct) {
        score++;
      }
    });

    const total = 10;
    const percentage = Math.round((score / total) * 100);

    // Update the score and percentage
    document.querySelector("#score").textContent = score;
    document.querySelector("#total").textContent = '/ 10';
    document.querySelector("#percentage").textContent = `${percentage}%`;

    // Update the progress bar
    const progress = document.querySelector(
      ".results__score--progress"
    );

    const progressFill = document.querySelector(
      ".results__score--progress--fill"
    );

    progressFill.style.width = `${percentage}%`;
    progress.setAttribute("aria-valuenow", percentage);

    // Update feedback message
    const feedback = document.querySelector(".results__score--desc");

    if (percentage === 100) {
      feedback.textContent =
        "Excellent! You're an antibiotic resistance champion!";
    } else if (percentage >= 80) {
      feedback.textContent =
        "Great work! You have a strong understanding of antibiotic resistance.";
    } else if (percentage >= 50) {
      feedback.textContent =
        "Good effort! Keep learning about antibiotic resistance.";
    } else {
      feedback.textContent =
        "Keep learning! Every small step helps fight antibiotic resistance.";
    }

    // Switch pages
    questionsPage.hidden = true;
    resultsPage.hidden = false;

    // Scroll to the top of the results page
    resultsPage.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  // Reset quiz when returning home
  document.querySelector(".results__exit--btn")
    ?.addEventListener("click", () => {
      quizForm.reset();
      questionsPage.hidden = false;
      resultsPage.hidden = true;
    });
}
