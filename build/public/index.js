'use strict';

var start_game_btn = document.getElementById('start_game_btn');
var list_container = document.getElementById('list_container');
var guesses_input = document.getElementsByClassName('guesses_input');
var gameview__hangman__bodyPart = document.getElementsByClassName('gameview__hangman__bodyPart');
var live_para = document.getElementById('live_para');
var gameover_para = document.getElementById('gameover_para');
var playarea = document.getElementById('playarea');

var word_to_guess = void 0;
var num_of_lives = 0;

var apiRequestForWord = function apiRequestForWord() {
  return fetch("https://api.github.com/users/gbaja");
};
var requestResultAction = function requestResultAction() {
  apiRequestForWord().then(function (response) {
    return response.json();
  }).then(function (response_text) {
    return response_text.login;
  }).then(function (word) {
    word_to_guess = word.toUpperCase();
    wordInput(word);
  }).catch(function (err) {
    console.error(err);
  });
};

start_game_btn.addEventListener("click", requestResultAction);

var wordInput = function wordInput(word) {
  var word_array = word.split("");
  word_array.map(function (letter) {
    var input_element = document.createElement('input');
    input_element.type = "text";
    input_element.className = "guesses_input";
    list_container.appendChild(input_element);
  });
};

function alphabets_click_func(event) {
  event.target.classList.add("used");
  var letter = event.target.value;
  var letterPosition = word_to_guess.indexOf(letter);
  word_to_guess.indexOf(letter) === -1 ? (++num_of_lives, live_para.textContent = 'Used lives: ' + num_of_lives, console.log(gameview__hangman__bodyPart), gameview__hangman__bodyPart[num_of_lives - 1].style.display = "block", gameOver(num_of_lives)) : fillInAnswer(word_to_guess, letter);
}

var fillInAnswer = function fillInAnswer(placeholder_word, placeholder_letter) {
  placeholder_word.split("").filter(function (each_letter, i) {
    var letterPosition = "";
    letterPosition = placeholder_word[i];
    letterPosition === placeholder_letter ? guesses_input[i].value = placeholder_letter : false;
  });
};

var gameOver = function gameOver(live) {
  live === 6 ? (gameover_para.textContent = "GAME OVER! The word is " + word_to_guess, live_para.style.display = "none", playarea.style.display = "none") : false;
};