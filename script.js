const cardsArray = ['🍇','🍈','🍉','🍊','🍋','🍋‍🟩','🍎','🍍'];
let gameBoard = document.getElementById('game-board');
let movesDisplay = document.getElementById('moves');
let resetBtn = document.getElementById('reset-btn');

let cards =[];
let flippedCards = [];
let matchedCards = [];
let moves = 0;

function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function createBoard() {
    moves = 0;
    movesDisplay.textContnt = `Moves: ${moves}`;
    flippedCards = [];
    matchedCards = [];
    gameBoard.innerHTML = '';

    cards = shuffle([...cardsArray, ...cardsArray]);

    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.textContent = emoji;
        card.style.color = 'transparent';

        card.addEventListener('click', () => flipCard(card));

        gameBoard.appendChild(card);
    });
}

let lockBoard = false;

function flipCard(card) {
    if (
        flippedCards.length ===2 ||
        flippedCards.includes(card) ||
        matchedCards.includes(card)
    ) {
        return;
    }

    card.style.color = '#222';
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert(`you won in ${moves} moves!`),300);
        }
    } else {
        lockBoard = true;


        setTimeout(() => {
            flippedCards.forEach(card => {
                card.style.color = 'transparent';
                card.classList.remove('flipped');
            });
            flippedCards = [];
        }, 1000);
    }
}

resetBtn.addEventListener('click', createBoard);

window.onload = createBoard;