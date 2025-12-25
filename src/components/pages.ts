// Import the full on custom pages
import page7HTMLRaw from "../pages/page_7.html?raw";
import page9HTMLRaw from "../pages/page_9.html?raw";
import page10HTMLRaw from "../pages/page_10.html?raw";
export type ComicPage = {
	title: string;
	image?: string;
	customHTML?: string; // Raw HTML for complex layouts
	text?: string | string[]; // Can be a single string or array of strings
	scrollable?: boolean;
};

// Import all image types
const images = import.meta.glob("../assets/images/*.{png,gif,webp}", {
	eager: true,
	import: "default",
});

// Import all audio types
const audios = import.meta.glob("../assets/audio/*.{mp3,wav,ogg}", {
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

// Map filenames to simpler keys for audio
const audioMap: Record<string, string> = {};
for (const path in audios) {
	const fileName = path
		.split("/")
		.pop()!
		.replace(/\.(mp3|wav|ogg)$/, "");
	audioMap[fileName] = audios[path] as string;
}

// Generic injection function injecting any assets into HTML content
function injectAssets(html: string, assets: Record<string, string>): string {
	return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		return assets[key] || match;
	});
}

// The page layouts
export const pages: Record<number, ComicPage> = {
	1: {
		title: "IT KEEPS HAPPENING",
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
		text: "removing progress...",
	},
	4: {
		title: "Remove Progress",
		image: imageMap["HS_Mage_Of_Time_OW_Sprite"],
		text: "It's about time to erase all of these years of introspection and character growth. Tis a shame, if only that mouth knew when to keep shut! Maybe you wouldn't be in this situation 😔",
	},
	5: {
		title: "Turn Back Time",
		customHTML: `
            <div style="position: relative; width: 100%; height: 100%;">
                <img src="${imageMap["Timer"]}" alt="Base panel" style="width: 100%; height: 100%; object-fit: contain;" />
                <img class="spinning" src="${imageMap["Timer_Hour"]}" alt="Overlay panel" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;" />
                <img class="spinning--fast" src="${imageMap["Timer_Minute"]}" alt="Overlay panel" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain;" />
            </div>
        `,
	},
	6: {
		title: "That's About Enough",
		image: imageMap["Red"],
		text: ["Welcome back champ.", "Where were we?"],
	},
	7: {
		title: "Quick recap",
		customHTML: injectAssets(page7HTMLRaw, {
			...imageMap,
			...audioMap,
		}),
		scrollable: true,
	},
	8: {
		title: "SBURB: Update 5.0",
		image: imageMap["sburb"],
		text: ["The new SBURB Update is dropping!", "Wown!", "Who could have forseen such a miraculous turn of events?!"],
	},
	9: {
		title: "Check What's New",
		image: imageMap["keighley_cam"],
		customHTML: injectAssets(page9HTMLRaw, {
			...imageMap,
			...audioMap,
		}),
		scrollable: true,
	},
	10: {
		title: "Lean In Closer For Geoff's Heartfelt Truth",
		image: imageMap["keighley_contempt"],
		customHTML: injectAssets(page10HTMLRaw, { ...imageMap, ...audioMap }),
		scrollable: true,
	},
	11: {
		title: "Get Some Friggin Sweet Loot...",
		// TODO: Make a little copy thing for the free pulls code, which then has to be entered later when on the planet to redeem.
	},
};

export function getNextPageTitle(currentPage: number): string | null {
	const nextPage = pages[currentPage + 1];
	return nextPage ? nextPage.title : null;
}
