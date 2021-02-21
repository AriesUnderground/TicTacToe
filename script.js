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
  } else {
    currentArray[row][col] = 2
    checkWin(2)
    this.setAttribute('class', 'alive2');
  }
  count += 1
  console.log(currentArray)
}

function checkWin(player) {
  msg = "Player " + player + " Won!"
  if (currentArray[0][0] == player && currentArray[1][0] == player && currentArray[2][0] == player) {
    alert(msg)
  }
  if (currentArray[0][1] == player && currentArray[1][1] == player && currentArray[2][1] == player) {
    alert(msg)
  }
  if (currentArray[0][2] == player && currentArray[1][2] == player && currentArray[2][2] == player) {
    alert(msg)
  }
  if (currentArray[0][0] == player && currentArray[0][1] == player && currentArray[0][2] == player) {
    alert(msg)
  }
  if (currentArray[1][0] == player && currentArray[1][1] == player && currentArray[1][2] == player) {
    alert(msg)
  }
  if (currentArray[2][0] == player && currentArray[2][1] == player && currentArray[2][2] == player) {
    alert(msg)
  }
  if (currentArray[0][0] == player && currentArray[1][1] == player && currentArray[2][2] == player) {
    alert(msg)
  }
  if (currentArray[0][2] == player && currentArray[1][1] == player && currentArray[2][0] == player) {
    alert(msg)
  }
}
