'use strict';
const words = [
    'apple', 'banana', 'cherry', 'orange', 'pear', 'grape', 'kiwi', 'mango', 'melon', 'strawberry',
    'toyota', 'honda', 'ford', 'chevrolet', 'bmw', 'mercedes', 'audi', 'volkswagen', 'nissan', 'jeep',
    'lion', 'tiger', 'elephant', 'giraffe', 'zebra', 'monkey', 'kangaroo', 'panda', 'koala', 'penguin',
    'table', 'chair', 'sofa', 'bed', 'desk', 'wardrobe', 'lamp', 'mirror', 'clock', 'rug',
    'planet', 'star', 'galaxy', 'asteroid', 'comet', 'nebula', 'universe', 'cosmos', 'orbit', 'blackhole'
  ];

const wordElement = document.querySelector('.word');
const userInput = document.querySelector('.userInput');
const timeElement = document.querySelector('.time');
const scoreElement = document.querySelector('.currentScore');
const startBtn = document.querySelector('.startBtn');
const resetBtn = document.querySelector('.resetBtn');
const stopBtn = document.querySelector('.stopBtn');
const backgroundMusic = document.querySelector('#backgroundMusic');

let time = 99;
let score = 0;
let isPlaying = false;
let wordIndex;
let timerInterval;

function init() {
  showWord();
  timerInterval = setInterval(updateTime, 1000);
  userInput.addEventListener('input', startMatch);
}

const playMusicBtn = document.querySelector('.playMusicBtn');
playMusicBtn.addEventListener('click', function() {
  backgroundMusic.play();
});


const stopMusicBtn = document.querySelector('.stopMusicBtn');
stopMusicBtn.addEventListener('click', function() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});

function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    startBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    stopBtn.style.display = 'inline-block';
    time = 100;
    score = 0;
    scoreElement.textContent = score;
    showWord();
    userInput.style.display = 'block';
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    scoreElement.style.display = 'inline';
    init();
  }
}


function resetGame() {
  score = 0;
  scoreElement.textContent = score;
  time = 100;
  timeElement.textContent = time;
  userInput.value = '';
  showWord();
  isPlaying = false;
  clearInterval(timerInterval);
  startBtn.style.display = 'inline-block';
  stopBtn.style.display = 'none';
  wordElement.textContent = '';
}


function stopGame() {
  isPlaying = false;
  clearInterval(timerInterval);
  stopBtn.style.display = 'none';
  startBtn.style.display = 'inline-block';
  resetBtn.style.display = 'inline-block';
  wordElement.textContent = 'Game Stopped';
  userInput.disabled = true;
}


function updateTime() {
  time--;
  timeElement.textContent = time;

  if (time <= 10) {
    timeElement.style.color = '#ff0000'; 
  } else {
    timeElement.style.color = ''; 
  }

  if (time === 0) {
    clearInterval(timerInterval);
    timeElement.textContent = 'Time Up!';
    stopGame();
  }
}

function showWord() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * words.length);
  } while (newIndex === wordIndex);

  wordIndex = newIndex;
  wordElement.textContent = words[wordIndex];
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    score++;
    scoreElement.textContent = score;
    showWord();
    userInput.value = '';
  }
}


function matchWords() {
  if (userInput.value.toLowerCase() === wordElement.textContent.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}


startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
stopBtn.addEventListener('click', stopGame);