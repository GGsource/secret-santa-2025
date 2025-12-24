import { pages, getNextPageTitle } from "./components/pages"; // Our pages' contents file
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

	document.getElementById("comic-title")!.textContent = "Uh oh...";

	document.getElementById("comic-image")!.textContent = `You attempt to access page ${requested}, but it does not exist.
		<div class="spacer"></div>	
		<p>Somehow, you've become lost.</p>
		<div class="spacer"></div>
		<p>You're... in the right place, but not at the right time...</p>
		<div class="spacer"></div>
		<p>I hope you can find your way back.</p>`;
	const comicImage = document.getElementById("comic-image") as HTMLImageElement;
	comicImage.style.display = "none";

	const prev = document.getElementById("prev") as HTMLAnchorElement;
	const next = document.getElementById("next") as HTMLAnchorElement;

	prev.style.display = "none";
	next.style.display = "none";
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

	const prev = document.getElementById("prev") as HTMLAnchorElement;
	const next = document.getElementById("next") as HTMLAnchorElement;

	prev.href = `/${pageNum - 1}`;
	next.href = `/${pageNum + 1}`;

	const nextTitle = getNextPageTitle(pageNum);
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
		} else {
			next.style.opacity = "1";
			next.style.visibility = "visible";
			next.style.transition = "";
		}
	} else {
		next.style.visibility = "hidden";
	}

	prev.style.visibility = pages[pageNum - 1] ? "visible" : "hidden";
}

document.addEventListener("DOMContentLoaded", () => {
	renderPage(getPageNumber());
});
