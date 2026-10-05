const scene = document.querySelector(".scene");
const envelope = document.querySelector("#envelope");
const instructionText = document.querySelector("#instruction-text");
const readButton = document.querySelector("#read-button");
const backButton = document.querySelector("#back-button");
const letter = document.querySelector("#letter");
const status = document.querySelector("#experience-status");
const qrButton = document.querySelector("#qr-button");
const qrDialog = document.querySelector("#qr-dialog");
const qrImage = document.querySelector("#qr-image");
const qrLink = document.querySelector("#qr-link");
const qrUrl = document.querySelector("#qr-url");
const publishedUrl = "https://shoyoremejy-pixel.github.io/teachersDay-letter/";

let openingTimer;

function openEnvelope() {
  if (scene.classList.contains("is-opening")) {
    return;
  }

  if (scene.classList.contains("is-open")) {
    showLetter();
    return;
  }

  scene.classList.add("is-opening");
  envelope.setAttribute("aria-expanded", "true");
  instructionText.textContent = "Opening your letter…";

  openingTimer = window.setTimeout(() => {
    scene.classList.remove("is-opening");
    scene.classList.add("is-open");
    instructionText.textContent = "Your letter is ready";
    readButton.hidden = false;
    status.textContent = "The envelope is open. Your letter is ready to read.";
  }, 1050);
}

function showLetter() {
  window.clearTimeout(openingTimer);
  scene.classList.remove("is-opening");
  scene.classList.add("is-open", "is-letter");
  letter.setAttribute("aria-hidden", "false");
  readButton.hidden = true;
  status.textContent = "Your Teacher’s Day letter is open.";
  backButton.focus({ preventScroll: true });
}

function closeLetter() {
  scene.classList.remove("is-opening", "is-open", "is-letter");
  letter.setAttribute("aria-hidden", "true");
  envelope.setAttribute("aria-expanded", "false");
  instructionText.textContent = "Click to open your letter";
  readButton.hidden = true;
  status.textContent = "The letter is closed.";
  envelope.focus({ preventScroll: true });
}

envelope.addEventListener("click", openEnvelope);
readButton.addEventListener("click", showLetter);
backButton.addEventListener("click", closeLetter);

qrButton.addEventListener("click", () => {
  const encodedUrl = encodeURIComponent(publishedUrl);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&format=svg&margin=8&data=${encodedUrl}`;
  qrImage.src = qrCodeUrl;
  qrLink.href = publishedUrl;
  qrUrl.href = publishedUrl;
  qrDialog.showModal();
});