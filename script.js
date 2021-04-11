var rows = 3
var cols = 3
var count = 0

var currentArray = new Array(rows)

function setValues() {
  for (var i = 0; i < rows; i++) {
    currentArray[i] = new Array(cols)
    for (var j = 0; j < cols; j++) {
      currentArray[i][j] = 0
    }
  }
}

function createBoard() {
  var w = document.getElementById("board")
  var table = document.createElement("table")
  table.setAttribute("id", "grids")
  for (var i = 0; i < rows; i++) {
    var r = document.createElement("tr")
    for (var j = 0; j < cols; j++) {
      var c = document.createElement("td")
      c.setAttribute('id', i + '_' + j);
      c.setAttribute('class', 'dead');
      c.addEventListener('click', cellClick);
      r.appendChild(c)
    }
    table.appendChild(r)
  }
  w.appendChild(table)
}

window.onload = () => {
  createBoard()
  setValues()
}

function cellClick() {
  var loc = this.id.split("_")
  let row = Number(loc[0]);
  let col = Number(loc[1]);
  if (currentArray[row][col] != 0) {
    alert("This space has already been taken.")
    return false
  }
  if (count % 2 == 0) {
    currentArray[row][col] = 1
    checkWin(1)
    this.setAttribute('class', 'alive');
    var com = comMove([row, col]);
    console.log(com)
    currentArray[com[0]][com[1]] = 2;
    document.getElementById(com[0] + "_" + com[1]).setAttribute('class', 'alive2');
    checkWin(2);
  } else {
    currentArray[row][col] = 2
    checkWin(2)
    this.setAttribute('class', 'alive2');
  }
  count += 2
  console.log(currentArray)
}

function checkWin(player) {
  msg = "Player " + player + " Won!"
  if (currentArray[0][0] == player && currentArray[1][0] == player && currentArray[2][0] == player) {
    alert(msg)
    window.location.reload()
  }
  if (currentArray[0][1] == player && currentArray[1][1] == player && currentArray[2][1] == player) {
    alert(msg)
    window.location.reload()
  }
  if (currentArray[0][2] == player && currentArray[1][2] == player && currentArray[2][2] == player) {
    alert(msg)
    window.location.reload()
  }
  if (currentArray[0][0] == player && currentArray[0][1] == player && currentArray[0][2] == player) {
    alert(msg)
    window.location.reload()
  }
  if (currentArray[1][0] == player && currentArray[1][1] == player && currentArray[1][2] == player) {
    alert(msg)
    window.location.reload()
  }
  if (currentArray[2][0] == player && currentArray[2][1] == player && currentArray[2][2] == player) {
    alert(msg)
    window.location.reload()
  }
  if (currentArray[0][0] == player && currentArray[1][1] == player && currentArray[2][2] == player) {
    alert(msg)
    window.location.reload()
  }
  if (currentArray[0][2] == player && currentArray[1][1] == player && currentArray[2][0] == player) {
    alert(msg)
    window.location.reload()
  }
}

function randomCell() {
  var x = Math.floor(Math.random() * 3);
  var y = Math.floor(Math.random() * 3);
  while ((currentArray[x][y]) != 0) {
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);
  }
  return [x, y];
}

function countNeighbors(r, c) {
  var count = 0
  if (r != 0) {
    if (c != 0 && currentArray[r - 1][c - 1] == 1) {
      return [r - 1, c - 1]
    }
    if (currentArray[r - 1][c] == 1) {
      return [r - 1, c]
    }
    if (c != cols - 1 && currentArray[r - 1][c + 1] == 1) {
      return [r - 1, c + 1]
    }
  }
  if (c != 0 && currentArray[r][c - 1] == 1) {
    return [r, c - 1]
  }
  if (c != cols - 1 && currentArray[r][c + 1] == 1) {
    return [r, c + 1]
  }
  if (r != rows - 1) {
    if (c != 0 && currentArray[r + 1][c - 1] == 1) {
      return [r + 1, c - 1]
    }
    if (currentArray[r + 1][c] == 1) {
      return [r + 1, c]
    }
    if (c != cols - 1 && currentArray[r + 1][c + 1] == 1) {
      return [r + 1, c + 1]
    }
  }
  return false
}

function getMissing(cell1, cell2) {
  if (cell1[0] == cell2[0]) {

    if (cell1[1] == 0 || cell1[1] == 1 && cell2[1] == 1 || cell2[1] == 0) {
      return [cell1[0], 2]
    }
    if (cell1[1] == 0 || cell1[1] == 2 && cell2[1] == 2 || cell2[1] == 0) {
      return [cell1[0], 1]
    }
    if (cell1[1] == 1 || cell1[1] == 2 && cell2[1] == 2 || cell2[1] == 1) {
      return [cell1[0], 0]
    }
  }
  if (cell1[1] == cell2[1]) {

    if (cell1[0] == 0 || cell1[0] == 1 && cell2[0] == 1 || cell2[0] == 0) {
      return [2, cell1[1]]
    }
    if (cell1[0] == 0 || cell1[0] == 2 && cell2[0] == 2 || cell2[0] == 0) {
      return [1, cell1[1]]
    }
    if (cell1[0] == 1 || cell1[0] == 2 && cell2[0] == 2 || cell2[0] == 1) {
      return [0, cell1[1]]
    }
  }
  return false
}

function comMove(p1) {
  var neighbor = countNeighbors(p1[0], p1[1])
  if (neighbor != false) {
    var missing = getMissing(p1, neighbor)
    if (missing != false) {
      return missing
    }
  }
  return randomCell()
}
