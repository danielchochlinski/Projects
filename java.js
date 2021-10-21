window.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.getElementById("score")
    const width = 28

let score = 0

    //layout of grid and whats inside

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = []
    //legend
    //0 - pac-dot
    //1 - wall
    //2 - ghost-lair
    //3 - power-pellet
    //4 - empty-

    //draw grid and render it
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement("div")
        grid.appendChild(square)
        squares.push(square)

        //add layout to the board
        if(layout[i] === 0) {
            squares[i].classList.add("pac-dot")
            
        }else if(layout[i] === 1) {
            squares[i].classList.add("wall")

        }else if (layout[i] === 2) {
            squares[i].classList.add("ghost-lair")

        }else if (layout[i] === 3) {
            squares[i].classList.add("power-pellet")
        }
    }
}


createBoard()

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add("pac-man")

function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove("pac-man")

    switch(e.keyCode) {
        case 37:
            if(
                pacmanCurrentIndex % width !== 0 &&
                !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
                )
              pacmanCurrentIndex -= 1
              if (squares[pacmanCurrentIndex -1] === squares[363]) {
                pacmanCurrentIndex = 391
              }
              break
            case 38:
              if(
                pacmanCurrentIndex - width >= 0 &&
                !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
                ) 
              pacmanCurrentIndex -= width
              break
            case 39:
              if(
                pacmanCurrentIndex % width < width - 1 &&
                !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
              )
              pacmanCurrentIndex += 1
              if (squares[pacmanCurrentIndex +1] === squares[392]) {
                pacmanCurrentIndex = 364
              }
              break
            case 40:
              if (
                pacmanCurrentIndex + width < width * width &&
                !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
              )
              pacmanCurrentIndex += width
              break
             
    }

    squares[pacmanCurrentIndex].classList.add("pac-man")
    pacDotEaten()
    powerPelletEaten()
    gameOver()
    checkforWin()
    
}

document.addEventListener("keyup", movePacman)
//pacman eats pac dot

function pacDotEaten(){
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
    score++
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove("pac-dot")
    }
}
//what happens when you eat power pellet

function powerPelletEaten () {
    if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
        score += 10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove("power-pellet")
    }
}

//make ghosts unscared
function unScareGhosts () {
    ghosts.forEach(ghost => ghost.isScared = false) 
}

//creat Ghosts templet

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.timerId = NaN
        this.isScared = false
    }
}

ghosts = [
    new Ghost("blinky", 289, 250),
    new Ghost("pinky", 298, 400),
    new Ghost("inky", 469, 300),
    new Ghost("clyde", 454, 500)    
]

//draw Ghosts into the grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add("ghost")
})
//move all the ghosts randomly
ghosts.forEach(ghost => moveGhost(ghost))

//function that move the ghosts
function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]


    ghost.timerId = setInterval(function(){
    //if the next square ghost is going to does not contain a wall or a ghost you can go there
    if(!squares[ghost.currentIndex + direction]. classList.contains("wall") && 
        !squares[ghost.currentIndex + direction].classList.contains("ghost")) {
    // you can go there
    //remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
    //change index to new safe square
    ghost.currentIndex += direction
    //redraw the ghost in new squares
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
    }
    else direction = directions[Math.floor(Math.random() * directions.length)]

    //if ghost is scared is true add class
    if(ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost")

    //if ghost is scared and pacman runs into it remove ghost 
if(ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
    squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost")
    ghost.currentIndex = ghost.startIndex
    score += 100
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost", "scared-ghost")
    
}

    }
    gameOver()
}, ghost.speed)
}

//check for gameOver

function gameOver() {
    if(squares[pacmanCurrentIndex].classList.contains("ghost") &&
        !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener("keyup", movePacman)
            setTimeout(function(){alert("game over!")
        }, 500)
      scoreDisplay.innerHTML = "game over"
    }
}

//check for win

function checkforWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener("keyup", movePacman)
        setTimeout(function(){alert("you WIN!")
    }, 500)
    scoreDisplay.innerHTML = "YOU WIN"
    }
}
})
