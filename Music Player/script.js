const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 1;

//Update song details
const loadSong = (song) => {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
};

//Play song
const playSong = () => {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
};

//Pause song
const pauseSong = () => {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	audio.pause();
};

// Initially load song details into DOM
loadSong(songs[songIndex]);

//Event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

//Previous song
const prevSong = () => {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
};

//Next song
const nextSong = () => {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
};

//Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//update progress bar
const updateProgress = (e) => {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
};

//set progress bar
const setProgress = (e) => {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
};

//Time/song update
audio.addEventListener('timeupdate', updateProgress);

//Click on progress bar
progressContainer.addEventListener('click', setProgress);
