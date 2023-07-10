const music = document.querySelector('audio');
const play = document.getElementById('play');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const pause = document.getElementById('pause');
const image = document.querySelector('img');
const progressDiv = document.getElementById('progressDiv');
const progress = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');

const title = document.getElementById('title');

let songIndex = 0;
let isPlaying = false;
//music.play();


const songs = [
    {
        name: '50cent',
        title: '50 Cent Inda Club',
    },
    {
        name: 'eminem',
        title: 'Eminem Stan',
    },
    {
        name: 'Shakira',
        title: 'Shakira waka waka',
    },

];

function loadSong(song) {
    title.textContent = song.title;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}



loadSong(songs[songIndex]);


function playSong() {
    music.play();

    play.classList.replace('fa-play', 'fa-pause');
    isPlaying = true;
}

function pauseSong() {
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    isPlaying = false;
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    isPlaying ? playSong() : pauseSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    isPlaying ? playSong() : pauseSong();
}

function updateProgressBar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : `${durationSeconds}`;
        if (durationSeconds) totalTimeSpan.textContent = `${durationMinutes}:${durationSeconds}`;

        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        currentTimeSeconds = currentTimeSeconds < 10 ? `0${currentTimeSeconds}` : `${currentTimeSeconds}`;
        if (currentTimeSeconds) currentTimeSpan.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;

    }
}

function sendProgressBar(e) {
    const width = e.srcElement.clientWidth;

    console.log(e)
    const { duration } = music;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * duration;

}

play.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressDiv.addEventListener('click', sendProgressBar);
music.addEventListener('ended', nextSong)