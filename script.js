// Simple flashcards
// Default flashcards

//speed 
let interval = 500; // initial speed in ms
let simulation;

const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speed-value');

function startSimulation() {
  if(simulation) clearInterval(simulation);
  simulation = setInterval(updateGrid, interval);
}

speedSlider.addEventListener('input', () => {
  interval = parseInt(speedSlider.value);
  speedValue.textContent = interval + " ms";
  startSimulation(); // restart simulation with new speed
});

// Start initially
startSimulation();






let flashcards = [
  { question: "Newton's 2nd Law?", answer: "F = ma" },
  { question: "Speed of light?", answer: "3×10^8 m/s" },
  { question: "Planck's constant?", answer: "6.626×10^-34 Js" }
];

// Load saved flashcards from localStorage
const savedCards = JSON.parse(localStorage.getItem('userFlashcards'));
if(savedCards) flashcards = flashcards.concat(savedCards);

const container = document.getElementById("flashcard-container");
const form = document.getElementById("flashcard-form");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");

// Function to create a card element
function createCard(cardData) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<div class="front">${cardData.question}</div>
                    <div class="back">${cardData.answer}</div>`;
  
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  container.appendChild(card);
}

// Render all flashcards
flashcards.forEach(c => createCard(c));

// Handle new card creation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if(question && answer){
    const newCard = { question, answer };
    createCard(newCard);

    // Save to localStorage
    let userCards = JSON.parse(localStorage.getItem('userFlashcards')) || [];
    userCards.push(newCard);
    localStorage.setItem('userFlashcards', JSON.stringify(userCards));

    form.reset();
  }

  // Play Mode Variables
const playCard = document.getElementById("current-card");
const flipBtn = document.getElementById("flip-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");

let playIndex = 0;
let playDeck = [...flashcards]; // copy of flashcards for play mode

// Function to render current card
function renderPlayCard() {
  if(playDeck.length === 0){
    playCard.innerHTML = "<div class='front'>No cards available</div><div class='back'></div>";
    return;
  }

  const cardData = playDeck[playIndex];
  playCard.innerHTML = `<div class="front">${cardData.question}</div>
                        <div class="back">${cardData.answer}</div>`;
  playCard.classList.remove("flipped");
}

// Flip current play card
flipBtn.addEventListener("click", () => {
  playCard.classList.toggle("flipped");
});

// Next card
nextBtn.addEventListener("click", () => {
  playIndex = (playIndex + 1) % playDeck.length;
  renderPlayCard();
});

// Shuffle deck
shuffleBtn.addEventListener("click", () => {
  playDeck = [...flashcards];
  for (let i = playDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playDeck[i], playDeck[j]] = [playDeck[j], playDeck[i]];
  }
  playIndex = 0;
  renderPlayCard();
});

// Update playDeck whenever a new card is added
function updatePlayDeck(newCard){
  playDeck.push(newCard);
}

// Initial render
renderPlayCard();


if(question && answer){
  const newCard = { question, answer };
  createCard(newCard);

  // Save to localStorage
  let userCards = JSON.parse(localStorage.getItem('userFlashcards')) || [];
  userCards.push(newCard);
  localStorage.setItem('userFlashcards', JSON.stringify(userCards));

  // Add to playDeck
  updatePlayDeck(newCard);

  form.reset();
}


});
