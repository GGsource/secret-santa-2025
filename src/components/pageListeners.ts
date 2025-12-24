export function attachPageListeners() {
	const audioButton = document.getElementById("audio-play-button");
	if (audioButton) {
		const audioFile = document.getElementById("audio-file") as HTMLAudioElement;
		audioButton.addEventListener("click", () => {
			const worlPremie = document.getElementById("worl-premie");
			const nextButton = document.getElementById("next");
			if (audioFile && worlPremie) {
				if (audioFile.paused) {
					audioFile.play();
					audioButton.textContent = "⏸️";
					worlPremie.classList.add("show");
					if (nextButton) {
						nextButton.classList.add("show"); // Fade in next button too!
					}
				} else {
					audioFile.pause();
					audioButton.textContent = "▶️";
				}
			}
		});

		// Reset button when audio ends
		if (audioFile) {
			audioFile.addEventListener("ended", () => {
				audioButton.textContent = "▶️";
			});
		}
	}
}
