import { decomposeSyllable } from '$lib/utils/hangul.js';

export function koreanTypewriter(node, { speed = 1 }) {
	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent;
	const decomposed = [];
	let jamos = '';

	for (let i = 0; i < text.length; i++) {
		decomposed.push(decomposeSyllable(text[i]));
	}

	for (let i = 0; i < decomposed.length; i++) {
		for (let j = 0; j < decomposed[i].length; j++) {
			jamos += decomposed[i][j];
		}
	}

	const duration = jamos.length / (speed * 0.01);

	return {
		duration,
		tick: (t) => {
			const i = Math.trunc(jamos.length * t);
			node.textContent = jamos.slice(0, i);
		}
	};
}
