const songs = [
    {
        title: "Diamond",
        artist: "Lil Wyn-95G",
        image: "148377.jpeg",
        audio: "Diamond - Lil Wuyn_ NVM_ 95G.mp3"
    },
    {
        title: "Moth to a flame",
        artist: "The Weeknd ft. Swedish House Mafia",
        image: "148811.jpeg",
        audio: "Moth To A Flame - Swedish House Mafia_ T.mp3"
    }, 
    {
        title: "Anh nghĩ em tiếc anh sao",
        artist: "SAA",
        image: "anh-nghi-em-tiec-anh-sao.jpeg",
        audio: "ANH NGHI EM TIEC ANH SAO - SAA.mp3"
    }
];

/**
 * @type {HTMLSpanElement}
 */
const currentDuration = document.querySelector("#current-duration");

/**
 * @type {HTMLSpanElement}
 */
const totalDuration = document.querySelector("#total-duration");

/**
 * @type {HTMLInputElement}
 */
const progress = document.querySelector("#progress");

/**
 * @type {HTMLButtonElement}
 */
const nextButton = document.querySelector("#next-btn");

/**
 * @type {HTMLButtonElement}
 */
const previousButton = document.querySelector("#prev-btn");

/**
 * @type {HTMLButtonElement}
 */
const playPauseButton = document.querySelector("#play-pause-btn");

/**
 * @type {HTMLHeadingElement}
 */
const songTitle = document.querySelector("#song-title");

/**
 * @type {HTMLParagraphElement}
 */
const artist = document.querySelector("#artist");

/**
 * @type {HTMLAudioElement}
 */
const audio = document.querySelector("#audio");

/**
 * @type {HTMLImageElement}
 */
const cover = document.querySelector("#cover");

let currentSongIndex = 0;
let isPlaying = false;
audio.src = `./assets/sounds/${songs[currentSongIndex].audio}`;
cover.src = `./assets/images/${songs[currentSongIndex].image}`;
songTitle.innerText = songs[currentSongIndex].title;
artist.innerText = songs[currentSongIndex].artist;

/**
 * Play/Pause the audio
 * @param {MouseEvent} ev 
 */
function playPauseMusic(ev) {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerText = "▶️";
    } else {
        audio.play();
        playPauseButton.innerText = "⏸";
    }
    isPlaying = !isPlaying;
}

playPauseButton.addEventListener("click", playPauseMusic);

/**
 * Move to next song and play
 * @param {MouseEvent} ev 
 */
function nextSong(ev) {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    audio.src = `./assets/sounds/${songs[currentSongIndex].audio}`;
    cover.src = `./assets/images/${songs[currentSongIndex].image}`;
    songTitle.innerText = songs[currentSongIndex].title;
    artist.innerText = songs[currentSongIndex].artist;

    // Play song immediately after change song
    isPlaying = false;
    playPauseMusic();
}

/**
 * Move to previous song and play
 * @param {MouseEvent} ev 
 */
function previousSong(ev) {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    audio.src = `./assets/sounds/${songs[currentSongIndex].audio}`;
    cover.src = `./assets/images/${songs[currentSongIndex].image}`;
    songTitle.innerText = songs[currentSongIndex].title;
    artist.innerText = songs[currentSongIndex].artist;

    // Play song immediately after change song
    isPlaying = false;
    playPauseMusic();
}

nextButton.addEventListener("click", nextSong);
previousButton.addEventListener("click", previousSong);

function updateProgressValue() {
    progress.max = audio.duration;
    progress.value = audio.currentTime;

    currentDuration.innerText = formatTime(audio.currentTime);

    totalDuration.innerText = formatTime(audio.duration);
}

// Update duration and progress every 500ms
setInterval(updateProgressValue, 500);

/**
 * Format total number of seconds into mm:ss
 * @param {Number} seconds number of seconds
 * @returns {String} time formatted as mm:ss
 */
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds - minutes * 60);
    if (remainingSeconds < 10) {
        remainingSeconds = `0${remainingSeconds}`;
    }
    return `${minutes}:${remainingSeconds}`
}

/**
 * Change song's progress
 * @param {Event} ev 
 */
function changeProgress(ev) {
    audio.currentTime = progress.value;
}

progress.addEventListener("change", changeProgress);




