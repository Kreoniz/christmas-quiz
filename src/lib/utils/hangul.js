const SBase = 0xac00;
const LBase = 0x1100;
const VBase = 0x1161;
const TBase = 0x11a7;
const LCount = 19;
const VCount = 21;
const TCount = 28;
const NCount = VCount * TCount;
const SCount = LCount * NCount;

const InitialConsonants = [
	'ㄱ',
	'ㄲ',
	'ㄴ',
	'ㄷ',
	'ㄸ',
	'ㄹ',
	'ㅁ',
	'ㅂ',
	'ㅃ',
	'ㅅ',
	'ㅆ',
	'ㅇ',
	'ㅈ',
	'ㅉ',
	'ㅊ',
	'ㅋ',
	'ㅌ',
	'ㅍ',
	'ㅎ'
];
const MedialVowels = [
	'ㅏ',
	'ㅐ',
	'ㅑ',
	'ㅒ',
	'ㅓ',
	'ㅔ',
	'ㅕ',
	'ㅖ',
	'ㅗ',
	'ㅘ',
	'ㅙ',
	'ㅚ',
	'ㅛ',
	'ㅜ',
	'ㅝ',
	'ㅞ',
	'ㅟ',
	'ㅠ',
	'ㅡ',
	'ㅢ',
	'ㅣ'
];
const FinalConsonants = [
	null,
	'ㄱ',
	'ㄲ',
	'ㄳ',
	'ㄴ',
	'ㄵ',
	'ㄶ',
	'ㄷ',
	'ㄹ',
	'ㄺ',
	'ㄻ',
	'ㄼ',
	'ㄽ',
	'ㄾ',
	'ㄿ',
	'ㅀ',
	'ㅁ',
	'ㅂ',
	'ㅄ',
	'ㅅ',
	'ㅆ',
	'ㅇ',
	'ㅈ',
	'ㅊ',
	'ㅋ',
	'ㅌ',
	'ㅍ',
	'ㅎ'
];

function isSyllable(syllable) {
	const codepoint = syllable.codePointAt(0) - SBase;
	return 0 <= codepoint && codepoint < SCount;
}

export function decomposeSyllable(syllable) {
	if (syllable.length !== 1) {
		return syllable;
	}

	if (!isSyllable(syllable)) {
		return syllable;
	}
	const codepoint = syllable.codePointAt(0);

	const SIndex = codepoint - SBase;

	const LIndex = Math.floor(SIndex / NCount);
	const VIndex = Math.floor((SIndex % NCount) / TCount);
	const TIndex = SIndex % TCount;

	const LPart = LBase + LIndex;
	const VPart = VBase + VIndex;
	const TPart = TIndex > 0 ? TBase + TIndex : null;

	const parts = [String.fromCodePoint(LPart), String.fromCodePoint(VPart)];

	if (TPart !== null) {
		parts.push(String.fromCodePoint(TPart));
	}

	return parts;
}

export function composeSyllable(string) {
	const [LPart, VPart, TPart] = string.slice(0, 3).split('');
	const LIndex = InitialConsonants.indexOf(LPart);
	const VIndex = MedialVowels.indexOf(VPart);
	const TIndex = TPart ? FinalConsonants.indexOf(TPart) : null;
	const LVIndex = LIndex * NCount + VIndex * TCount;

	const syllable = SBase + LVIndex + TIndex;

	return String.fromCodePoint(syllable);
}
