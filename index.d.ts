type StructuredText = {
	type: 'H1' | 'H2' | 'LI' | 'P';
	value: Array<{
		part: string;
		format: 'N' | 'B' | 'I' | 'A';
		meta?: string;
	}>;
};

export function structureText(text: string): Array<StructuredText>;
