//x:row
//y:colum
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let mousePos;
let movedPice = {};
let stopMovePlayer = false;
let playerTurn = "white";
let kish = false;
let board = createBoard();
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
      cellObject.residentColor = 0;
      cellObject.residentType = 0;
      cellObject.movement = 0;
      cellObject.attack = 0;
      cellObject.kish = false;
      row.push(cellObject);
    }
    boardArray.push(row);
  }
  boardArray[0][0].residentColor = "white";
  boardArray[0][0].residentType = "rook";
  boardArray[0][1].residentColor = "white";
  boardArray[0][1].residentType = "horse";
  boardArray[0][2].residentColor = "white";
  boardArray[0][2].residentType = "bishop";
  boardArray[0][3].residentColor = "white";
  boardArray[0][3].residentType = "queen";
  boardArray[0][4].residentColor = "white";
  boardArray[0][4].residentType = "king";
  boardArray[0][5].residentColor = "white";
  boardArray[0][5].residentType = "bishop";
  boardArray[0][6].residentColor = "white";
  boardArray[0][6].residentType = "horse";
  boardArray[0][7].residentColor = "white";
  boardArray[0][7].residentType = "rook";
  boardArray[1][0].residentColor = "white";
  boardArray[1][0].residentType = "soldier";
  boardArray[1][1].residentColor = "white";
  boardArray[1][1].residentType = "soldier";
  boardArray[1][2].residentColor = "white";
  boardArray[1][2].residentType = "soldier";
  boardArray[1][3].residentColor = "white";
  boardArray[1][3].residentType = "soldier";
  boardArray[1][4].residentColor = "white";
  boardArray[1][4].residentType = "soldier";
  boardArray[1][5].residentColor = "white";
  boardArray[1][5].residentType = "soldier";
  boardArray[1][6].residentColor = "white";
  boardArray[1][6].residentType = "soldier";
  boardArray[1][7].residentColor = "white";
  boardArray[1][7].residentType = "soldier";

  boardArray[7][0].residentColor = "black";
  boardArray[7][0].residentType = "rook";
  boardArray[7][1].residentColor = "black";
  boardArray[7][1].residentType = "horse";
  boardArray[7][2].residentColor = "black";
  boardArray[7][2].residentType = "bishop";
  boardArray[7][3].residentColor = "black";
  boardArray[7][3].residentType = "queen";
  boardArray[7][4].residentColor = "black";
  boardArray[7][4].residentType = "king";
  boardArray[7][5].residentColor = "black";
  boardArray[7][5].residentType = "bishop";
  boardArray[7][6].residentColor = "black";
  boardArray[7][6].residentType = "horse";
  boardArray[7][7].residentColor = "black";
  boardArray[7][7].residentType = "rook";
  boardArray[6][0].residentColor = "black";
  boardArray[6][0].residentType = "soldier";
  boardArray[6][1].residentColor = "black";
  boardArray[6][1].residentType = "soldier";
  boardArray[6][2].residentColor = "black";
  boardArray[6][2].residentType = "soldier";
  boardArray[6][3].residentColor = "black";
  boardArray[6][3].residentType = "soldier";
  boardArray[6][4].residentColor = "black";
  boardArray[6][4].residentType = "soldier";
  boardArray[6][5].residentColor = "black";
  boardArray[6][5].residentType = "soldier";
  boardArray[6][6].residentColor = "black";
  boardArray[6][6].residentType = "soldier";
  boardArray[6][7].residentColor = "black";
  boardArray[6][7].residentType = "soldier";
  return boardArray;
}

function renderBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      ctx.fillStyle = board[i][j].color;
      ctx.fillRect(j * 100, i * 100, 100, 100);
      ctx.beginPath();
      ctx.rect(j * 100, i * 100, 100, 100);
      ctx.stroke();
      if (board[i][j].attack === 1) {
        ctx.fillStyle = "rgba(128, 0, 0, .15)";
        ctx.fillRect(j * 100, i * 100, 100, 100);
      }
      if (board[i][j].movement === 1) {
        ctx.fillStyle = "rgba(0, 128, 0, .15)";
        ctx.fillRect(j * 100, i * 100, 100, 100);
      }
      if (board[i][j].kish === true) {
        ctx.fillStyle = "rgba(128, 0, 0, .15)";
        ctx.fillRect(j * 100, i * 100, 100, 100);
      }
    }
  }
}
window.onload = function () {
  renderBoard();
  renderPlayer();
  canvas.addEventListener("mousedown", mouseCordinationForClick);
};

