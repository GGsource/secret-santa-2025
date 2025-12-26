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
		customHTML: `
			<div style="position: relative; width: 100%; height: 100%;">
				<img src="${imageMap["keighley_code"]}" alt="Base panel" style="width: 100%; height: 100%; object-fit: contain;" />
				<div class="code-box redeem-label">
					REDEMPTION CODE:
				</div>
				<div class="code-box code-contained">
					KEIGHL-OVER-AND-DIE
				</div>
            </div>
        `,
	},
	12: {
		title: "Pog A Little",
		image: imageMap["Red_Pog"],
		text: [
			"You pog a little.",
			"It's a sweet freakin gaming code?!",
			"5 free pulls... You can do so much with FIVE PULLS...",
			"Yep. It's gaming time.",
		],
	},
	13: {
		title: "Skip the Boring Crap",
		image: imageMap["Timer_Passed"],
		text: [
			"Alright, enough of this. Let's skip to the good part.",
			"You download the game, and you and your friends are transported to a glorious realm of gaming.",
			"WE GET IT. Let's cut to the interesting part.",
		],
	},
	14: {
		title: "The Interesting Part",
		image: imageMap["LOBAS_1"],
		customHTML: `
			<div>
				<img src="${imageMap["LOBAS_1"]}"/>
				<p>You've arrived at the:</p>
				<p class="planet-title">Land of Beams and Silicone</p>
				<p>An awe inspiring urban-future world where opportunity and danger run side by side.</p>
				<p> Hope finds its ways through the alleys despite all the odds.</p>
            </div>
        `,
		scrollable: true,
	},
	15: {
		title: "Except...",
		image: imageMap["LOBAS_2"],
		customHTML: `
			<div>
				<img src="${imageMap["LOBAS_2"]}"/>
				<p>You're late to the party.</p>
				<p>Perhaps that was what LOBAS once was but a lot of time has passed since then. Perhaps all of time.</p>
				<p>You've arrived right at the tail end of this world as it crawls to its miserable death. This is the...</p>
				<p class="planet-title">Land of Brass and Sand</p>
				<p>Hope is just one of the many things that has run out of time on this world.</p>
				<p>This land is hostile. But it's not just the land.</p>
            </div>
        `,
		text: [],
		scrollable: true,
	},
	16: {
		title: "It's everything.",
		image: imageMap["Red_Owned"],
	},
	17: {
		title: "==>",
		image: imageMap["beast_needle"],
		scrollable: true,
	},
	18: {
		title: "==>",
		image: imageMap["tiny_dancer_1"],
	},
	19: {
		title: "==>",
		image: imageMap["tiny_dancer_2"],
	},
	20: {
		title: "==>",
		image: imageMap["tiny_dancer_3"],
	},
	21: {
		title: "Let's Jump Forward A Bit More",
		image: imageMap["Timer_Passed"],
		text: [
			"You quickly learned to become proficient at one thing above all else:",
			"Getting owned.",
			"Day in and day out, new beasts would come to hunt you, and each time you would just barely manage to escape in the nick of time.",
			"Eventually, you became accustomed to the struggle. Slowly, you learned to adapt.",
		],
	},
	22: {
		title: "Some Time Later: At The Market",
		image: imageMap["merchants_2"],
		text: [
			"You've saved up after some time on this rock, and you're feeling your purse a bit heavy. So you've endeavored to purchase goods!",
		],
	},
	23: {
		title: "Buy Something",
		image: imageMap["merchants"],
		text: [
			"How strange that these merchants don't have a shop table.",
			"You ask the proper mole what wears he sells. He simply says nothing is for you.",
			"The Swine in turn takes your valuables, and in return he pays you with knowledge.",
		],
	},
	24: {
		title: "Receive Enlightenment",
		image: imageMap["merchants_3"],
		text: [
			"The swine does not open his snout, but he speaks into you all the same.",
			"He tells you that time is up.",
			"He tells you that he knows what you are.",
			"He tells you that the Hunter has come from far away to find you, and this is the end of the road.",
			"Time Abberations such as yourself are not welcome in this world, after all, your kind are why its fallen on such hard times.",
		],
	},
	25: {
		title: "Ask What a Time Abberation Is",
		image: imageMap["merchants_3"],
		text: [
			"As you speak, you find the knowledge has already been deposited snugly between your neurons.",
			"Time Abberations are what the citizens of LOBAS call creatures like yourself.",
			"Creatures outside of this time, creatures that cause problems by existing here.",
			"Creatures that need to be eradicated.",
			"The Needle of the Dunes, the Leo of the Steppes, all the Beasts of Brass that roam this world, are caused by your kind.",
		],
	},
	26: {
		title: "Thankfully This World Is Protected",
		text: [
			"Thankfully there is something out there worse than you.",
			"Thankfully it has found you.",
			"The Time Hunter is here. Good luck.",
		],
	},
	27: {
		title: "==>",
		image: imageMap["hunter_1"],
		scrollable: true,
	},
	28: {
		title: "==>",
		image: imageMap["hunter_2"],
		scrollable: true,
	},
	29: {
		title: "He Removes His Cloak",
		image: imageMap["hunter_3"],
		scrollable: true,
	},
	30: {
		title: "He Removes His Hood",
		image: imageMap["hunter_4"],
		scrollable: true,
	},
	31: {
		title: "Time Has Run Out",
		image: imageMap["hunter_5"],
		scrollable: true,
	},
	32: {
		title: "Swipe",
		image: imageMap["swipe"],
		scrollable: true,
	},
	33: {
		title: "==>",
		text: ["That's all. You will receive 7 games within the next several hours at 5 minute intervals. Good luck"],
	},
};

export function getNextPageTitle(currentPage: number): string | null {
	const nextPage = pages[currentPage + 1];
	return nextPage ? nextPage.title : null;
}
