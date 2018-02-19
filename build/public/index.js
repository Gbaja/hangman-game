"use strict";

var start_game_btn = document.getElementById("start_game_btn");
var inputs_container = document.getElementById("inputs_container");
var guesses_input = document.getElementsByClassName("guesses_input");
var hangman = document.getElementsByClassName("hangman")[0];
var hangman__bodyPart = document.getElementsByClassName("hangman__bodyPart");
var live_para = document.getElementById("live_para");
var gameover_para = document.getElementById("gameover_para");
var alphabets_btns = document.getElementById("alphabets_btns");
var play_area = document.getElementsByClassName("game-features")[0];
var game_intro = document.getElementsByClassName("game-intro")[0];
var replay_btn = document.getElementById("replay_btn");
var word_to_guess = void 0;
var num_of_lives = 0;

var apiRequestForWord = function apiRequestForWord() {
  return fetch("https://locationsng-api.herokuapp.com/api/v1/states");
};

var requestResultAction = function requestResultAction() {
  apiRequestForWord().then(function (response) {
    return response.json();
  }).then(function (response_text) {
    var randomNumber = Math.floor(Math.random() * response_text.length);
    console.log(response_text[randomNumber].name);
    return response_text[randomNumber].name;
  }).then(function (word) {
    word_to_guess = word.toUpperCase();
    game_intro.classList.add("no-play");
    hangman.classList.remove("no-play");
    alphabets_btns.classList.remove("no-play");

    wordInput(word);
  }).catch(function (err) {
    console.error(err);
  });
};

start_game_btn.addEventListener("click", requestResultAction);
//replay_btn.addEventListener("click", requestResultAction)

//requestResultAction();

var wordInput = function wordInput(word) {
  var word_array = word.split("");
  word_array.map(function (letter) {
    var input_element = document.createElement("input");
    input_element.type = "text";
    input_element.className = "guesses_input";
    inputs_container.appendChild(input_element);
  });
  word = "";
};

function alphabets_click_func(event) {
  event.target.classList.add("used");
  var letter = event.target.value;
  var letterPosition = word_to_guess.indexOf(letter);
  word_to_guess.indexOf(letter) === -1 ? (++num_of_lives, live_para.textContent = "Used lives: " + num_of_lives, hangman__bodyPart[num_of_lives - 1].style.display = "block", liveFinished(num_of_lives)) : fillInAnswer(word_to_guess, letter);
}

var fillInAnswer = function fillInAnswer(placeholder_word, placeholder_letter) {
  placeholder_word.split("").filter(function (each_letter, i) {
    var letterPosition = "";
    letterPosition = placeholder_word[i];
    letterPosition === placeholder_letter ? guesses_input[i].value = placeholder_letter : false;
  });
  checkIsCorrectAnswer() ? (gameover_para.textContent = "You guessed right, the correct word is " + word_to_guess, live_para.classList.add("no-play"), gameOver()) : false;
};

var liveFinished = function liveFinished(live) {
  live === 6 ? (gameover_para.textContent = "GAME OVER! The word is " + word_to_guess, live_para.classList.add("no-play"), gameOver()) : false;
};

var checkIsCorrectAnswer = function checkIsCorrectAnswer() {
  for (var y = 0; y < guesses_input.length; y++) {
    if (guesses_input[y].value == "") {
      return false;
    }
  }
  return true;
};

var gameOver = function gameOver() {
  live_para.classList.add("no-play");
  alphabets_btns.classList.add("no-play");
  inputs_container.classList.add("no-play");
  //replay_btn.classList.remove("no-play"),
  //  replay_btn.addEventListener("click", requestResultAction)
};