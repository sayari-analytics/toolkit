import {
  toSnakeCase,
  prettifySnakeCase,
  prettifyKebobCase,
  toTitleCase,
  toVerboseDate,
  formatNumber,
} from '~src'

const SNAKE_CASE = 'snake_case_example'
const KEBAB_CASE = 'kebab-case-example'
const PASCAL_CASE = 'PascalCaseExample'
const CAMEL_CASE = 'camelCaseExample'
const SENTENCE = 'This is a Random sentence example'

const TITLE_CASE = {
  [SNAKE_CASE]: 'Snake Case Example',
  [KEBAB_CASE]: 'Kebab Case Example',
  [PASCAL_CASE]: 'Pascal Case Example',
  [CAMEL_CASE]: 'Camel Case Example',
  [SENTENCE]: 'This Is A Random Sentence Example',
}

const ORDER_OF_MAGNITUDE = 'ORDER_OF_MAGNITUDE'
const INTEGER = 'INTEGER'
const TENTHS = 'TENTHS'
const HUNDREDTHS = 'HUNDREDTHS'
const HUNDRED_MILLION = 100000000
const HUNDRED_THOUSAND = 100000
const HUNDRED = 100
const DECIMAL = 10.25
const LESS_THAN_ONE = 0.2
const LESS_THAN_TENTH = 0.02
const LESS_THAN_HUNDRETH = 0.002

const FORMAT_NUMBER = {
  [HUNDRED_MILLION]: '100M',
  [HUNDRED_THOUSAND]: '100K',
  [HUNDRED]: '100',
  [INTEGER]: '10',
  [TENTHS]: '10.3',
  [HUNDREDTHS]: '10.25',
  [LESS_THAN_ONE]: '< 1',
  [LESS_THAN_TENTH]: '< .1',
  [LESS_THAN_HUNDRETH]: '< .01',
}

describe('[toSnakeCase]', () => {
  test('works', () => {
    expect(toSnakeCase(TITLE_CASE[SNAKE_CASE])).toEqual(SNAKE_CASE)
  })
})
describe('[prettifySnakeCase]', () => {
  test('works', () => {
    expect(prettifySnakeCase(SNAKE_CASE)).toEqual(TITLE_CASE[SNAKE_CASE])
  })
})

describe('[prettifyKebobCase]', () => {
  test('works', () => {
    expect(prettifyKebobCase(KEBAB_CASE)).toEqual(TITLE_CASE[KEBAB_CASE])
  })
})

describe('[toTitleCase]', () => {
  test('snake case', () => {
    expect(toTitleCase(SNAKE_CASE, 'snake')).toEqual(TITLE_CASE[SNAKE_CASE])
  })
  test('kebab case', () => {
    expect(toTitleCase(KEBAB_CASE, 'kebab')).toEqual(TITLE_CASE[KEBAB_CASE])
  })
  test('pascal case', () => {
    expect(toTitleCase(PASCAL_CASE, 'pascal')).toEqual(TITLE_CASE[PASCAL_CASE])
  })
  test('camel', () => {
    expect(toTitleCase(CAMEL_CASE, 'camel')).toEqual(TITLE_CASE[CAMEL_CASE])
  })
  test('sentence', () => {
    expect(toTitleCase(SENTENCE, 'sentence')).toEqual(TITLE_CASE[SENTENCE])
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
    expect(formatNumber(HUNDRED_MILLION, ORDER_OF_MAGNITUDE)).toBe(FORMAT_NUMBER[HUNDRED_MILLION])
    expect(formatNumber(HUNDRED_THOUSAND, ORDER_OF_MAGNITUDE)).toBe(FORMAT_NUMBER[HUNDRED_THOUSAND])
  })
  test(INTEGER, () => {
    expect(formatNumber(HUNDRED, INTEGER)).toBe(FORMAT_NUMBER[HUNDRED])
    expect(formatNumber(LESS_THAN_ONE, INTEGER)).toBe(FORMAT_NUMBER[LESS_THAN_ONE])
    expect(formatNumber(DECIMAL, INTEGER)).toBe(FORMAT_NUMBER[INTEGER])
  })
  test(TENTHS, () => {
    expect(formatNumber(LESS_THAN_TENTH, TENTHS)).toBe(FORMAT_NUMBER[LESS_THAN_TENTH])
    expect(formatNumber(DECIMAL, TENTHS)).toBe(FORMAT_NUMBER[TENTHS])
  })
  test(HUNDREDTHS, () => {
    expect(formatNumber(LESS_THAN_HUNDRETH, HUNDREDTHS)).toBe(FORMAT_NUMBER[LESS_THAN_HUNDRETH])
    expect(formatNumber(DECIMAL, HUNDREDTHS)).toBe(FORMAT_NUMBER[HUNDREDTHS])
  })
})
