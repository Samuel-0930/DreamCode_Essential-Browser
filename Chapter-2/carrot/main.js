const playBtn = document.querySelector('#tools__playBtn');
const music = document.querySelector('#music');
const clock = document.querySelector('#tools__timer');
const img = playBtn.querySelector('i');
let isPlay = false;
let interval;

function playBtnChange() {
	const img = playBtn.querySelector('i');
	if (img.id === 'play') {
		img.className = 'fa-solid fa-stop';
		img.id = 'stop';
	} else {
		img.className = 'fa-solid fa-play';
		img.id = 'play';
	}

	return !isPlay;
}

function playMusic() {
	if (isPlay === true) {
		music.innerHTML = `
    <audio autoplay src="sound/bg.mp3"></audio>
    `;
	} else {
		music.innerHTML = ``;
	}
}

function timer(isPlay, interval) {
	if (isPlay === true) {
		let i = 10;

		clock.innerText = `00:${i}`;
		i--;

		interval = setInterval(() => {
			if (i < 0) {
				clearInterval(interval);
			} else if (i === 10) {
				clock.innerText = `00:${i}`;
				i--;
			} else if (i !== 10) {
				clock.innerText = `00:0${i}`;
				i--;
			}
		}, 1000);
		return interval;
	} else {
		clearInterval(interval);
		clock.innerText = `00:00`;
	}
}

function playGame() {
	playBtn.addEventListener('click', () => {
		isPlay = playBtnChange();
		playMusic(isPlay);
		interval = timer(isPlay, interval);
	});
}

playGame();
