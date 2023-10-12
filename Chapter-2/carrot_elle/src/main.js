'use strict';
import PopUp from './popup.js';
import Field from './field.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListener(() => {
	startGame();
});

const gameField = new Field();

gameField.onItemClick((item) => {});

gameBtn.addEventListener('click', () => {
	if (started) {
		stopGame();
	} else {
		startGame();
	}
});

gameField.addEventListener('click', onFieldClick);

function onItemClick(item) {
	if (!started) {
		return;
	}
}

function initGame() {
	score = 0;
	gameScore.innerText = CARROT_COUNT;
}

function startGame() {
	started = true;
	score = 0;
	initGame();
	showStopButton();
	showTimerAndScore();
	startGameTimer();
	playSound(bgSound);
}

function stopGame() {
	started = false;
	clearInterval(timer);
	stopGameTimer();
	hideGameButton();
	playSound(alertSound);
	gameFinishBanner.showWithText('REPLAY?');
	stopSound(bgSound);
}

function finishGame(win) {
	started = false;
	clearInterval(timer);
	hideGameButton();
	stopGameTimer();
	stopSound(bgSound);
	if (win) {
		playSound(winSound);
	} else {
		playSound(bugSound);
	}
	gameFinishBanner.showWithText(win ? 'YOU WIN!!' : 'YOU LOSE@@');
}

function showStopButton() {
	const icon = gameBtn.querySelector('.fa-solid');
	icon.classList.add('fa-stop');
	icon.classList.remove('fa-play');
	gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
	gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
	gameTimer.style.visibility = 'visible';
	gameScore.style.visibility = 'visible';
}

function startGameTimer() {
	let remainingTimeSec = GAME_DURATION_SEC;
	updateTimerText(remainingTimeSec);
	timer = setInterval(() => {
		if (remainingTimeSec <= 0) {
			clearInterval(timer);
			finishGame(CARROT_COUNT === score);
			return;
		}
		updateTimerText(--remainingTimeSec);
	}, 1000);
}

function stopGameTimer() {
	clearInterval(timer);
}

function updateTimerText(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	gameTimer.innerText = `${minutes}:${seconds}`;
}

function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}

function stopSound(sound) {
	sound.pause();
}

function updateScoreBoard() {
	gameScore.innerText = CARROT_COUNT - score;
}

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}
