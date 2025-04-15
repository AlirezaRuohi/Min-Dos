let player = "❌"
const button = document.querySelectorAll("button"), turn = document.getElementById("turn"),
    form = document.getElementById("form"), 
    massage = document.getElementById("massage")
let n = Number(5), r_number
let runGame = true
let board = Array(n * n).fill("")
let numberBoard = Array(n * n).fill("")
let number = []
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setBomb() {
    while (number.length < 6) {
        let r_number = getRandomNumber(0, 24);
        if (!number.includes(r_number)) {
            number.push(r_number);
        }
    }
    console.log(number);
    for (let i = 0; i < number.length; i++) {
        numberBoard[number[i]] = "bomb"
    }
}
setBomb()

document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", (event) => {
        let index = event.target.getAttribute("data-index")
        if (board[index] != "" || !runGame) return
        board[index] = player
        event.target.classList.add("duration-[1s]")
        event.target.textContent += player
        checkBomb(event)
        if (!runGame) return
        numberBomb(event)
        checkWin()
        if (!runGame) return    
        changePlayer()
        
    });
});

function numberBomb(event) {
    const index = Number(event.target.getAttribute("data-index"));
    const directions = [
        -n - 1, -n, -n + 1,
        -1, 1,
        n - 1, n, n + 1
    ];
    let bomb = 0;
    const row = Math.floor(index / n);
    const col = index % n;

    for (const dir of directions) {
        const new_index = index + dir;
        const new_row = Math.floor(new_index / n);
        const new_col = new_index % n;

        if (new_index >= 0 && new_index < n * n) {
            
            if (Math.abs(new_row - row) <= 1 && Math.abs(new_col - col) <= 1) {
                if (numberBoard[new_index] == "bomb") {
                    bomb++;
                }
            }
        }
    }

    if (bomb == 0) return;
    event.target.textContent += " " + bomb;
}


function show_massage(mas) {
    setTimeout(function () {
        form.classList.remove("hidden");
    }, 500);
    massage.innerText = mas
}
function checkBomb(event) {
    let index = event.target.getAttribute("data-index")
    for (let i = 0; i < number.length; i++) {
        if (index == number[i]) {
            runGame = false
            event.target.textContent = "💣"
            event.target.style.background = "red"
            event.target.classList.add("duration-[0.5s]")
            show_massage("Player "+player+" Loase")
        }
    }
}

function win(in_1, in_2, in_3) {
    button[in_1].style.background = "green"
    button[in_1].classList.add("duration-[0.5s]")
    button[in_2].style.background = "green"
    button[in_2].classList.add("duration-[0.5s]")
    button[in_3].style.background = "green"
    button[in_3].classList.add("duration-[0.5s]")
    show_massage("Player "+player+" Win")
}

function checkWin() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let index = i * n + j
            if (j + 2 < n && board[index] &&
                board[index] == board[index + 1] && board[index] == board[index + 2]) {
                win(index, index + 1, index + 2)
                runGame = false
            }
            if (i + 2 < n && board[index] &&
                board[index] == board[index + n] && board[index] == board[index + 2 * n]) {
                win(index, index + n, index + 2 * n);
                runGame = false
            }
            if (i + 2 < n && j + 2 < n && board[index] &&
                board[index] == board[index + n + 1] && board[index] == board[index + 2 * (n + 1)]) {
                win(index, index + n + 1, index + 2 * (n + 1))
                runGame = false
            }
            if (i + 2 < n && j - 2 >= 0 && board[index] &&
                board[index] == board[index + n - 1] && board[index] == board[index + 2 * (n - 1)]) {
                win(index, index + n - 1, index + 2 * (n - 1))
                runGame = false
            }
        }
    }
    if (!board.includes("")) {
        runGame = false
        show_massage("Tide")
    }
}

function changePlayer() {
    player = player == "❌" ? "⭕" : "❌"
    turn.innerText = player
}