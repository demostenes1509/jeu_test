import { before, describe, it } from 'mocha'
import { getResults, loadMapPrefixWords } from '../src/app'
import * as expect from 'expect'

describe('Jeu Search Test Suite', function () {

  this.timeout(0)

  let mapWithPrefixesAndWords: Map<string, Array<string>> = undefined
  before(async () => {
    mapWithPrefixesAndWords = await loadMapPrefixWords()
  })

  describe('Search words with prefix suite', async () => {
    it('Looking for an empty word', async () => {
      const results = await getResults(mapWithPrefixesAndWords, '')
      expect(results.length).toBe(0)
    })
    it('Looking for an null word', async () => {
      const results = await getResults(mapWithPrefixesAndWords, null)
      expect(results.length).toBe(0)
    })
    it('Looking for an undefined word', async () => {
      const results = await getResults(mapWithPrefixesAndWords, undefined)
      expect(results.length).toBe(0)
    })
    it('Looking for a existing complete word', async () => {
      const results = await getResults(mapWithPrefixesAndWords, 'lengthways')
      expect(results.length).toBe(1)
      expect(results).toStrictEqual(['lengthways'])
    })
    it('Looking for a NON existing word of prefix', async () => {
      const results = await getResults(mapWithPrefixesAndWords, 'maximiliano')
      expect(results.length).toBe(0)
    })
    it('Looking for a existing prefix', async () => {
      const expectedResults = ['length', 'lengthen', 'lengthened', 'lengthener', 'lengtheners', 'lengthening',
        'lengthens', 'lengther', 'lengthful', 'lengthy', 'lengthier', 'lengthiest',
        'lengthily', 'lengthiness', 'lengthly', 'lengthman', 'lengths', 'lengthsman',
        'lengthsmen', 'lengthsome', 'lengthsomeness', 'lengthways', 'lengthwise']
      const results = await getResults(mapWithPrefixesAndWords, 'length')
      expect(results.length).toBe(23)
      expect(results).toStrictEqual(expectedResults)
    })
    it('Looking for a existing complete word in mixedcases', async () => {
      const results = await getResults(mapWithPrefixesAndWords, 'LengthWays')
      expect(results.length).toBe(1)
      expect(results).toStrictEqual(['lengthways'])
    })
  })
})
