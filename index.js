export function structureText(text = '') {
	const sentences = text.split('\n');
	let structuredText = [];

	for (const sentence of sentences) {
		let type;
		let value = [];
		let format = 'N';
		let part = '';
		let count = 0;

		/**
		 * Find Type
		 * # Header/Title (H1)
		 * ## Header/Title (H2)
		 * - List Item (LI)
		 */
		if (sentence.startsWith('#')) {
			type = 'H1';
		} else if (sentence.startsWith('##')) {
			type = 'H2';
		} else if (sentence.startsWith('-')) {
			type = 'LI';
		} else {
			type = 'P';
		}

		const characters = sentence
			.replace('#', '')
			.replace('##', '')
			.replace('-', '')
			.trim()
			.split(/(\*\*)|(__)/)
			.filter(c => Boolean(c));

		for (const char of characters) {
			/**
			 * Find Formats
			 * ** Bold (B)
			 * __ Italic (I)
			 */
			if (['N', 'B'].includes(format) && char === '**') {
				if (count === 0) {
					count = 1;
					value.push({ part, format });
					format = 'B';
				} else if (count === 1) {
					count = 0;
					value.push({ part, format });
					format = 'N';
				}
				part = '';
			} else if (['N', 'I'].includes(format) && char === '__') {
				if (count === 0) {
					count = 1;
					value.push({ part, format });
					format = 'I';
				} else if (count === 1) {
					count = 0;
					value.push({ part, format });
					format = 'N';
				}
				part = '';
			} else {
				part += char;
			}
		}

		Boolean(part) && value.push({ part, format });

		structuredText.push({ value, type });
	}

	return structuredText;
}
