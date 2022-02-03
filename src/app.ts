import * as readline from 'readline';
import * as fs from 'fs';

export const loadMapPrefixWords = async (): Promise<Map<string, Array<string>>> => {

	// Open input file
	const fileStream: fs.ReadStream = fs.createReadStream('jeu_short_list.txt');

	// Create a line reader
	const lineIterator: readline.Interface = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	// Create an array of words and populate it
	const wordsList: Array<string> = []
	for await (const line of lineIterator) {
		wordsList.push(line)
	}

	// Get results of search. It can be a map with existing values or undefined if we dont find anything
	const mapPrefixWords: Map<string, Array<string>> = wordsList.reduce((previous: Map<string, Array<string>>, next: string) => {
		const addPrefixesInMap = (key: string, value: string) => {
			// If we dont find a specific prefix, we add it
			if (!previous[`'${key}'`]) {
				previous[`'${key}'`] = []
			}
			previous[`'${key}'`].push(value)
		}

		// We read all prefixes of a word and add them in map		
		for (let index: number = 1; index < next.length + 1; index++) {
			const prefix = next.substring(0, index)
			addPrefixesInMap(prefix, next)
		}

		return previous
	}, new Map<string, Array<string>>())

	return mapPrefixWords
}

export const getResults = (mapWithPrefixesAndWords: Map<string, Array<string>>, keyToSearch: string): Array<string> => {
	if (!keyToSearch || keyToSearch.length === 0) {
		return []
	}
	else {
		const result = mapWithPrefixesAndWords[`'${keyToSearch.toLowerCase()}'`]
		return result ? result : []
	}
}
