// script.js

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (gameBoard[index] === '' && gameActive && (currentPlayer === 'X' || currentPlayer === 'O')) {
    gameBoard[index] = 'X';
    e.target.textContent = 'X';

    if (checkWinner()) {
      alert(`X gagne !`);
      gameActive = false;
    } else if (isBoardFull()) {
      alert('Match nul !');
      gameActive = false;
    } else {
      currentPlayer = 'O';

      if (gameActive) {
        setTimeout(makeAIMove, 500);
      }
    }
  }
}


function makeAIMove() {
  const emptyCells = gameBoard.reduce((acc, val, index) => (val === '' ? acc.concat(index) : acc), []);

  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWinner()) {
      alert(`${currentPlayer} gagne !`);
      gameActive = false;
    } else if (isBoardFull()) {
      alert('Match nul !');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // Réactive les écouteurs d'événements après que l'IA ait joué
  cells.forEach(cell => cell.style.cursor = 'pointer');
  setTimeout(() => {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  }, 500);
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  return !gameBoard.includes('');
}

function startGame(difficulty) {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');

  currentPlayer = 'X';
  gameActive = true;

  if (difficulty === 'difficult') {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    cells.forEach(cell => cell.style.cursor = 'not-allowed');
    playAgainstAIDifficult();
  } else {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    cells.forEach(cell => cell.style.cursor = 'pointer');
  }
}


function playAgainstAIDifficult() {
  currentPlayer = 'X';
  const aiPlayer = 'O';

  cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
    cell.style.cursor = 'not-allowed';
  });

  function makeAIMove() {
    const emptyCells = gameBoard.reduce((acc, val, index) => (val === '' ? acc.concat(index) : acc), []);

    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      gameBoard[randomIndex] = aiPlayer;
      cells[randomIndex].textContent = aiPlayer;

      if (checkWinner()) {
        alert(`${aiPlayer} gagne !`);
        gameActive = false;
      } else if (isBoardFull()) {
        alert('Match nul !');
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // Réactive les écouteurs d'événements après que l'IA ait joué
        cells.forEach(cell => {
          cell.style.cursor = 'pointer';
          cell.addEventListener('click', handleCellClick);
        });
      }
    }
  }

  makeAIMove();
}