class Soldier {
  constructor(x, y, color, stat) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stat = stat;
    this.type = "soldier";
    this.picked = false;
    this.dX = this.x * 100 + 30;
    this.dY = this.y * 100 + 30;
  }
  movementArrayF() {
    let attackArray = [];
    let movementArray = [];
    if (this.color === "black") {
      if (this.x === 6) {
        if (board[this.x - 1][this.y].residentType === 0) {
          movementArray.push([this.x - 1, this.y]);
        }
        if (board[this.x - 2][this.y].residentType === 0) {
          movementArray.push([this.x - 2, this.y]);
        }
      } else {
        if (board[this.x - 1][this.y].residentType === 0) {
          movementArray.push([this.x - 1, this.y]);
        }
      }
      if (this.y >= 1) {
        if (board[this.x - 1][this.y - 1].residentColor === "white") {
          attackArray.push([this.x - 1, this.y - 1]);
        }
      }
      if (this.y < 7) {
        if (board[this.x - 1][this.y + 1].residentColor === "white") {
          attackArray.push([this.x - 1, this.y + 1]);
        }
      }
    } else if (this.color === "white") {
      if (this.x === 1) {
        if (board[this.x + 1][this.y].residentType === 0) {
          movementArray.push([this.x + 1, this.y]);
        }
        if (board[this.x + 2][this.y].residentType === 0) {
          movementArray.push([this.x + 2, this.y]);
        }
      } else {
        if (board[this.x + 1][this.y].residentType === 0) {
          movementArray.push([this.x + 1, this.y]);
        }
      }
      if (this.y >= 1) {
        if (board[this.x + 1][this.y - 1].residentColor === "black") {
          attackArray.push([this.x + 1, this.y - 1]);
        }
      }
      if (this.y < 7) {
        if (board[this.x + 1][this.y + 1].residentColor === "black") {
          attackArray.push([this.x + 1, this.y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

class King {
  constructor(x, y, color, stat) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stat = stat;
    this.type = "king";
    this.picked = false;
    this.dX = this.x * 100 + 30;
    this.dY = this.y * 100 + 30;
  }
  movementArrayF() {
    let attackArray = [];
    let movementArray = [];
    if (this.y - 1 >= 0) {
      if (board[this.x][this.y - 1].residentType === 0) {
        movementArray.push([this.x, this.y - 1]);
      } else {
        if (board[this.x][this.y - 1].residentColor !== this.color) {
          attackArray.push([this.x, this.y - 1]);
        }
      }
    }
    if (this.y + 1 < 8) {
      if (board[this.x][this.y + 1].residentType === 0) {
        movementArray.push([this.x, this.y + 1]);
      } else {
        if (board[this.x][this.y + 1].residentColor !== this.color) {
          attackArray.push([this.x, this.y + 1]);
        }
      }
    }
    if (this.x + 1 < 8) {
      if (board[this.x + 1][this.y].residentType === 0) {
        movementArray.push([this.x + 1, this.y]);
      } else {
        if (board[this.x + 1][this.y].residentColor !== this.color) {
          attackArray.push([this.x + 1, this.y]);
        }
      }
    }
    if (this.x - 1 >= 0) {
      if (board[this.x - 1][this.y].residentType === 0) {
        movementArray.push([this.x - 1, this.y]);
      } else {
        if (board[this.x - 1][this.y].residentColor !== this.color) {
          attackArray.push([this.x - 1, this.y]);
        }
      }
    }
    if (this.y - 1 >= 0 && this.x + 1 < 8) {
      if (board[this.x + 1][this.y - 1].residentType === 0) {
        movementArray.push([this.x + 1, this.y - 1]);
      } else {
        if (board[this.x + 1][this.y - 1].residentColor !== this.color) {
          attackArray.push([this.x + 1, this.y - 1]);
        }
      }
    }
    if (this.y + 1 < 8 && this.x + 1 < 8) {
      if (board[this.x + 1][this.y + 1].residentType === 0) {
        movementArray.push([this.x + 1, this.y + 1]);
      } else {
        if (board[this.x + 1][this.y + 1].residentColor !== this.color) {
          attackArray.push([this.x + 1, this.y + 1]);
        }
      }
    }
    if (this.y - 1 >= 0 && this.x - 1 >= 0) {
      if (board[this.x - 1][this.y - 1].residentType === 0) {
        movementArray.push([this.x - 1, this.y - 1]);
      } else {
        if (board[this.x - 1][this.y - 1].residentColor !== this.color) {
          attackArray.push([this.x - 1, this.y - 1]);
        }
      }
    }
    if (this.y + 1 < 8 && this.x - 1 >= 0) {
      if (board[this.x - 1][this.y + 1].residentType === 0) {
        movementArray.push([this.x - 1, this.y + 1]);
      } else {
        if (board[this.x - 1][this.y + 1].residentColor !== this.color) {
          attackArray.push([this.x - 1, this.y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

class Queen {
  constructor(x, y, color, stat) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stat = stat;
    this.type = "queen";
    this.picked = false;
    this.dX = this.x * 100 + 30;
    this.dY = this.y * 100 + 30;
  }
  movementArrayF() {
    let movementArray = [];
    let attackArray = [];
    for (let i = this.x + 1; i < 8; i++) {
      let cell = [i, this.y];
      if (board[i][this.y].residentType !== 0) {
        if (board[i][this.y].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    for (let i = this.x - 1; i >= 0; i--) {
      let cell = [i, this.y];
      if (board[i][this.y].residentType !== 0) {
        if (board[i][this.y].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    for (let i = this.y + 1; i < 8; i++) {
      let cell = [this.x, i];
      if (board[this.x][i].residentType !== 0) {
        if (board[this.x][i].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    for (let i = this.y - 1; i >= 0; i--) {
      let cell = [this.x, i];
      if (board[this.x][i].residentType !== 0) {
        if (board[this.x][i].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    for (let i = 1; i < 8; i++) {
      if (this.x + i < 8 && this.y + i < 8) {
        let cell = [this.x + i, this.y + i];
        if (board[this.x + i][this.y + i].residentType !== 0) {
          if (board[this.x + i][this.y + i].residentColor !== this.color) {
            attackArray.push(cell);
          }
          break;
        } else {
          movementArray.push(cell);
        }
      }
    }
    for (let i = 1; i < 8; i++) {
      if (this.x + i < 8 && this.y - i >= 0) {
        let cell = [this.x + i, this.y - i];
        if (board[this.x + i][this.y - i].residentType !== 0) {
          if (board[this.x + i][this.y - i].residentColor !== this.color) {
            attackArray.push(cell);
          }
          break;
        } else {
          movementArray.push(cell);
        }
      }
    }
    for (let i = 1; i < 8; i++) {
      if (this.x - i >= 0 && this.y - i >= 0) {
        let cell = [this.x - i, this.y - i];
        if (board[this.x - i][this.y - i].residentType !== 0) {
          if (board[this.x - i][this.y - i].residentColor !== this.color) {
            attackArray.push(cell);
          }
          break;
        } else {
          movementArray.push(cell);
        }
      }
    }
    for (let i = 1; i < 8; i++) {
      if (this.x - i >= 0 && this.y + i < 8) {
        let cell = [this.x - i, this.y + i];
        if (board[this.x - i][this.y + i].residentType !== 0) {
          if (board[this.x - i][this.y + i].residentColor !== this.color) {
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
}

class Bishop {
  constructor(x, y, color, stat) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stat = stat;
    this.type = "bishop";
    this.picked = false;
    this.dX = this.x * 100 + 30;
    this.dY = this.y * 100 + 30;
  }
  movementArrayF() {
    let movementArray = [];
    let attackArray = [];
    for (let i = 1; i < 8; i++) {
      if (this.x + i < 8 && this.y + i < 8) {
        let cell = [this.x + i, this.y + i];
        if (board[this.x + i][this.y + i].residentType !== 0) {
          if (board[this.x + i][this.y + i].residentColor !== this.color) {
            attackArray.push(cell);
          }
          break;
        } else {
          movementArray.push(cell);
        }
      }
    }
    for (let i = 1; i < 8; i++) {
      if (this.x + i < 8 && this.y - i >= 0) {
        let cell = [this.x + i, this.y - i];
        if (board[this.x + i][this.y - i].residentType !== 0) {
          if (board[this.x + i][this.y - i].residentColor !== this.color) {
            attackArray.push(cell);
          }
          break;
        } else {
          movementArray.push(cell);
        }
      }
    }
    for (let i = 1; i < 8; i++) {
      if (this.x - i >= 0 && this.y - i >= 0) {
        let cell = [this.x - i, this.y - i];
        if (board[this.x - i][this.y - i].residentType !== 0) {
          if (board[this.x - i][this.y - i].residentColor !== this.color) {
            attackArray.push(cell);
          }
          break;
        } else {
          movementArray.push(cell);
        }
      }
    }
    for (let i = 1; i < 8; i++) {
      if (this.x - i >= 0 && this.y + i < 8) {
        let cell = [this.x - i, this.y + i];
        if (board[this.x - i][this.y + i].residentType !== 0) {
          if (board[this.x - i][this.y + i].residentColor !== this.color) {
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
}

class Rook {
  constructor(x, y, color, stat) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stat = stat;
    this.type = "rook";
    this.picked = false;
    this.dX = this.x * 100 + 30;
    this.dY = this.y * 100 + 30;
  }
  movementArrayF() {
    let movementArray = [];
    let attackArray = [];
    for (let i = this.x + 1; i < 8; i++) {
      let cell = [i, this.y];
      if (board[i][this.y].residentType !== 0) {
        if (board[i][this.y].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    for (let i = this.x - 1; i >= 0; i--) {
      let cell = [i, this.y];
      if (board[i][this.y].residentType !== 0) {
        if (board[i][this.y].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    for (let i = this.y + 1; i < 8; i++) {
      let cell = [this.x, i];
      if (board[this.x][i].residentType !== 0) {
        if (board[this.x][i].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    for (let i = this.y - 1; i >= 0; i--) {
      let cell = [this.x, i];
      if (board[this.x][i].residentType !== 0) {
        if (board[this.x][i].residentColor !== this.color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
    return { movementArray: movementArray, attackArray: attackArray };
  }
}

class Horse {
  constructor(x, y, color, stat) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.stat = stat;
    this.type = "horse";
    this.picked = false;
    this.dX = this.x * 100 + 30;
    this.dY = this.y * 100 + 30;
  }
  movementArrayF() {
    let attackArray = [];
    let movementArray = [];
    if (this.x + 1 < 8 && this.y + 2 < 8) {
      if (board[this.x + 1][this.y + 2].residentType === 0) {
        movementArray.push([this.x + 1, this.y + 2]);
      } else {
        if (board[this.x + 1][this.y + 2].residentColor !== this.color) {
          attackArray.push([this.x + 1, this.y + 2]);
        }
      }
    }
    if (this.x + 1 < 8 && this.y - 2 >= 0) {
      if (board[this.x + 1][this.y - 2].residentType === 0) {
        movementArray.push([this.x + 1, this.y - 2]);
      } else {
        if (board[this.x + 1][this.y - 2].residentColor !== this.color) {
          attackArray.push([this.x + 1, this.y - 2]);
        }
      }
    }
    if (this.x - 1 >= 0 && this.y - 2 >= 0) {
      if (board[this.x - 1][this.y - 2].residentType === 0) {
        movementArray.push([this.x - 1, this.y - 2]);
      } else {
        if (board[this.x - 1][this.y - 2].residentColor !== this.color) {
          attackArray.push([this.x - 1, this.y - 2]);
        }
      }
    }
    if (this.x - 1 >= 0 && this.y + 2 < 8) {
      if (board[this.x - 1][this.y + 2].residentType === 0) {
        movementArray.push([this.x - 1, this.y + 2]);
      } else {
        if (board[this.x - 1][this.y + 2].residentColor !== this.color) {
          attackArray.push([this.x - 1, this.y + 2]);
        }
      }
    }
    if (this.x + 2 < 8 && this.y - 1 >= 0) {
      if (board[this.x + 2][this.y - 1].residentType === 0) {
        movementArray.push([this.x + 2, this.y - 1]);
      } else {
        if (board[this.x + 2][this.y - 1].residentColor !== this.color) {
          attackArray.push([this.x + 2, this.y - 1]);
        }
      }
    }
    if (this.x + 2 < 8 && this.y + 1 < 8) {
      if (board[this.x + 2][this.y + 1].residentType === 0) {
        movementArray.push([this.x + 2, this.y + 1]);
      } else {
        if (board[this.x + 2][this.y + 1].residentColor !== this.color) {
          attackArray.push([this.x + 2, this.y + 1]);
        }
      }
    }
    if (this.x - 2 >= 0 && this.y - 1 >= 0) {
      if (board[this.x - 2][this.y - 1].residentType === 0) {
        movementArray.push([this.x - 2, this.y - 1]);
      } else {
        if (board[this.x - 2][this.y - 1].residentColor !== this.color) {
          attackArray.push([this.x - 2, this.y - 1]);
        }
      }
    }
    if (this.x - 2 >= 0 && this.y + 1 < 8) {
      if (board[this.x - 2][this.y + 1].residentType === 0) {
        movementArray.push([this.x - 2, this.y + 1]);
      } else {
        if (board[this.x - 2][this.y + 1].residentColor !== this.color) {
          attackArray.push([this.x - 2, this.y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

let soldierB1 = new Soldier(6, 0, "black", true);
let soldierB2 = new Soldier(6, 1, "black", true);
let soldierB3 = new Soldier(6, 2, "black", true);
let soldierB4 = new Soldier(6, 3, "black", true);
let soldierB5 = new Soldier(6, 4, "black", true);
let soldierB6 = new Soldier(6, 5, "black", true);
let soldierB7 = new Soldier(6, 6, "black", true);
let soldierB8 = new Soldier(6, 7, "black", true);

let queenB = new Queen(7, 3, "black", true);
let kingB = new King(7, 4, "black", true);
let bishopB1 = new Bishop(7, 2, "black", true);
let bishopB2 = new Bishop(7, 5, "black", true);
let rookB1 = new Rook(7, 0, "black", true);
let rookB2 = new Rook(7, 7, "black", true);
let horseB1 = new Horse(7, 1, "black", true);
let horseB2 = new Horse(7, 6, "black", true);

let soldierW1 = new Soldier(1, 0, "white", true);
let soldierW2 = new Soldier(1, 1, "white", true);
let soldierW3 = new Soldier(1, 2, "white", true);
let soldierW4 = new Soldier(1, 3, "white", true);
let soldierW5 = new Soldier(1, 4, "white", true);
let soldierW6 = new Soldier(1, 5, "white", true);
let soldierW7 = new Soldier(1, 6, "white", true);
let soldierW8 = new Soldier(1, 7, "white", true);

let queenW = new Queen(0, 3, "white", true);
let kingW = new King(0, 4, "white", true);
let bishopW1 = new Bishop(0, 2, "white", true);
let bishopW2 = new Bishop(0, 5, "white", true);
let rookW1 = new Rook(0, 0, "white", true);
let rookW2 = new Rook(0, 7, "white", true);
let horseW1 = new Horse(0, 1, "white", true);
let horseW2 = new Horse(0, 6, "white", true);

let player1 = [
  soldierW1,
  soldierW2,
  soldierW3,
  soldierW4,
  soldierW5,
  soldierW6,
  soldierW7,
  soldierW8,
  queenW,
  kingW,
  bishopW1,
  bishopW2,
  rookW1,
  rookW2,
  horseW1,
  horseW2,
];
let player2 = [
  soldierB1,
  soldierB2,
  soldierB3,
  soldierB4,
  soldierB5,
  soldierB6,
  soldierB7,
  soldierB8,
  queenB,
  kingB,
  bishopB1,
  bishopB2,
  rookB1,
  rookB2,
  horseB1,
  horseB2,
];

function renderPlayer() {
  player1.forEach(function (item) {
    if (item.stat === true) {
      //ctx.font = "75px Arial";
      //ctx.fillText("♟", item.dY, item.dX);
      ctx.fillStyle = item.color;
      ctx.fillRect(item.dY, item.dX, 40, 40);
      ctx.beginPath();
      ctx.rect(item.dY, item.dX, 40, 40);
      ctx.stroke();
    }
  });
  player2.forEach(function (item) {
    if (item.stat === true) {
      ctx.fillStyle = item.color;
      ctx.fillRect(item.dY, item.dX, 40, 40);
      ctx.beginPath();
      ctx.rect(item.dY, item.dX, 40, 40);
      ctx.stroke();
    }
  });
}
function mouseCordinationForClick(evt) {
  mousePos = getMousePose(evt);
  stopMovePlayer = false;
  pickPies();
}

function mouseCordinationForMove(evt) {
  mousePos = getMousePose(evt);
}

function getMousePose(evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function findPickedCell() {
  let cellX = Math.floor(mousePos.y / 100);
  let cellY = Math.floor(mousePos.x / 100);
  return { x: cellX, y: cellY };
}

function pickPies() {
  let pickedCell = findPickedCell();

  let ifPickedPiece = false;
  player1.forEach(function (item, index) {
    if (item.x === pickedCell.x && item.y === pickedCell.y) {
      if (item.color === playerTurn) {
        item.picked = true;
        ifPickedPiece = true;
        movedPice.x = item.x;
        movedPice.y = item.y;
        movedPice.color = item.color;
        movedPice.type = item.type;
        movedPice.index = index;
      }
    }
  });
  player2.forEach(function (item, index) {
    if (item.x === pickedCell.x && item.y === pickedCell.y) {
      if (item.color === playerTurn) {
        item.picked = true;
        ifPickedPiece = true;
        movedPice.x = item.x;
        movedPice.y = item.y;
        movedPice.color = item.color;
        movedPice.type = item.type;
        movedPice.index = index;
      }
    }
  });
  if (ifPickedPiece === true) {
    canvas.addEventListener("mousemove", mouseCordinationForMove);
    canvas.removeEventListener("mousedown", mouseCordinationForClick);
    canvas.addEventListener("mousedown", placePiece);
    showPieceMovement();
    movePlayer();
  }
}

function movePlayer() {
  if (stopMovePlayer === false) {
    player1.forEach(function (item) {
      if (item.picked === true) {
        item.dX = mousePos.y;
        item.dY = mousePos.x;
      }
    });
    player2.forEach(function (item) {
      if (item.picked === true) {
        item.dX = mousePos.y;
        item.dY = mousePos.x;
      }
    });
    ctx.clearRect(0, 0, 1000, 1000);
    renderBoard();
    renderPlayer();
    requestAnimationFrame(movePlayer);
  }
}

function placePiece() {
  let pickedPlace = findPickedCell();
  if (playerTurn === "white") {
    var player = player1;
  } else {
    var player = player2;
  }
  if (
    board[pickedPlace.x][pickedPlace.y].residentType === 0 &&
    board[pickedPlace.x][pickedPlace.y].movement === 1
  ) {
    canvas.removeEventListener("mousemove", mouseCordinationForMove);
    canvas.removeEventListener("mousedown", placePiece);
    player.forEach(function (item) {
      if (item.picked === true) {
        item.x = pickedPlace.x;
        item.y = pickedPlace.y;
        item.dX = item.x * 100 + 30;
        item.dY = item.y * 100 + 30;
        item.picked = false;
        board[pickedPlace.x][pickedPlace.y].residentType = item.type;
        board[pickedPlace.x][pickedPlace.y].residentColor = item.color;
        board[movedPice.x][movedPice.y].residentColor = 0;
        board[movedPice.x][movedPice.y].residentType = 0;
        let kishArray = item.movementArrayF().attackArray;
        playerTurn = "black";
        kishArray.forEach(function (b) {
          player2.forEach(function (a) {
            if (b[0] === a.x && b[1] === a.y) {
              if (a.type === "king") {
                kish = true;
                board[a.x][a.y].kish = true;
                console.log(a.type);
              }
            }
          });
        });
      }
    });
    player2.forEach(function (item) {
      if (item.picked === true) {
        item.x = pickedPlace.x;
        item.y = pickedPlace.y;
        item.dX = item.x * 100 + 30;
        item.dY = item.y * 100 + 30;
        item.picked = false;
        board[pickedPlace.x][pickedPlace.y].residentType = item.type;
        board[pickedPlace.x][pickedPlace.y].residentColor = item.color;
        board[movedPice.x][movedPice.y].residentColor = 0;
        board[movedPice.x][movedPice.y].residentType = 0;
        let kishArray = item.movementArrayF().attackArray;
        playerTurn = "white";
        kishArray.forEach(function (b) {
          player1.forEach(function (a) {
            if (b[0] === a.x && b[1] === a.y) {
              if (a.type === "king") {
                kish = true;
                board[a.x][a.y].kish = true;
                console.log(a.type);
              }
            }
          });
        });
      }
    });
  } else if (board[pickedPlace.x][pickedPlace.y].attack === 1) {
    player1.forEach(function (item) {
      if (item.x === pickedPlace.x && item.y === pickedPlace.y) {
        item.stat = false;
      }
      if (item.picked === true) {
        item.x = pickedPlace.x;
        item.y = pickedPlace.y;
        item.dX = item.x * 100 + 30;
        item.dY = item.y * 100 + 30;
        item.picked = false;
        board[pickedPlace.x][pickedPlace.y].residentType = item.type;
        board[pickedPlace.x][pickedPlace.y].residentColor = item.color;
        board[movedPice.x][movedPice.y].residentColor = 0;
        board[movedPice.x][movedPice.y].residentType = 0;
        let kishArray = item.movementArrayF().attackArray;
        playerTurn = "black";
        kishArray.forEach(function (b) {
          player2.forEach(function (a) {
            if (b[0] === a.x && b[1] === a.y) {
              if (a.type === "king") {
                kish = true;
                board[a.x][a.y].kish = true;
                console.log(a.type);
              }
            }
          });
        });
      }
    });
    player2.forEach(function (item) {
      if (item.x === pickedPlace.x && item.y === pickedPlace.y) {
        item.stat = false;
      }
      if (item.picked === true) {
        item.x = pickedPlace.x;
        item.y = pickedPlace.y;
        item.dX = item.x * 100 + 30;
        item.dY = item.y * 100 + 30;
        item.picked = false;
        board[pickedPlace.x][pickedPlace.y].residentType = item.type;
        board[pickedPlace.x][pickedPlace.y].residentColor = item.color;
        board[movedPice.x][movedPice.y].residentColor = 0;
        board[movedPice.x][movedPice.y].residentType = 0;
        let kishArray = item.movementArrayF().attackArray;
        playerTurn = "white";
        kishArray.forEach(function (b) {
          player1.forEach(function (a) {
            if (b[0] === a.x && b[1] === a.y) {
              if (a.type === "king") {
                kish = true;
                board[a.x][a.y].kish = true;
                console.log(a.type);
              }
            }
          });
        });
      }
    });
  } else {
    player1.forEach(function (item) {
      if (item.picked === true) {
        item.dX = item.x * 100 + 30;
        item.dY = item.y * 100 + 30;
        item.picked = false;
      }
    });
    player2.forEach(function (item) {
      if (item.picked === true) {
        item.dX = item.x * 100 + 30;
        item.dY = item.y * 100 + 30;
        item.picked = false;
      }
    });
  }
  canvas.addEventListener("mousedown", mouseCordinationForClick);
  for (let i = 0; i < 8; i++) {
    //to remove attack and movment cell
    board[i].forEach(function (item) {
      item.attack = 0;
      item.movement = 0;
    });
  }
  movePlayer();
  stopMovePlayer = true;
}

function showPieceMovement() {
  player1.forEach(function (item) {
    if (item.picked === true) {
      let moveArray = item.movementArrayF();
      moveArray.movementArray.forEach(function (item) {
        board[item[0]][item[1]].movement = 1;
      });
      moveArray.attackArray.forEach(function (item) {
        board[item[0]][item[1]].attack = 1;
        console.log(board[item[0]][item[1]].attack, "white");
      });
    }
  });
  player2.forEach(function (item) {
    if (item.picked === true) {
      let moveArray = item.movementArrayF();
      moveArray.movementArray.forEach(function (item) {
        board[item[0]][item[1]].movement = 1;
      });
      moveArray.attackArray.forEach(function (item) {
        board[item[0]][item[1]].attack = 1;
        console.log(board[item[0]][item[1]].attack, "black");
      });
    }
  });
}

function checkKish(x) {
  x.forEach(function (item) {
    item.movementArrayF().attackArray.forEach(function (cell) {
      if (board[cell[0]][cell[1]].residentType === "king") {
        kish = true;
      }
    });
  });
}
