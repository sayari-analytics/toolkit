import { noop, boundNumber, lengthOf, parseIntOr, shallowEquals } from '~src'

describe('[COMMON]', () => {
  test('shallowEquals', () => {
    expect(shallowEquals([10], [10])).toBe(true)
    expect(shallowEquals([5, '10', 'FIFTEEN'], [5, '10', 'FIFTEEN'])).toBe(true)
    expect(shallowEquals([], [1, 2, 3, 4])).toBe(false)
    expect(shallowEquals([], [])).toBe(true)
  })

  test('boundNumber', () => {
    expect(boundNumber(10, 20, 13)).toBe(13)
    expect(boundNumber(10, 20, 19)).toBe(19)
    expect(boundNumber(10, 20, 5)).toBe(10)
    expect(boundNumber(10, 20, 23)).toBe(20)
  })

  test('parseIntOr', () => {
    expect(parseIntOr('100', 50)).toBe(100)
    expect(parseIntOr('Invalid', 50)).toBe(50)
    expect(parseIntOr('375', 100)).toBe(375)
  })

  test('lengthOf', () => {
    expect(lengthOf({ 1: null, 2: null, 3: null })).toBe(3)
    expect(lengthOf({})).toBe(0)
  })

  test('noop', () => {
    expect(noop()).toBeUndefined()
    expect(noop(1, 2, 3, 4)).toBeUndefined()
    expect(noop({ hello: 'this', will: 'never', ever: 'return' })).toBeUndefined()
  })
})
