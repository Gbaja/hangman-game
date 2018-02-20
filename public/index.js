const start_game_btn = document.getElementById("start_game_btn");
const inputs_container = document.getElementById("inputs_container");
const guesses_input = document.getElementsByClassName("guesses_input");
const hangman = document.getElementsByClassName("hangman")[0];
const hangman__bodyPart = document.getElementsByClassName("hangman__bodyPart");
const live_para = document.getElementById("live_para");
const gameover_para = document.getElementById("gameover_para");
const alphabets_btns = document.getElementById("alphabets_btns");
const play_area = document.getElementsByClassName("game-features")[0];
const game_intro = document.getElementsByClassName("game-intro")[0];
const replay_btn = document.getElementById("replay_btn");
const hint_btn = document.getElementsByClassName("buttons__hint")[0];
const hint_para = document.getElementById("hint_para");
let word_to_guess;
let hint;
let num_of_lives = 0;

const apiRequestForWord = () =>
  fetch(`https://locationsng-api.herokuapp.com/api/v1/states`);

const requestResultAction = () => {
  apiRequestForWord()
    .then(response => {
      return response.json();
    })
    .then(response_text => {
      const randomNumber = Math.floor(Math.random() * response_text.length);
      return [
        response_text[randomNumber].name,
        response_text[randomNumber].capital
      ];
    })
    .then(word => {
      word_to_guess = word[0].toUpperCase();
      hint = word[1].toUpperCase();
      game_intro.classList.add("no-play");
      hangman.classList.remove("no-play");
      alphabets_btns.classList.remove("no-play");
      wordInput(word[0]);
    })
    .catch(err => {
      console.error(err);
    });
};

const showHint = () => {
  hint_para.textContent = `Capital of the state is: ${hint}`;
};

start_game_btn.addEventListener("click", requestResultAction);
hint_btn.addEventListener("click", showHint);

const wordInput = word => {
  const word_array = word.split("");
  word_array.map(letter => {
    const input_element = document.createElement("input");
    input_element.type = "text";
    input_element.className = "guesses_input";
    inputs_container.appendChild(input_element);
  });
  word = "";
};

function alphabets_click_func(event) {
  event.target.classList.add("used");
  const letter = event.target.value;
  const letterPosition = word_to_guess.indexOf(letter);
  word_to_guess.indexOf(letter) === -1
    ? (++num_of_lives,
      (live_para.textContent = `Used lives: ${num_of_lives}`),
      (hangman__bodyPart[num_of_lives - 1].style.display = "block"),
      liveFinished(num_of_lives))
    : fillInAnswer(word_to_guess, letter);
}

const fillInAnswer = (placeholder_word, placeholder_letter) => {
  placeholder_word.split("").filter((each_letter, i) => {
    let letterPosition = "";
    letterPosition = placeholder_word[i];
    letterPosition === placeholder_letter
      ? (guesses_input[i].value = placeholder_letter)
      : false;
  });
  checkIsCorrectAnswer()
    ? ((gameover_para.textContent = `You guessed right, the correct state is ${word_to_guess}`),
      live_para.classList.add("no-play"),
      gameOver())
    : false;
};

const liveFinished = live => {
  live === 6
    ? ((gameover_para.textContent = "GAME OVER! The state is " + word_to_guess),
      live_para.classList.add("no-play"),
      gameOver())
    : false;
};

const checkIsCorrectAnswer = () => {
  for (var y = 0; y < guesses_input.length; y++) {
    if (guesses_input[y].value == "") {
      return false;
    }
  }
  return true;
};

const gameOver = () => {
  live_para.classList.add("no-play");
  alphabets_btns.classList.add("no-play");
  inputs_container.classList.add("no-play");
};
