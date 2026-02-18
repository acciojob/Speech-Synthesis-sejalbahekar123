function populateVoices() {
  voices = this.getVoices();

  voicesDropdown.innerHTML = voices
    .map(voice => `
      <option value="${voice.name}">
        ${voice.name} (${voice.lang})
      </option>
    `)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);

  // Restart speech if already speaking
  if (speechSynthesis.speaking) {
    toggle(true);
  }
}

function setOption() {
  msg[this.name] = this.value;

  // Restart speech dynamically if speaking
  if (speechSynthesis.speaking) {
    toggle(true);
  }
}

function toggle(startOver = true) {
  speechSynthesis.cancel();

  if (startOver) {
    // Prevent speaking empty text
    if (!msg.text.trim()) {
      alert("Please enter some text.");
      return;
    }
    speechSynthesis.speak(msg);
  }
}

// Initialize default text
msg.text = document.querySelector('[name="text"]').value;

// Event Listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);

voicesDropdown.addEventListener('change', setVoice);

options.forEach(option => option.addEventListener('input', function () {
  if (this.name === 'text') {
    msg.text = this.value;
  } else {
    setOption.call(this);
  }
}));

speakButton.addEventListener('click', () => toggle(true));
stopButton.addEventListener('click', () => toggle(false));