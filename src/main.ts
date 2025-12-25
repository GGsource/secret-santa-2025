import { pages, getNextPageTitle } from "./components/pages"; // Our pages' contents file
import { attachPageListeners } from "./components/pageListeners";
import "./assets/styles/main.css";

function getPageNumber(): number {
	const path = window.location.pathname;

	// "/" or "" → page 1
	if (path === "/" || path === "") return 1;

	// "/2" → 2
	const num = parseInt(path.replace("/", ""), 10);
	return isNaN(num) ? 1 : num;
}

function render404(requested: number) {
	document.body.classList.add("is-404"); // Style as 404 page
	document.body.classList.remove("scrollable-page");

	document.getElementById("comic-title")!.textContent = "Uh oh...";

	document.getElementById("comic-panel")!.innerHTML = `
	<div style = "
	display:flex;
	flex-direction:column;
	align-items: center;
	text-align: center;
	">
		<p>You attempt to access page ${requested}, but it does not exist.</p>
		<p></p>
		<p>Somehow, you've become lost.</p>
		<p>You're... in the right place, but not at the right time...</p>
		<p>I hope you can find your way back.</p>
	</div>`;

	const prev = document.getElementById("prev") as HTMLAnchorElement;
	const next = document.getElementById("next") as HTMLAnchorElement;

	prev.style.visibility = "hidden";
	next.style.visibility = "hidden";
}

function renderPage(pageNum: number) {
	document.body.classList.remove("is-404");
	const page = pages[pageNum];
	if (!page) {
		render404(pageNum);
		return;
	}

	document.getElementById("comic-title")!.textContent = page.title;

	const panel = document.getElementById("comic-panel");
	if (panel) {
		panel.innerHTML = ""; // Clear previous content!

		if (page.scrollable) document.body.classList.add("scrollable-page"); // Make it scrollable if marked such

		if (page.customHTML) {
			let customDiv = document.createElement("div");
			customDiv.style.width = "100%";
			customDiv.style.height = "100%";
			customDiv.style.display = "flex";
			customDiv.style.justifyContent = "center";
			customDiv.style.alignItems = "center";
			customDiv.innerHTML = page.customHTML;
			panel.appendChild(customDiv);
		} else if (page.image) {
			const img = document.createElement("img");
			img.id = "comic-image";
			img.style.display = "block";
			img.src = page.image;
			img.alt = "Comic panel";
			panel.appendChild(img);
		}
	}

	// Handle text
	const textElement = document.getElementsByClassName("comic-text")[0];
	if (textElement) {
		if (Array.isArray(page.text)) {
			textElement.innerHTML = page.text.map((line) => `<p>${line}</p>`).join("");
		} else if (page.text) {
			textElement.textContent = page.text;
		} else {
			textElement.textContent = ""; // Clear if no text
		}
	}

	attachPageListeners();

	const prev = document.getElementById("prev") as HTMLAnchorElement;
	const next = document.getElementById("next") as HTMLAnchorElement;

	prev.href = `/${pageNum - 1}`;
	next.href = `/${pageNum + 1}`;

	const nextTitle = getNextPageTitle(pageNum);

	// Remove fade-in class first (in case coming from another page)
	next.classList.remove("fade-in", "show");

	if (nextTitle) {
		next.textContent = nextTitle;

		if (pageNum === 5) {
			next.style.opacity = "0";
			next.style.visibility = "hidden";
			next.style.transition = "opacity 2s ease-in";
			setTimeout(() => {
				next.style.visibility = "visible";
				setTimeout(() => {
					next.style.opacity = "1";
				}, 10);
			}, 9000);
		} else if (pageNum === 7) {
			// Start completely hidden
			next.style.visibility = "hidden";
			next.style.opacity = "0";
			next.style.transition = "";

			// Then add the fade-in class after a tiny delay
			setTimeout(() => {
				next.classList.add("fade-in");
				next.style.opacity = "";
				next.style.visibility = "";
			}, 10);
		} else {
			// Normal pages - show immediately
			next.style.opacity = "1";
			next.style.visibility = "visible";
			next.style.transition = "";
		}
	} else {
		// No next page - hide it
		next.style.visibility = "hidden";
	}

	prev.style.visibility = pages[pageNum - 1] ? "visible" : "hidden";
}

document.addEventListener("DOMContentLoaded", () => {
	renderPage(getPageNumber());
});
