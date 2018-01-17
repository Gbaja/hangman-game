const start_game_btn = document.getElementById('start_game_btn');
const inputs_container = document.getElementById('inputs_container');
const guesses_input = document.getElementsByClassName('guesses_input');
const hangman__bodyPart = document.getElementsByClassName('hangman__bodyPart');
const live_para = document.getElementById('live_para');
const gameover_para = document.getElementById('gameover_para');
const alphabets_btns = document.getElementById('alphabets_btns');

let word_to_guess;
let num_of_lives = 0;

const apiRequestForWord = () => fetch(`http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=691eca87b094010c8a00a0fa35204cc24a6f373ce37d18c5c`);
const requestResultAction = () => {
  apiRequestForWord().then((response) => {
    //console.log(response.json());
    return response.json();
  }).then((response_text) => {
    console.log(response_text);
    return response_text.word
  }).then((word) => {
    word_to_guess = word.toUpperCase()
    wordInput(word)
  }).catch((err) => {
    console.error(err);
  })
}

start_game_btn.addEventListener("click", requestResultAction)

const wordInput = (word) => {
  const word_array = word.split("");
  word_array.map((letter) => {
    const input_element = document.createElement('input');
    input_element.type = "text";
    input_element.className = "guesses_input";
    inputs_container.appendChild(input_element);
  })
}

function alphabets_click_func(event) {
  event.target.classList.add("used")
  const letter = event.target.value;
  const letterPosition = word_to_guess.indexOf(letter);
  word_to_guess.indexOf(letter) === -1 ? (
    ++num_of_lives,
    live_para.textContent = `Used lives: ${num_of_lives}`,
    console.log(hangman__bodyPart),
    hangman__bodyPart[num_of_lives-1].style.display = "block",
    gameOver(num_of_lives)) : fillInAnswer(word_to_guess, letter);
}

const fillInAnswer = (placeholder_word, placeholder_letter) => {
  placeholder_word.split("").filter((each_letter, i) => {
    let letterPosition = "";
    letterPosition = placeholder_word[i];
    letterPosition === placeholder_letter ? guesses_input[i].value = placeholder_letter : false;
  })
  checkIsCorrectAnswer() ? (gameover_para.textContent = `You guessed right, the correct word is ${word_to_guess}`,
  live_para.style.display = "none",
  alphabets_btns.style.display = "none",
inputs_container.style.display = "none") : false
}

const gameOver = (live) => {
  live === 6 ?  (gameover_para.textContent = "GAME OVER! The word is " + word_to_guess,
  live_para.style.display = "none",
  alphabets_btns.style.display = "none",
inputs_container.style.display = "none"): false;
}

const checkIsCorrectAnswer= ()=>{
    for(var y = 0; y < guesses_input.length; y++){
        if(guesses_input[y].value == ""){
            return false;
        }
    }
    return true;
}
