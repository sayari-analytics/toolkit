import {
  compareSets,
  concatSet,
  copySet,
  filterSet,
  mapSet,
  pushSet,
  reduceSet,
  toggleSetItem,
} from '~src/sets'

const numsA = ['one', 'two', 'three', 'four', 'five'] as const
const setA = new Set(numsA)

const numsB = ['six', 'seven', 'eight', 'nine', 'ten'] as const
const setB = new Set(numsB)

describe('[SETS]', () => {
  describe('copySet', () => {
    const copied = copySet(setA)
    it('returns a new set in memory', () => {
      expect(setA === copied).toBe(false)
    })
    it('copies all items exactly', () => {
      expect(copied.size).toBe(setA.size)
      expect(numsA.every((item) => copied.has(item))).toBe(true)
    })
  })

  describe('filterSet', () => {
    it('removes item based on callback', () => {
      const filtered = filterSet((x) => x !== numsA[2], setA)
      expect(filtered.has(numsA[2])).toBe(false)
      expect(filtered.size).toBe(4)
    })
  })

  describe('reduceSet', () => {
    it('reduces set to a single value', () => {
      expect(reduceSet((accu, item) => accu + item, setA, '')).toBe(numsA.join(''))
    })
  })

  describe('mapSet', () => {
    it('changes each value based on callback', () => {
      const mapped = mapSet((item) => `map_${item}`, setA)
      expect(numsA.every((item) => mapped.has(`map_${item}`))).toBe(true)
    })
  })

  describe('concatSet', () => {
    it('joins two sets together', () => {
      const combined = concatSet(setA, setB)
      expect(
        numsA.every((item) => combined.has(item)) && numsB.every((item) => combined.has(item))
      ).toBe(true)
    })
  })

  describe('pushSet', () => {
    it('adds one element to set', () => {
      const pushSix = pushSet(setA, numsB[0])
      expect(pushSix.has(numsB[0])).toBe(true)
    })
    it('adds several elements to set', () => {
      const pushAll = pushSet(setA, ...numsB)
      expect(
        numsB.every((item) => pushAll.has(item)) && numsA.every((item) => pushAll.has(item))
      ).toBe(true)
    })
  })

  describe('compareSets', () => {
    it('returns true when sets are the same', () => {
      expect(compareSets(setA, new Set(numsA))).toBe(true)
    })
    it('returns false when sets are different', () => {
      expect(compareSets(setA, setB)).toBe(false)
    })
  })

  describe('toggleSetItem', () => {
    it('adds an item to a set if it does not exist already', () => {
      const added = toggleSetItem(setA, numsB[0])
      expect(added.has(numsB[0])).toBe(true)
    })
    it('removes an item from a set if it already exists', () => {
      const removed = toggleSetItem(setA, numsA[0])
      expect(removed.has(numsA[0])).toBe(false)
    })
  })
})
