import {
  toSnakeCase,
  toTitleCase,
  formatNumber,
  toVerboseDate,
  prettifySnakeCase,
  prettifyKebobCase,
} from '~src'

const ORDER_OF_MAGNITUDE = 'ORDER_OF_MAGNITUDE'
const INTEGER = 'INTEGER'
const TENTHS = 'TENTHS'
const HUNDREDTHS = 'HUNDREDTHS'

describe('[toSnakeCase]', () => {
  test('works', () => {
    expect(toSnakeCase('Snake Case Example')).toEqual('snake_case_example')
  })
})
describe('[prettifySnakeCase]', () => {
  test('works', () => {
    expect(prettifySnakeCase('snake_case_example')).toEqual('Snake Case Example')
  })
})

describe('[prettifyKebobCase]', () => {
  test('works', () => {
    expect(prettifyKebobCase('kebab-case-example')).toEqual('Kebab Case Example')
  })
})

describe('[toTitleCase]', () => {
  test('snake case', () => {
    expect(toTitleCase('snake_case_example', 'snake')).toEqual('Snake Case Example')
  })
  test('kebab case', () => {
    expect(toTitleCase('kebab-case-example', 'kebab')).toEqual('Kebab Case Example')
  })
  test('pascal case', () => {
    expect(toTitleCase('PascalCaseExample', 'pascal')).toEqual('Pascal Case Example')
  })
  test('camel', () => {
    expect(toTitleCase('camelCaseExample', 'camel')).toEqual('Camel Case Example')
  })
  test('sentence', () => {
    expect(toTitleCase('a Random sentence example', 'sentence')).toEqual(
      'A Random Sentence Example'
    )
  })
})

describe('[toVerboseDate]', () => {
  test('year', () => {
    expect(toVerboseDate('1993')).toEqual('1993')
  })
  test('year/month', () => {
    expect(toVerboseDate('1993-02')).toEqual('February 1993')
  })
  test('year/month/day', () => {
    expect(toVerboseDate('1993-02-23')).toEqual('February 23, 1993')
  })
})

describe('[formatNumber]', () => {
  test(ORDER_OF_MAGNITUDE, () => {
    expect(formatNumber(100000000, ORDER_OF_MAGNITUDE)).toBe('100M')
    expect(formatNumber(100000, ORDER_OF_MAGNITUDE)).toBe('100K')
  })
  test(INTEGER, () => {
    expect(formatNumber(100, INTEGER)).toBe('100')
    expect(formatNumber(0.2, INTEGER)).toBe('< 1')
    expect(formatNumber(10.25, INTEGER)).toBe('10')
  })
  test(TENTHS, () => {
    expect(formatNumber(0.02, TENTHS)).toBe('< 0.1')
    expect(formatNumber(10.25, TENTHS)).toBe('10.3')
  })
  test(HUNDREDTHS, () => {
    expect(formatNumber(0.002, HUNDREDTHS)).toBe('< 0.01')
    expect(formatNumber(10.25, HUNDREDTHS)).toBe('10.25')
  })
})
