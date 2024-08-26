document.addEventListener("DOMContentLoaded", () => {
    const rock = document.querySelector(".rock")
    const paper = document.querySelector(".paper")
    const scissors = document.querySelector(".scissors")
    const rules = document.querySelector(".rules")
    const rulesButton = document.getElementById("rules-button")
    const closeRulesButton = document.querySelector(".close-rules-button")
    const triangle = document.querySelector(".triangle")
    const resultView = document.querySelector(".result-view")
    const resultText = document.querySelector(".result-text")
    const youPicked = document.querySelector(".you-picked")
    const computerPicked = document.querySelector(".computer-picked")
    const computerScore = document.querySelector(".computer-score")
    const yourScore = document.querySelector(".your-score")
    const nextButton = document.getElementById("next-button")

    nextButton.style.display = "none"
    rulesButton.addEventListener("click", () => {
        rules.style.display = "block"
    })
    closeRulesButton.addEventListener("click", () => {
        rules.style.display = "none"
    })

    let yourOldScore = sessionStorage.getItem("yourOldScore")
    let computerOldScore = sessionStorage.getItem("computerOldScore")
    console.log("your Score: ", sessionStorage.getItem("yourOldScore"))
        console.log("computer Score: ", sessionStorage.getItem("computerOldScore"))
        if(yourOldScore !== null) {
        yourScore.textContent = yourOldScore
    }
    if(computerOldScore !== null) {
        computerScore.textContent = computerOldScore
    }

    const choices = [rock, paper, scissors]
    
    let computerIdx = -1
    choices.forEach((choice, playerIdx) => {
        choice.addEventListener("click", () => {
            console.log(`Player chose: ${choice.className}`)
            gameInit(choice.className, playerIdx)
            
            return
        })
    })
    function gameInit(playerChoice, playerIdx) {
        computerIdx = Math.floor(Math.random() * choices.length)
        const computerChoice = choices[computerIdx].className
        console.log(`Computer chose: ${computerChoice}`)
        let winner = chooseWinner(playerChoice, computerChoice)
        let greeting = winner == "p" ? "Player wins!" : (winner == "c"? "Computer wins!" : "It's a tie")
        console.log(`Winner: ${greeting}`)
        triangle.style.display = "none"
        resultView.style.display = "block"
        resultView.style.display = "flex"

        const myImg = document.createElement("img")
        myImg.src = `images/${playerChoice}.png`
        myImg.classList.add(`${playerChoice}`)
        youPicked.appendChild(myImg)
        const computerImg = document.createElement("img")
        computerImg.src = `images/${computerChoice}.png`
        computerImg.classList.add(`${computerChoice}`)
        computerPicked.appendChild(computerImg)

        const glowElement = document.createElement("div")
        glowElement.classList.add("glow")

        if(winner === "c") {
            computerImg.parentNode.insertBefore(glowElement, computerImg)
            glowElement.appendChild(computerImg)
            resultText.innerHTML = "<h1> YOU LOST</h1> <h3>AGAINST PC</h3>" + resultText.innerHTML
        }
        else if(winner === "p") {
            nextButton.style.display = "block"
            myImg.parentNode.insertBefore(glowElement, myImg)
            glowElement.appendChild(myImg)
            resultText.innerHTML = "<h1>YOU WIN</h1> <h3>AGAINST PC</h3>" + resultText.innerHTML
        }
        else {
            resultView.querySelector(".play-button").textContent = "REPLAY"
            resultText.innerHTML = "<h1>TIE UP</h1>" + resultText.innerHTML
        }
    }
    function chooseWinner(playerChoice, computerChoice) {
        let p = playerChoice
        let c = computerChoice
        
        if(p === c) {
            return "t"
        }
        if(p === "rock") {
            if(c === "paper") {
                computerScore.textContent = parseInt(computerScore.textContent)
                computerScore.textContent++
                sessionStorage.setItem("computerOldScore", computerScore.textContent)
                return "c"
            }
            else {
                yourScore.textContent = parseInt(yourScore.textContent)
                yourScore.textContent++
                sessionStorage.setItem("yourOldScore", yourScore.textContent)
                return "p"
            }
        }
        else if(p === "paper") {
            if(c === "rock") {
                yourScore.textContent = parseInt(yourScore.textContent)
                yourScore.textContent++
                sessionStorage.setItem("yourOldScore", yourScore.textContent)
                return "p"
            }
            else {
                computerScore.textContent = parseInt(computerScore.textContent)
                computerScore.textContent++
                sessionStorage.setItem("computerOldScore", computerScore.textContent)
                return "c"
            }
        }
        else {
            if(c === "rock") {
                computerScore.textContent = parseInt(computerScore.textContent)
                computerScore.textContent++
                sessionStorage.setItem("computerOldScore", computerScore.textContent)
                return "c"
            }
            else {
                yourScore.textContent = parseInt(yourScore.textContent)
                yourScore.textContent++
                sessionStorage.setItem("yourOldScore", yourScore.textContent)
                return "p"
            }
        }
    }
    
    

})