function playMusic() {
	const playBtn = document.querySelector('#tools__playBtn');
	const music = document.querySelector('#music');
	playBtn.addEventListener('click', () => {
		music.innerHTML = `
    <audio autoplay src="sound/bg.mp3"></audio>
    `;
	});
}

playMusic();
