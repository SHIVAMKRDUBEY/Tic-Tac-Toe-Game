// access the modes Element
let modebtn = document.querySelector(".btnqn");
let body = document.querySelector("body");

let currmode = "light";
modebtn.addEventListener("click", () =>{
    alert("Mode changed");
    console.log("you are trying to change mode");
    if(currmode === "light"){
        currmode = "dark";
        //document.querySelector("body").style.backgroundColor = "black"; 
        body.classList.add("dark");
        body.classList.remove("light");   
    }    
    else{
        currmode = "light";
        //document.querySelector("body").style.backgroundColor = "white";
        body.classList.add("light");
        body.classList.remove("derk");
    }    
    console.log(currmode);
});

// Access the boxes
let boxes = document.querySelectorAll(".Box");
// Access the reset button
let resetBtn = document.querySelector("#reset");
// Access the new game btn
let newGameBtn = document.querySelector("#new-btn");
// access the message container
let msgContainer = document.querySelector(".msg-container");
// access msg
let msg = document.querySelector("#msg");

// Choose the player turn
let turn = true;
// To track draw 
let count = 0;

// Store the wining pattern in 2D array
const winingPaterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

// Click operation on button's of box class
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Print the message and count the click's
        console.log("Box Was clicked");
        // console.log(alert("box clicked"));
        // set text inside the box through condition's
        if(turn === true) // if(turn) Note:as similearly
        {
            box.style.color = "green";
            box.innerText = "X";
            turn = false;
        } 
        else
        {
            box.style.color = "red";
            box.innerText = "O";
            turn = true;
        }
        // To remove the re-write problem we need to disable the ticked boxes.
        box.disabled = true;
        //checkWinner();
        count++;
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) 
        {
            gameDraw();
        }
    });
}); 

// If game is draw
const gameDraw = () => 
{
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    console.log(alert("Game Over"));
    disableBoxes();
};

// To check the Winner
const checkWinner = () =>
{
    for(let pattern of winingPaterns)
    {
        // console.log(pattern[0],pattern[1],pattern[2]);
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        // Check the condition for empty places
        if(position1 != "" && position2 != "" && position3 != "")
        {
            if(position1 === position2 && position2 === position3)
            {
                console.log(`Winner = ${position1}`);
                showwinner(position1);
                return true;
            }
        }
    }
};

// TO disable other boxes
const disableBoxes = () => 
{
    for(let box of boxes)
    {
        box.disabled = true;
    }
};

// To display winner
const showwinner = (winner) =>
    {
        msg.innerText = `Congratulation's Winner Is ${winner}`;
        msgContainer.classList.remove("hide");
        console.log(alert(`player ${winner} winner`));
        disableBoxes();
    };

// To enable all boxes for next round game
const enableBoxes = () => 
    {
        for(let box of boxes)
        {
            box.disabled = false;
            box.innerText = " ";
        }
    };

// To reset Game
const resetGame = () =>
    {
        turn = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
    };    

    // TO operate the reset button
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);