// Import the full on custom pages
import page7HTML from "../pages/page_7.html?raw";

export type ComicPage = {
	title: string;
	image?: string;
	customHTML?: string; // Raw HTML for complex layouts
	text?: string | string[]; // Can be a single string or array of strings
};

// Import all image types
const images = import.meta.glob("../assets/images/*.{png,gif,webp}", {
	eager: true,
	import: "default",
});

// Map filenames to simpler keys
const imageMap: Record<string, string> = {};
for (const path in images) {
	// Remove any extension (.png, .gif, .webp)
	const fileName = path
		.split("/")
		.pop()!
		.replace(/\.(png|gif|webp)$/, "");
	imageMap[fileName] = images[path] as string;
}

export const pages: Record<number, ComicPage> = {
	1: {
		title: "==> IT KEEPS HAPPENING",
		image: imageMap["1"],
		text: "Yeag. I warned you bro.",
	},
	2: {
		title: "Abd it keeps happening. Regardless",
		image: imageMap["2"],
		text: "Your actions have consequences.",
	},
	3: {
		title: "==>",
		customHTML: `
		<img src="${imageMap["sip"]}" style="width: auto; height: auto; max-width: none; max-height: none;" />
			`,
		text: "removing progress",
	},
	4: {
		title: "==>",
		image: imageMap["HS_Mage_Of_Time_OW_Sprite"],
		text: "It's about time to erase all of these years of introspection and character growth. Tis a shame, if only that mouth knew when to keep shut! Maybe you wouldn't be in this situation 😔",
	},
	5: {
		title: "Turn back time",
		customHTML: `
            <div style="position: relative; width: 100%; height: 100%;">
                <img src="${imageMap["Timer"]}" alt="Base panel" style="width: 100%; height: 100%; object-fit: contain;" />
                <img class="spinning" src="${imageMap["Timer_Hour"]}" alt="Overlay panel" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;" />
                <img class="spinning--fast" src="${imageMap["Timer_Minute"]}" alt="Overlay panel" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;" />
            </div>
        `,
	},
	6: {
		title: "That's about enough",
		image: imageMap["Red"],
		text: ["Welcome back champ.", "Where were we?"],
	},
	7: {
		title: "Quick recap",
		customHTML: page7HTML,
	},
};

export function getNextPageTitle(currentPage: number): string | null {
	const nextPage = pages[currentPage + 1];
	return nextPage ? nextPage.title : null;
}
