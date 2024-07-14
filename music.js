const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = document.getElementById('play-pause-icon');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const songTitle = document.getElementById('song-title');

const songs = [
    { title: 'Dil ne ye kha h dil se', file: 'music/song1.mp3' },
    { title: 'Tere sang-With you', file: 'music/song2.mp3' },
    { title: 'World deced mexico', file: 'music/song3.mp3' },
    // Add more songs here
];

let currentSongIndex = 0;

function loadSong(song) {
    audio.src = song.file;
    songTitle.textContent = song.title;
}

function playSong() {
    audio.play();
    playPauseIcon.classList.remove('fa-play');
    playPauseIcon.classList.add('fa-pause');
}

function pauseSong() {
    audio.pause();
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
}

function togglePlayPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function updateProgress() {    
const { duration, currentTime } = audio;
progress.value = (currentTime / duration) * 100;
currentTimeElem.textContent = formatTime(currentTime);
durationElem.textContent = formatTime(duration);
    
}

function setProgress() {
    const duration = audio.duration;
    audio.currentTime = (progress.value / 100) * audio.duration;
}

function updateVolume() {
    audio.volume = volume.value / 100;
    volumeIcon.classList.toggle('fa-volume-mute', audio.volume === 0);
    volumeIcon.classList.toggle('fa-volume-up', audio.volume > 0);
}
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('change', setProgress);
volume.addEventListener('input', updateVolume);

loadSong(songs[currentSongIndex]);
