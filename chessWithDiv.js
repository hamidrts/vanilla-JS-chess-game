let boardElm = document.getElementById("board");
let messageElm = document.getElementById("message");
let choosedCellX;
let choosedCelly;
let playerTurn = "white";
let replayArray = [];

let gameOver = false;
let deletedArray = [];

window.onload = function () {
  setStartBoard();
  renderBoard();
  boardElm.addEventListener("mousedown", cellPositionForChoose);
};

let board = createBoard();

class Soldier {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "soldier";
    this.symbol = { white: "&#9817", black: "&#9823" };<Piece
    id="hamid"
    piece={cell.resident === 0 ? "" : cell.resident.symbol}
  />
  }
  movementArrayF(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (this.color === "black") {
      if (x === 6) {
        if (board[x - 1][y].resident === 0) {
          movementArray.push([x - 1, y]);
        }
        if (board[x - 2][y].resident === 0) {
          movementArray.push([x - 2, y]);
        }
      } else {
        if (board[x - 1][y].resident === 0) {
          movementArray.push([x - 1, y]);
        }
      }
      if (y >= 1) {
        if (board[x - 1][y - 1].resident.color === "white") {
          attackArray.push([x - 1, y - 1]);
        }
      }
      if (y < 7) {
        if (board[x - 1][y + 1].resident.color === "white") {
          attackArray.push([x - 1, y + 1]);
        }
      }
    } else if (this.color === "white") {
      if (x === 1) {
        if (board[x + 1][y].resident === 0) {
          movementArray.push([x + 1, y]);
        }
        if (board[x + 2][y].resident === 0) {
          movementArray.push([x + 2, y]);
        }
      } else {
        if (board[x + 1][y].resident === 0) {
          movementArray.push([x + 1, y]);
        }
      }
      if (y >= 1) {
        if (board[x + 1][y - 1].resident.color === "black") {
          attackArray.push([x + 1, y - 1]);
        }
      }
      if (y < 7) {
        if (board[x + 1][y + 1].resident.color === "black") {
          attackArray.push([x + 1, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

class King {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "king";
    this.symbol = { white: "&#9812", black: "&#9818" };
  }
  movementArrayF(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (y - 1 >= 0) {
      if (board[x][y - 1].resident === 0) {
        movementArray.push([x, y - 1]);
      } else {
        if (board[x][y - 1].resident.color !== this.color) {
          attackArray.push([x, y - 1]);
        }
      }
    }
    if (y + 1 < 8) {
      if (board[x][y + 1].resident === 0) {
        movementArray.push([x, y + 1]);
      } else {
        if (board[x][y + 1].resident.color !== this.color) {
          attackArray.push([x, y + 1]);
        }
      }
    }
    if (x + 1 < 8) {
      if (board[x + 1][y].resident === 0) {
        movementArray.push([x + 1, y]);
      } else {
        if (board[x + 1][y].resident.color !== this.color) {
          attackArray.push([x + 1, y]);
        }
      }
    }
    if (x - 1 >= 0) {
      if (board[x - 1][y].resident === 0) {
        movementArray.push([x - 1, y]);
      } else {
        if (board[x - 1][y].resident.color !== this.color) {
          attackArray.push([x - 1, y]);
        }
      }
    }
    if (y - 1 >= 0 && x + 1 < 8) {
      if (board[x + 1][y - 1].resident === 0) {
        movementArray.push([x + 1, y - 1]);
      } else {
        if (board[x + 1][y - 1].resident.color !== this.color) {
          attackArray.push([x + 1, y - 1]);
        }
      }
    }
    if (y + 1 < 8 && x + 1 < 8) {
      if (board[x + 1][y + 1].resident === 0) {
        movementArray.push([x + 1, y + 1]);
      } else {
        if (board[x + 1][y + 1].resident.color !== this.color) {
          attackArray.push([x + 1, y + 1]);
        }
      }
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (board[x - 1][y - 1].resident === 0) {
        movementArray.push([x - 1, y - 1]);
      } else {
        if (board[x - 1][y - 1].resident.color !== this.color) {
          attackArray.push([x - 1, y - 1]);
        }
      }
    }
    if (y + 1 < 8 && x - 1 >= 0) {
      if (board[x - 1][y + 1].resident === 0) {
        movementArray.push([x - 1, y + 1]);
      } else {
        if (board[x - 1][y + 1].resident.color !== this.color) {
          attackArray.push([x - 1, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

class Queen {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "queen";
    this.symbol = { white: "&#9813", black: "&#9819" };
  }
  movementArrayF(x, y) {
    let straightMove = straightMovment(x, y, this.color);
    let diagnalMove = diagnalMovment(x, y, this.color);
    let totalMove = {
      movementArray: straightMove.movementArray.concat(
        diagnalMove.movementArray
      ),
      attackArray: straightMove.attackArray.concat(diagnalMove.attackArray),
    };
    return totalMove;
  }
}

class Bishop {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "bishop";
    this.symbol = { white: "&#9815", black: "&#9821" };
  }
  movementArrayF(x, y) {
    let diagnalMove = diagnalMovment(x, y, this.color);

    return diagnalMove;
  }
}

class Rook {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "rook";
    this.symbol = { white: "&#9814", black: "&#9820" };
  }
  movementArrayF(x, y) {
    let straightMove = straightMovment(x, y, this.color);
    return straightMove;
  }
}

class Horse {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "horse";
    this.symbol = { white: "	&#9816", black: "&#9822" };
  }
  movementArrayF(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (x + 1 < 8 && y + 2 < 8) {
      if (board[x + 1][y + 2].resident === 0) {
        movementArray.push([x + 1, y + 2]);
      } else {
        if (board[x + 1][y + 2].resident.color !== this.color) {
          attackArray.push([x + 1, y + 2]);
        }
      }
    }
    if (x + 1 < 8 && y - 2 >= 0) {
      if (board[x + 1][y - 2].resident === 0) {
        movementArray.push([x + 1, y - 2]);
      } else {
        if (board[x + 1][y - 2].resident.color !== this.color) {
          attackArray.push([x + 1, y - 2]);
        }
      }
    }
    if (x - 1 >= 0 && y - 2 >= 0) {
      if (board[x - 1][y - 2].resident === 0) {
        movementArray.push([x - 1, y - 2]);
      } else {
        if (board[x - 1][y - 2].resident.color !== this.color) {
          attackArray.push([x - 1, y - 2]);
        }
      }
    }
    if (x - 1 >= 0 && y + 2 < 8) {
      if (board[x - 1][y + 2].resident === 0) {
        movementArray.push([x - 1, y + 2]);
      } else {
        if (board[x - 1][y + 2].resident.color !== this.color) {
          attackArray.push([x - 1, y + 2]);
        }
      }
    }
    if (x + 2 < 8 && y - 1 >= 0) {
      if (board[x + 2][y - 1].resident === 0) {
        movementArray.push([x + 2, y - 1]);
      } else {
        if (board[x + 2][y - 1].resident.color !== this.color) {
          attackArray.push([x + 2, y - 1]);
        }
      }
    }
    if (x + 2 < 8 && y + 1 < 8) {
      if (board[x + 2][y + 1].resident === 0) {
        movementArray.push([x + 2, y + 1]);
      } else {
        if (board[x + 2][y + 1].resident.color !== this.color) {
          attackArray.push([x + 2, y + 1]);
        }
      }
    }
    if (x - 2 >= 0 && y - 1 >= 0) {
      if (board[x - 2][y - 1].resident === 0) {
        movementArray.push([x - 2, y - 1]);
      } else {
        if (board[x - 2][y - 1].resident.color !== this.color) {
          attackArray.push([x - 2, y - 1]);
        }
      }
    }
    if (x - 2 >= 0 && y + 1 < 8) {
      if (board[x - 2][y + 1].resident === 0) {
        movementArray.push([x - 2, y + 1]);
      } else {
        if (board[x - 2][y + 1].resident.color !== this.color) {
          attackArray.push([x - 2, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

let soldierB1 = new Soldier("black", "soldierB1");
let soldierB2 = new Soldier("black", "soldierB2");
let soldierB3 = new Soldier("black", "soldierB3");
let soldierB4 = new Soldier("black", "soldierB4");
let soldierB5 = new Soldier("black", "soldierB5");
let soldierB6 = new Soldier("black", "soldierB6");
let soldierB7 = new Soldier("black", "soldierB7");
let soldierB8 = new Soldier("black", "soldierB8");

let queenB = new Queen("black", "queenB");
let kingB = new King("black", "kingB");
let bishopB1 = new Bishop("black", "bishopB1");
let bishopB2 = new Bishop("black", "bishopB2");
let rookB1 = new Rook("black", "rookB1");
let rookB2 = new Rook("black", "rookB2");
let horseB1 = new Horse("black", "horseB1");
let horseB2 = new Horse("black", "horseB2");

let soldierW1 = new Soldier("white", "soldierW1");
let soldierW2 = new Soldier("white", "soldierW2");
let soldierW3 = new Soldier("white", "soldierW3");
let soldierW4 = new Soldier("white", "soldierW4");
let soldierW5 = new Soldier("white", "soldierW5");
let soldierW6 = new Soldier("white", "soldierW6");
let soldierW7 = new Soldier("white", "soldierW7");
let soldierW8 = new Soldier("white", "soldierW8");

let queenW = new Queen("white", "queenW");
let kingW = new King("white", "kingW");
let bishopW1 = new Bishop("white", "bishopW1");
let bishopW2 = new Bishop("white", "bishopW2");
let rookW1 = new Rook("white", "rookW1");
let rookW2 = new Rook("white", "rookW2");
let horseW1 = new Horse("white", "horseW1");
let horseW2 = new Horse("white", "horseW2");

function straightMovment(x, y, color) {
  let movementArray = [];
  let attackArray = [];
  for (let i = x + 1; i < 8; i++) {
    let cell = [i, y];
    if (board[i][y].resident !== 0) {
      if (board[i][y].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  for (let i = x - 1; i >= 0; i--) {
    let cell = [i, y];
    if (board[i][y].resident !== 0) {
      if (board[i][y].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  for (let i = y + 1; i < 8; i++) {
    let cell = [x, i];
    if (board[x][i].resident !== 0) {
      if (board[x][i].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  for (let i = y - 1; i >= 0; i--) {
    let cell = [x, i];
    if (board[x][i].resident !== 0) {
      if (board[x][i].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  return { movementArray: movementArray, attackArray: attackArray };
}

function diagnalMovment(x, y, color) {
  let movementArray = [];
  let attackArray = [];
  for (let i = 1; i < 8; i++) {
    if (x + i < 8 && y + i < 8) {
      let cell = [x + i, y + i];
      if (board[x + i][y + i].resident !== 0) {
        if (board[x + i][y + i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }
  for (let i = 1; i < 8; i++) {
    if (x + i < 8 && y - i >= 0) {
      let cell = [x + i, y - i];
      if (board[x + i][y - i].resident !== 0) {
        if (board[x + i][y - i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }
  for (let i = 1; i < 8; i++) {
    if (x - i >= 0 && y - i >= 0) {
      let cell = [x - i, y - i];
      if (board[x - i][y - i].resident !== 0) {
        if (board[x - i][y - i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }
  for (let i = 1; i < 8; i++) {
    if (x - i >= 0 && y + i < 8) {
      let cell = [x - i, y + i];
      if (board[x - i][y + i].resident !== 0) {
        if (board[x - i][y + i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }

  return { movementArray: movementArray, attackArray: attackArray };
}

function createBoard() {
  let boardArray = [];
  for (let i = 1; i < 9; i++) {
    let row = [];
    for (let j = 1; j < 9; j++) {
      let cellObject = {};
      cellObject.x = i;
      cellObject.y = j;
      if ((i % 2 !== 0 && j % 2 !== 0) || (i % 2 === 0 && j % 2 === 0)) {
        cellObject.color = "gray";
      }
      if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) {
        cellObject.color = "white";
      }
      cellObject.resident = 0;
      cellObject.movement = false;
      cellObject.attack = false;
      cellObject.kish = false;
      row.push(cellObject);
    }
    boardArray.push(row);
  }
  return boardArray;
}

function setStartBoard() {
  board[0][0].resident = rookW1;
  board[0][1].resident = horseW1;
  board[0][2].resident = bishopW1;
  board[0][3].resident = queenW;
  board[0][4].resident = kingW;
  board[0][5].resident = bishopW2;
  board[0][6].resident = horseW2;
  board[0][7].resident = rookW2;
  board[1][0].resident = soldierW1;
  board[1][1].resident = soldierW2;
  board[1][2].resident = soldierW3;
  board[1][3].resident = soldierW4;
  board[1][4].resident = soldierW5;
  board[1][5].resident = soldierW6;
  board[1][6].resident = soldierW7;
  board[1][7].resident = soldierW8;

  board[7][0].resident = rookB1;
  board[7][1].resident = horseB1;
  board[7][2].resident = bishopB1;
  board[7][3].resident = queenB;
  board[7][4].resident = kingB;
  board[7][5].resident = bishopB2;
  board[7][6].resident = horseB2;
  board[7][7].resident = rookB2;
  board[6][0].resident = soldierB1;
  board[6][1].resident = soldierB2;
  board[6][2].resident = soldierB3;
  board[6][3].resident = soldierB4;
  board[6][4].resident = soldierB5;
  board[6][5].resident = soldierB6;
  board[6][6].resident = soldierB7;
  board[6][7].resident = soldierB8;
}

function renderBoard() {
  boardElm.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    let row = document.createElement("div");
    row.setAttribute("id", i * 100 + 100);
    row.setAttribute("class", "row");
    document.getElementById("board").appendChild(row);
    for (let j = 0; j < 8; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", i * 8 + j);
      cell.setAttribute("class", "cell");
      cell.style.background = board[i][j].color;
      document.getElementById(i * 100 + 100).appendChild(cell);
      if (board[i][j].attack === 1) {
        cell.style.boxShadow =
          "20px 20px 10px rgba(128, 0, 0, .15) inset ,-20px -20px 10px rgba(128, 0, 0, .15) inset ";
        cell.style.background = "rgba(128, 0, 0, .15)";
      }
      if (board[i][j].movement === 1) {
        cell.style.boxShadow =
          "20px 20px 10px rgba(0, 128, 0, .15) inset ,-20px -20px 10px rgba(0, 128, 0, .15) inset ";
      }
      if (board[i][j].kish === true) {
        cell.style.background = "rgba(128, 0, 0, .15)";
      }
      if (
        board[i][j].resident.type === "soldier" &&
        board[i][j].resident.color === "black"
      ) {
        cell.innerHTML = "&#9823";
      }
      if (
        board[i][j].resident.type === "soldier" &&
        board[i][j].resident.color === "white"
      ) {
        cell.innerHTML = "&#9817";
      }
      if (
        board[i][j].resident.type === "queen" &&
        board[i][j].resident.color === "white"
      ) {
        cell.innerHTML = "&#9813";
      }
      if (
        board[i][j].resident.type === "queen" &&
        board[i][j].resident.color === "black"
      ) {
        cell.innerHTML = "&#9819";
      }
      if (
        board[i][j].resident.type === "king" &&
        board[i][j].resident.color === "white"
      ) {
        cell.innerHTML = "&#9812";
      }
      if (
        board[i][j].resident.type === "king" &&
        board[i][j].resident.color === "black"
      ) {
        cell.innerHTML = "&#9818";
      }
      if (
        board[i][j].resident.type === "rook" &&
        board[i][j].resident.color === "white"
      ) {
        cell.innerHTML = "&#9814";
      }
      if (
        board[i][j].resident.type === "rook" &&
        board[i][j].resident.color === "black"
      ) {
        cell.innerHTML = "&#9820";
      }
      if (
        board[i][j].resident.type === "bishop" &&
        board[i][j].resident.color === "white"
      ) {
        cell.innerHTML = "&#9815";
      }
      if (
        board[i][j].resident.type === "bishop" &&
        board[i][j].resident.color === "black"
      ) {
        cell.innerHTML = "&#9821";
      }
      if (
        board[i][j].resident.type === "horse" &&
        board[i][j].resident.color === "white"
      ) {
        cell.innerHTML = "&#9816";
      }
      if (
        board[i][j].resident.type === "horse" &&
        board[i][j].resident.color === "black"
      ) {
        cell.innerHTML = "&#9822";
      }
    }
  }
}

function cellPositionForChoose(evt) {
  choosedCellX = Math.floor(evt.target.id / 8);
  choosedCelly = evt.target.id - 8 * choosedCellX;
  if (board[choosedCellX][choosedCelly].resident.color === playerTurn) {
    let attackArray = board[choosedCellX][choosedCelly].resident.movementArrayF(
      choosedCellX,
      choosedCelly
    ).attackArray;
    let movementArray = board[choosedCellX][
      choosedCelly
    ].resident.movementArrayF(choosedCellX, choosedCelly).movementArray;
    attackArray.forEach((element) => {
      board[element[0]][element[1]].attack = 1;
    });
    movementArray.forEach((element) => {
      board[element[0]][element[1]].movement = 1;
    });
    renderBoard();
    boardElm.removeEventListener("mousedown", cellPositionForChoose);
    boardElm.addEventListener("mousedown", placePiece);
  }
}

function placePiece(evt) {
  let cellX = Math.floor(evt.target.id / 8);
  let cellY = evt.target.id - 8 * cellX;
  if (board[cellX][cellY].movement === 1 || board[cellX][cellY].attack === 1) {
    var deletePies = board[cellX][cellY].resident;
    board[cellX][cellY].resident = board[choosedCellX][choosedCelly].resident;
    board[choosedCellX][choosedCelly].resident = 0;
    if (checkKish()) {
      board[choosedCellX][choosedCelly].resident = board[cellX][cellY].resident;
      board[cellX][cellY].resident = deletePies;
      boardElm.addEventListener("mousedown", cellPositionForChoose);
      checkKish();
      clearMoveAttackCell();
      renderBoard();
      messageElm.innerHTML = "You can not move this because you would be kish!";
    } else {
      if (deletePies !== 0) {
        deletedArray.push(deletePies);
        deletePies = 0;
      }
      saveMoveForReplay(cellX, cellY);
      changePlayerTurn();
      if (checkKish()) {
        messageElm.innerHTML = "Kish!";
        let test = checkCheckmate();
        if (test === true) {
          gameOver = true;
        }
      }
      clearMoveAttackCell();
      renderBoard();
      boardElm.addEventListener("mousedown", cellPositionForChoose);
    }
  } else {
    boardElm.addEventListener("mousedown", cellPositionForChoose);
    clearMoveAttackCell();
    renderBoard();
    messageElm.innerHTML = "You dont have this move!";
  }
}

function clearMoveAttackCell() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j].attack = 0;
      board[i][j].movement = 0;
    }
  }
}

function checkKish() {
  var kish = false;
  if (playerTurn === "white") {
    var attacker = "black";
  } else {
    var attacker = "white";
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].resident.color === attacker) {
        let attackCells = board[i][j].resident.movementArrayF(i, j).attackArray;
        attackCells.forEach((element) => {
          if (board[element[0]][element[1]].resident.type === "king") {
            kish = true;
            board[element[0]][element[1]].kish = true;
          }
        });
      }
    }
  }
  if (kish === false) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board[i][j].kish = false;
      }
    }
  }

  return kish;
}

function changePlayerTurn() {
  if (playerTurn === "white") {
    playerTurn = "black";
  } else {
    playerTurn = "white";
  }
}

function checkCheckmate() {
  var mate = true;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].resident.color === playerTurn) {
        var moveArray = board[i][j].resident.movementArrayF(i, j).movementArray;
        var attackArray = board[i][j].resident.movementArrayF(i, j).attackArray;
        moveArray.forEach((element) => {
          board[element[0]][element[1]].resident = board[i][j].resident;
          board[i][j].resident = 0;
          var ifKish = checkKish();
          if (ifKish !== true) {
            mate = false;
          }
          board[i][j].resident = board[element[0]][element[1]].resident;
          board[element[0]][element[1]].resident = 0;
        });
        if (mate === false) {
          break;
        } else {
          attackArray.forEach((element) => {
            var deletPiece = board[element[0]][element[1]].resident;
            board[element[0]][element[1]].resident = board[i][j].resident;
            board[i][j].resident = 0;
            var ifKish = checkKish();
            if (ifKish !== true) {
              mate = false;
            }
            board[i][j].resident = board[element[0]][element[1]].resident;
            board[element[0]][element[1]].resident = deletPiece;
          });
          if (mate === false) {
            break;
          }
        }
      }
    }
  }
  return mate;
}

function saveMoveForReplay(x, y) {
  let move = { firstCell: [choosedCellX, choosedCelly], secondCell: [x, y] };
  replayArray.push(move);
}

function playReplay() {
  board = createBoard();

  setStartBoard();
  renderBoard();

  let i = 0;
  slowmotionPlay();
  function slowmotionPlay() {
    console.log(i);
    if (i < replayArray.length) {
      board[replayArray[i].secondCell[0]][
        replayArray[i].secondCell[1]
      ].resident =
        board[replayArray[i].firstCell[0]][
          replayArray[i].firstCell[1]
        ].resident;
      board[replayArray[i].firstCell[0]][
        replayArray[i].firstCell[1]
      ].resident = 0;
      i = i + 1;
      renderBoard();
      setTimeout(slowmotionPlay, 2000);
    }
  }
}
