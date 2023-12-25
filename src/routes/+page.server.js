function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function load() {
	const randomCat = 'cat' + getRandomInt(1, 4);
	return {
		cat: randomCat
	};
}
