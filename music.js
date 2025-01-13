let trackIndex = 0;
let isPlaying = false;
// Create a new audio element
let currTrack = new Audio();
const trackList = [
  { name: "Lahore", artist: "Guru randhawa", path: "musics/lahore song.mp3", video: "musics/lahore.mp4" },
  { name: "Filhal", artist: "B prag", path: "musics/filhal song.mp3", video: "musics/filhal.mp4" },
  { name: "Distance Love", artist: "Zehar vibes", path: "musics/love.mp3", video: "musics/Distance.mp4" }
];

// Function to load track details and start playback
function loadTrack(index) {
  clearInterval(currTrack.updateTimer);
  const track = trackList[index];
  currTrack.src = track.path;
  document.querySelector('.track-art').style.backgroundImage = `url(${track.image || ""})`;
  document.getElementById('track-name').textContent = track.name;
  document.getElementById('track-artist').textContent = track.artist;
  document.getElementById('track-video').src = track.video;
  document.getElementById('now-playing').textContent = `PLAYING ${index + 1} OF ${trackList.length}`;
  
  currTrack.load();
  currTrack.addEventListener("ended", nextTrack);
  currTrack.updateTimer = setInterval(updateProgress, 1000);
}

// Function to update track progress and time
function updateProgress() {
  const currentTime = currTrack.currentTime;
  const duration = currTrack.duration;
  const currentMinutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const currentSeconds = String(Math.floor(currentTime % 60)).padStart(2, '0');
  const durationMinutes = String(Math.floor(duration / 60)).padStart(2, '0');
  const durationSeconds = String(Math.floor(duration % 60)).padStart(2, '0');

  document.getElementById('current-time').textContent = `${currentMinutes}:${currentSeconds}`;
  document.getElementById('total-duration').textContent = `${durationMinutes}:${durationSeconds}`;
  document.getElementById('seek-slider').value = (currentTime / duration) * 100;
}

// Toggle between play and pause
function togglePlayPause() {
  if (isPlaying) pauseTrack();
  else playTrack();
}

// Play the current track
function playTrack() {
  currTrack.play();
  isPlaying = true;
  document.getElementById('playpause-btn').innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// Pause the current track
function pauseTrack() {
  currTrack.pause();
  isPlaying = false;
  document.getElementById('playpause-btn').innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// Skip to the next track
function nextTrack() {
  trackIndex = (trackIndex + 1) % trackList.length;
  loadTrack(trackIndex);
  playTrack();
}

// Go to the previous track
function prevTrack() {
  trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
  loadTrack(trackIndex);
  playTrack();
}

// Seek to a specific position in the track
function seekTo() {
  currTrack.currentTime = currTrack.duration * (document.getElementById('seek-slider').value / 100);
}

// Set the volume of the track
function setVolume() {
  currTrack.volume = document.getElementById('volume-slider').value / 100;
}

// Load the first track on page load
loadTrack(trackIndex);

// Attach the play/pause toggle function to the playpause button (in HTML)
document.getElementById('playpause-btn').addEventListener('click', togglePlayPause);
