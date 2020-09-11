const cells = document.querySelectorAll('.cell')
const board = document.querySelector('.board')
const msgbox = document.querySelector('.winning-message-box')
const msg = document.querySelector('.winning-message')
const resetBtn = document.querySelector('.btn-reset')

let game = ['','','','','','','','','']

const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const fillCell = e => {
    // Adds the class to the cell
    var currentMove = board.classList[1]
    var oppMove = currentMove === 'x' ? 'o' : 'x'
    const cell = e.target
    cell.classList.add(currentMove)

    // game logic
    // check for win / draw
    var index = Array.from(cell.parentNode.children).indexOf(cell)
    game[index] = currentMove
    if (checkgame(currentMove)) {
        endGame(false, currentMove)
    } else if(isDraw()) {
        endGame(true)
    } else {
        // switch turns
        board.classList.remove(currentMove)
        board.classList.add(oppMove)
    }
}

const isDraw = () => {
    return Array.from(cells).every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}

const endGame = (draw, currentMove) => {
    if(draw) {
        // Display draw message 
        msg.innerHTML = `Draw!`
    } else {
        // Display winning message
        msg.innerHTML = `${currentMove.toUpperCase()} won!`
    }

    msgbox.classList.remove('hide')
    msgbox.classList.add('show')
}

const checkgame = currentMove => {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentMove)
        })
    })
}

const clearGame = () => {

    game = ['','','','','','','','','']

    board.classList.remove('x')
    board.classList.remove('o')
    board.classList.add('x')

    msgbox.classList.remove('show')
    msgbox.classList.add('hide')

    cells.forEach(cell => {
        cell.classList.remove('x')
        cell.classList.remove('o')
        cell.addEventListener('click', fillCell, { once: true })
    })

    console.log(game)
    console.log(cells)
}

cells.forEach(cell => {
    cell.addEventListener('click', fillCell, { once: true })
})

resetBtn.addEventListener('click', clearGame)