const board = document.getElementById('board');
const statusText = document.getElementById('status');
let cells = Array(9).fill(null);
let current = "X";
let winningCombo = null;

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell' + (winningCombo && winningCombo.includes(i) ? ' win' : '');
    cell.textContent = val || "";
    cell.onclick = () => move(i);
    board.appendChild(cell);
  });
  if (!winningCombo) {
    statusText.textContent = `${current}'s turn`;
  }
}

function move(i) {
  if (!cells[i] && !winningCombo) {
    cells[i] = current;
    const result = checkWinner();
    if (result) {
      winningCombo = result.combo;
      statusText.textContent = `${result.winner} Wins!`;
    } else if (!cells.includes(null)) {
      statusText.textContent = "Draw!";
    } else {
      current = current === "X" ? "O" : "X";
      statusText.textContent = `${current}'s turn`;
    }
    drawBoard();
  }
}

function checkWinner() {
  const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let combo of combos) {
    const [a,b,c] = combo;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) return { winner: cells[a], combo };
  }
  return null;
}

function restart() {
  cells = Array(9).fill(null);
  statusText.textContent = "";
  current = "X";
  winningCombo = null;
  drawBoard();
}

drawBoard();
