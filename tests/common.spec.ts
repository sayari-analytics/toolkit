import { boundNumber, parseIntOr, shallowEquals } from '~src'

describe('[shallowEquals]', () => {
  it('works', () => {
    expect(shallowEquals([10], [10])).toBe(true)
    expect(shallowEquals([5, '10', 'FIFTEEN'], [5, '10', 'FIFTEEN'])).toBe(true)
    expect(shallowEquals([], [1, 2, 3, 4])).toBe(false)
    expect(shallowEquals([], [])).toBe(true)
  })
})

describe('[boundNumber]', () => {
  it('works', () => {
    expect(boundNumber(10, 20, 13)).toBe(13)
    expect(boundNumber(10, 20, 19)).toBe(19)
    expect(boundNumber(10, 20, 5)).toBe(10)
    expect(boundNumber(10, 20, 23)).toBe(20)
  })
})

describe('[parseIntOr]', () => {
  it('works', () => {
    expect(parseIntOr('100', 50)).toBe(100)
    expect(parseIntOr('Invalid', 50)).toBe(50)
    expect(parseIntOr('375', 100)).toBe(375)
  })
})
