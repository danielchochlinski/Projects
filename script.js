const grid = document.querySelector(".grid")
const width = 8
const squares = []
let score = 0
let scoreDisplay = document.querySelector("#score")


//candy colors arrays
const candyColors = [
  "red",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
  "pink"
]

//creatBoard
function createBoard () {
  for(let i = 0; i < width*width; i++) {
    const square = document.createElement("div")
    square.setAttribute("draggable", true)
    square.setAttribute("id", i)
    let randomColor = Math.floor(Math.random() * candyColors.length)
    square.style.backgroundColor = candyColors[randomColor]
    grid.appendChild(square)
    squares.push(square)
  }
}

createBoard()

//Drag the candies

let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener("dragstart", dragStart))
squares.forEach(square => square.addEventListener("dragend", dragEnd))
squares.forEach(square => square.addEventListener("dragover", dragOver))
squares.forEach(square => square.addEventListener("dragenter", dragEnter))
squares.forEach(square => square.addEventListener("dragleave", dragLeave))
squares.forEach(square => square.addEventListener("drop", dragDrop))

function dragStart () {
  colorBeingDragged = this.style.backgroundColor
  squareIdBeingDragged = parseInt(this.id)
  console.log(colorBeingDragged)
  console.log(this.id, "dragStart")
}

function dragEnd () {
  //what is a valid move
  let validMoves = [
    squareIdBeingDragged -1,
    squareIdBeingDragged +1,
    squareIdBeingDragged + width,
    squareIdBeingDragged - width
  ]
  let validMove = validMoves.includes(squareIdBeingReplaced)

if(squareIdBeingReplaced && validMove) {
  squareIdBeingReplaced = null
}else if(squareIdBeingReplaced && !validMove) {
  squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
  squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
}else squares[squareIdBeingDragged] = colorBeingDragged
  console.log(this.id, "dragEnd")
  
}

function dragOver (e) {
  e.preventDefault()
  console.log(this.id, "dragOver")
  
}

function dragEnter (e) {
  e.preventDefault()
  console.log(this.id, "dragEnter")
  
}

function dragLeave () {
  console.log(this.id, "dragLeave")
  
}

function dragDrop () {
  colorBeingReplaced = this.style.backgroundColor
  squareIdBeingReplaced = parseInt(this.id)
  this.style.backgroundColor = colorBeingDragged
  squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced 
}

//drop candies when others are cleared
function moveDown () {
  for (i = 0; i < 55; i++){
    if(squares[i + width].style.backgroundColor === ""){
      squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
      squares[i].style.backgroundColor = ""
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const ifFirstRow = firstRow.includes(i)
      if (ifFirstRow && squares[i].style.backgroundColor === "") {
        let randomColor = Math.floor(Math.random() * candyColors.length)
        squares[i].style.backgroundColor = candyColors[randomColor]
      }
    }
  }
}


//checking for marches
  //check for row of three

function checkRowForThree () {
  for (i = 0; i < 61; i++) {
    let rowOfThree = [i, i+1, i+2]
    let decidedColor = squares[i].style.backgroundColor
    const isBlank = squares[i].style.backgroundColor === ""

    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
    if (notValid.includes(i)) continue

    if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
      score += 3
      scoreDisplay.innerHTML = score
      rowOfThree.forEach(index => {
        squares[index].style.backgroundColor = ""
      })
    }
  }
}
checkRowForThree() 

  //checking for column of three
function checkColumnForThree () {
  for (i = 0; i < 47; i++) {
    let columnOfThree = [i, i+width, i+width*2]
    let decidedColor = squares[i].style.backgroundColor
    const isBlank = squares[i].style.backgroundColor === ""

    if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
      score += 3
      scoreDisplay.innerHTML = score
      columnOfThree.forEach(index => {
        squares[index].style.backgroundColor = ""
      })
    }
  }
}


  //check for row of four

  function checkRowForFour () {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i+1, i+2, i+3]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ""
  
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 27, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue
  
      if(rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 4
        scoreDisplay.innerHTML = score
        rowOfFour.forEach(index => {
          squares[index].style.backgroundColor = ""
        })
      }
    }
  }
  checkRowForFour() 
  
    //checking for column of Four
    function checkColumnForFour () {
      for (i = 0; i < 47; i++) {
        let columnOfFour = [i, i+width, i+width*2, i+width*3]
        let decidedColor = squares[i].style.backgroundColor
        const isBlank = squares[i].style.backgroundColor === ""
    
        if(columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
          score += 4
          scoreDisplay.innerHTML = score
          columnOfFour.forEach(index => {
            squares[index].style.backgroundColor = ""
          })
        }
      }
    }

checkColumnForFour()

window.setInterval(function() {
  moveDown()
  checkRowForFour()
  checkColumnForFour()
  checkRowForThree()
  checkColumnForThree()
  
}, 100)