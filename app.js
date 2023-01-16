console.log('spotify');
let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    { songName: "Barsat Ki Dhun - Jubin Nautiyal", filePath: "song1.mp3", coverPath: "cover1.jpg" },
    { songName: "Afreen Afreen - Rahat F A Khan", filePath: "song2.mp3", coverPath: "cover2.jpg" },
    { songName: "Kesariya - Arijit Singh", filePath: "song3.mp3", coverPath: "cover3.jpg" },
    { songName: "Dilhara - Swagger Sharma", filePath: "song4.mp3", coverPath: "cover4.jpg" },
    { songName: "Tum Hi Ho - Arijit Singh", filePath: "song5.mp3", coverPath: "cover5.jpg" }
]
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-play');
    }
})
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})
progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        if (!audioElement.paused && audioElement.src.includes(`song${songIndex + 1}.mp3`)) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
        else {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterSongName.innerText = songs[songIndex].songName;
            if (audioElement.src.includes(`song${songIndex + 1}.mp3`) === false) {
                audioElement.currentTime = 0;
                audioElement.src = `song${songIndex + 1}.mp3`;
            }
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    })
})
document.getElementById('next').addEventListener('click', nextSong);
function nextSong() {
    if (songIndex > 3) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `song${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    if (songIndex != 0) {
        document.getElementById(`${songIndex - 1}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex - 1}`).classList.add('fa-circle-play');
    }
    else {
        document.getElementById('4').classList.remove('fa-circle-pause');
        document.getElementById('4').classList.add('fa-circle-play');
    }
}
document.getElementById('prev').addEventListener('click', previousSong);
function previousSong() {
    if (songIndex < 1) {
        songIndex = 4;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `song${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    if (songIndex != 4) {
        document.getElementById(`${songIndex + 1}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex + 1}`).classList.add('fa-circle-play');
    }
    else {
        document.getElementById('0').classList.remove('fa-circle-pause');
        document.getElementById('0').classList.add('fa-circle-play');
    }
}
audioElement.addEventListener('ended', nextSong);
