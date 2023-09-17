const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const reGame = document.querySelector(".re-game");

let currentPlayer;
let gameBoxes;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function initGame() {
   currentPlayer = "X";
    gameBoxes = [" "," "," "," "," "," "," "," "," "];
    boxes.forEach((box, index) => {
        box.innerText = " ";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
        box.classList.remove("win");
    });
   reGame.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function checkwin()
{
    let answer = " ";
    winningPosition.forEach((position) => {

        if( (gameBoxes[position[0]] !== " " )&&(gameBoxes[position[1]] !== " ") && (gameBoxes[position[2]] !== " ") 
            && (gameBoxes[position[0]] === gameBoxes[position[1]] ) && (gameBoxes[position[1]] === gameBoxes[position[2]]))
        {
                if(gameBoxes[position[0]] == "X") 
                    answer = "X";

                else {
                    answer = "O";
                } 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
        if(answer !== " " ) {
            gameInfo.innerText = `Winner Player - ${answer}`;
           reGame.classList.add("active");
            return;
        }
    });
   
    let fillCount = 0;
    gameBoxes.forEach((box) => {
        if(box !== " " )
            fillCount++;
    });
    
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        reGame.classList.add("active");
    }
}

function Handle(index)
{
   if(gameBoxes[index] === " ")
   {
    boxes[index].innerText = currentPlayer;
    gameBoxes[index] = currentPlayer;
    (currentPlayer == "X")? currentPlayer = "O" :currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
    checkwin();
   }
}
boxes.forEach((box,index) => {
    box.addEventListener("click",()=>
    {
        Handle(index);
    }
    );
});

reGame.addEventListener("click",initGame);