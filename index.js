const body = document.getElementsByTagName("html")[0];
import songs from "./songs.js";
const song = document.getElementById("song");

// Countdown elements
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

// Next year element
const nextYearEl = document.getElementById("next-year");

// Music element
const playingEl = document.getElementById("playing");

// API Link
const url =
    "https://api.unsplash.com/search/photos/?client_id=uZRS5NNoUW_VgyyGyklNRvqNZ3AU7lop1KE1pq2x6l8&query=winter%20background&per_page=20&orientation=landscape";

// Handle Songs
function switchSong() {
    const randomAudio = songs[Math.floor(Math.random() * songs.length)];
    song.src = randomAudio.path;
    song.play();
    playingEl.textContent = `${randomAudio.title} - ${randomAudio.author}`;
}

song.addEventListener("ended", function () {
    switchSong();
});

switchSong();
song.play();

// Handle background changes

async function setImage() {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results[1].urls.regular);
    const imageUrl =
        data.results[Math.floor(Math.random() * data.results.length)].urls
            .regular;
    return imageUrl;
}

setInterval(() => {
    setImage().then((url) => {
        body.style.background = `url(${url}) center / 100% no-repeat`;
    });
}, 10000);

// Handle countdown

function setCountdown() {
    setInterval(() => {
        const nextYearDate = new Date("1 January 2024");
        const currentDate = new Date();
        const timeDifference = nextYearDate.getTime() - currentDate.getTime();
        if (timeDifference < 0) {
            dayEl.textContent = "HAP";
            hourEl.textContent = "PY";
            minuteEl.textContent = "NEW";
            secondEl.textContent = "YEAR!";
            nextYearEl.textContent = "🎉2024🎉";
            return;
        }
        const daysLeft = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        const hoursLeft = Math.floor(
            (timeDifference % (1000 * 24 * 60 * 60)) / (1000 * 60 * 60)
        );
        const minutesLeft = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

        dayEl.textContent = `${daysLeft < 10 ? "0" : ""}${daysLeft}`;
        hourEl.textContent = `${hoursLeft < 10 ? "0" : ""}${hoursLeft}`;
        minuteEl.textContent = `${minutesLeft < 10 ? "0" : ""}${minutesLeft}`;
        secondEl.textContent = `${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;

        nextYearEl.textContent = nextYearDate.getFullYear();
    }, 1000);
}
setCountdown();
