//------ VARIABLES ------
const elementsToAnimate = [
  document.body,
  ...document.querySelectorAll(".conlinks, .coninfo, .conaudio"),
];

// Gatito saltador
const jumper = document.getElementById("jumper");
const preloadImages = () => {
  const img1 = new Image();
  img1.src = "./catblob_play.gif";
  const img2 = new Image();
  img2.src = "./catblob_stop.gif";
};

// Audio control
let audioctrlPrev = document.getElementById("audioctrlPrev");
let audioctrlPlay = document.getElementById("audioctrlPlay");
let audioctrlNext = document.getElementById("audioctrlNext");
const toggleAudioPlay = document.getElementById("toggleAudioPlay");
const toggleAudioStop = document.getElementById("toggleAudioStop");

const btn = document.getElementsByClassName("btn");

// Theme Changer
const flavor = ["Default", "Ocean", "Wine", "Old", "Carbon"];
const flavorName = document.getElementById("flavorname");
const themePrev = document.getElementById("themePrev");
const themeNext = document.getElementById("themeNext");
const body = document.body;

// Carga el tema o usa Default
let flavorIndex = flavor.indexOf(localStorage.getItem("flavor"));
if (flavorIndex === -1) flavorIndex = 0; // Default si no encuentra

// Changes theme to saved theme
function flavorChange(newIndex) {
  // Asegura que el index este dentro del rango
  newIndex = (newIndex + flavor.length) % flavor.length;

  // Remove all flavor classes from body
  body.classList.remove(...flavor.filter((f) => f !== "Default")); // Don't remove "Default" class

  // If not Default, add the new class
  if (flavor[newIndex] !== "Default") {
    body.classList.add(flavor[newIndex]);
  }

  // Update display and save
  flavorName.textContent = flavor[newIndex];
  localStorage.setItem("flavor", flavor[newIndex]);

  // Update global index
  flavorIndex = newIndex;
}

themeNext.addEventListener("click", () => {
  flavorChange(flavorIndex + 1);
});

themePrev.addEventListener("click", () => {
  flavorChange(flavorIndex - 1);
});

// Agrega el flavor guardado
flavorChange(flavorIndex);

// --------- FIN DE VARIABLES ---------

// Por que <Audio> me deja un gap feo
var sound = new Howl({
  src: ["miniweb/music.ogg", "miniweb/music.mp3"],
  autoplay: false,
  loop: true,
  volume: 0.5,
  html5: false,
  // Para hacer el loop perfecto sin gap
  onend: function () {
    restartLoop();
  },
});

// Esto es para que el intervalo sea perfecto
setInterval(() => {
  if (sound.playing() && sound.seek() >= 19.266) {
    sound.seek(0);
  }
}, 50);

// Esto es para que se reproduzca musica
// sound.play();

//----- Control de audio

let isPlaying = false;
audioctrlPlay.addEventListener("click", () => {
  if (!isPlaying) {
    sound.play();
    audioctrlPlay.classList.remove("toggleAudioStop");
    audioctrlPlay.classList.add("toggleAudioPlay");
    jumper.classList.remove("catblobStand");
    jumper.classList.add("catblobJump");
    elementsToAnimate.forEach((element) => {
      element.classList.add("bgmove");
    });
  } else {
    sound.stop();
    audioctrlPlay.classList.remove("toggleAudioPlay");
    audioctrlPlay.classList.add("toggleAudioStop");
    jumper.classList.remove("catblobJump");
    jumper.classList.add("catblobStand");
    //elementsToAnimate.forEach((element) => {
    //  element.classList.remove("bgmove");
    //});
  }
  isPlaying = !isPlaying; // Alternar el estado
});

// SFX Botones
var sfx = document.getElementById("SFX1");

function sfxMouse() {
  sfx.volume = 0.03;
  document.getElementById("SFX1").play();
}
