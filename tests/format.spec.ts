import {
  NUMBER_PRECISION,
  toSnakeCase,
  toTitleCase,
  formatNumber,
  toVerboseDate,
  prettifySnakeCase,
  prettifyKebobCase,
  capitalize,
  pluralize,
} from '~src'

describe('[FORMAT]', () => {
  test('capitalize', () => {
    expect(capitalize('hello')).toEqual('Hello')
    expect(capitalize('hello world')).toEqual('Hello world')
  })
  test('toSnakeCase', () => {
    expect(toSnakeCase('Snake Case Example')).toEqual('snake_case_example')
  })

  test('prettifySnakeCase', () => {
    expect(prettifySnakeCase('snake_case_example')).toEqual('Snake Case Example')
  })

  test('prettifyKebobCase', () => {
    expect(prettifyKebobCase('kebab-case-example')).toEqual('Kebab Case Example')
  })

  describe('toTitleCase', () => {
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

  test('pluralize', () => {
    expect(pluralize('cat')).toBe('cats')
    expect(pluralize('cat', 1)).toBe('cat')
    expect(pluralize('entity', 2)).toBe('entities')
    expect(pluralize('entity', 1)).toBe('entity')
    expect(pluralize('tax')).toBe('taxes')
  })

  describe('toVerboseDate', () => {
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

  describe('formatNumber', () => {
    test(NUMBER_PRECISION.ORDER_OF_MAGNITUDE, () => {
      expect(formatNumber(100000000, NUMBER_PRECISION.ORDER_OF_MAGNITUDE)).toBe('100M')
      expect(formatNumber(100000, NUMBER_PRECISION.ORDER_OF_MAGNITUDE)).toBe('100K')
    })
    test(NUMBER_PRECISION.INTEGER, () => {
      expect(formatNumber(100, NUMBER_PRECISION.INTEGER)).toBe('100')
      expect(formatNumber(0.2, NUMBER_PRECISION.INTEGER)).toBe('< 1')
      expect(formatNumber(10.25, NUMBER_PRECISION.INTEGER)).toBe('10')
    })
    test(NUMBER_PRECISION.TENTHS, () => {
      expect(formatNumber(0.02, NUMBER_PRECISION.TENTHS)).toBe('< 0.1')
      expect(formatNumber(10.25, NUMBER_PRECISION.TENTHS)).toBe('10.3')
    })
    test(NUMBER_PRECISION.HUNDREDTHS, () => {
      expect(formatNumber(0.002, NUMBER_PRECISION.HUNDREDTHS)).toBe('< 0.01')
      expect(formatNumber(10.25, NUMBER_PRECISION.HUNDREDTHS)).toBe('10.25')
    })
  })
})
