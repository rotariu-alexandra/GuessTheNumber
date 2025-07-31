const btn = document.getElementById("pick-btn");
let input = document.getElementById("input");
const check = document.getElementById("check-btn");
let result = 0;
let attempts = 5; // numar incercari
let myTimeOut;
const section = document.querySelector(".section-part");
const navBar = document.querySelector(".nav-bar");
let login = document.querySelector(".log-in");
const submitBtn = document.getElementById("sign-btn");
let inputName = document.getElementById("inputName");

navBar.style.display = "none";
section.style.display = "none";

function loginF(){
    let username = inputName.value.trim();
    if (username===""){
        alert("Numele trebuie completat!");
        return;
    }
    console.log(username);

    navBar.style.display = "flex";
    section.style.display = "flex";
    login.style.display = "none";

}
inputName.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        loginF(); 
    }
});
document.g

// random number
btn.addEventListener("click", function () {
    document.getElementById("eror").innerHTML="Type your guess in the input!";
    document.getElementById("win").innerHTML="The number has been chosen!";
    clearTimeout(myTimeOut); 
    let number = Math.floor(Math.random() * 100) + 2;
    console.log("Numarul random este: " + number);
    result = number;
    attempts = 5; 
    input.disabled = false;
    check.disabled = false;
    check.style.background = "";
    //document.getElementById("win").innerHTML = "";
    //document.getElementById("eror").innerHTML = "";

    
    myTimeOut = setTimeout(alertTime, 10000);
    btn.innerText="Pick";
});

function checkBtn(){
    document.getElementById("win").innerHTML = "";
    document.getElementById("eror").innerHTML = "";

    clearTimeout(myTimeOut); 
    let value = input.value;
    verificaTip(value);
    input.value = "";

    if (attempts > 0) {
        myTimeOut = setTimeout(alertTime, 10000);
    }
}

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkBtn();
    }
});

function verificaTip(value) {
    if (isNaN(parseInt(value))) {
        document.getElementById("eror").innerHTML = "Only numbers";
    } else {
        document.getElementById("eror").innerHTML = "";
        checkGuess(value);
    }
}


function checkGuess(value) {
    let valueInt = parseInt(value);
    let dif = Math.abs(valueInt - result); 

    if (valueInt < 1 || valueInt > 100) {
        document.getElementById("eror").innerHTML = "Only between 1-100";
    } else {
        if (valueInt === result) {
            document.getElementById("win").innerHTML = "🎉🎉🎉🎉";
            document.getElementById("eror").innerHTML = "You win!";
            clearTimeout(myTimeOut); 
            endGame();
            return;
        } 
        attempts--;
        if (dif <= 3) {
            document.getElementById("eror").innerHTML = "Too close!";
        } else if (valueInt > result) {
            document.getElementById("eror").innerHTML = "Too big";
        } else {
            document.getElementById("eror").innerHTML = "Too small";
        }
    }


    if (attempts === 0) {
        document.getElementById("win").innerHTML = "😭😭😭😭";
        document.getElementById("eror").innerHTML = "Game over. The number was " + result;
        console.log("Ai pierdut, numarul era: " + result);
        endGame();
    }
}


function endGame() {
    clearTimeout(myTimeOut);
    check.disabled = true;
    check.style.background = "darkgrey";
    input.disabled = true;
    btn.innerText="Pick Again";
}

// timp
function alertTime() {
    if (attempts > 0 && !check.disabled) { 
        alert("Nu ai ghicit la timp!");
        attempts--;
        myTimeOut = setTimeout(alertTime, 10000);
        if (attempts === 0) {
            document.getElementById("win").innerHTML = "😭😭😭😭";
            document.getElementById("eror").innerHTML = "Game over. The number was " + result;
            console.log("Ai pierdut, numarul era: " + result);
            endGame();
        }
    }
}
