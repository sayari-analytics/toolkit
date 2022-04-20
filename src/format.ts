import { spacer } from './common'

const capitalize = (str: string) => str.replace(/^./, (first) => first.toUpperCase())

export const toSnakeCase = (string: string) => string.toLowerCase().replace(/[\s|\/]/g, '_')

export const prettifySnakeCase = (string: string) => spacer(...string.split('_').map(capitalize))

export const prettifyKebobCase = (string: string) => spacer(...string.split('-').map(capitalize))

export const toTitleCase: (
  string: string,
  type: 'camel' | 'pascal' | 'snake' | 'kebab' | 'sentence'
) => string = (string, type) => {
  switch (type) {
    case 'snake':
      return spacer(...string.split('_').map(capitalize))
    case 'kebab':
      return spacer(...string.split('-').map(capitalize))
    case 'pascal':
      return string.replace(/([A-Z])/g, ' $1').trim()
    case 'camel':
      return capitalize(string.replace(/([A-Z])/g, ' $1'))
    case 'sentence':
      return spacer(...string.toLowerCase().split(' ').map(capitalize))
  }
}

export const toVerboseDate = (string: string) => {
  const date = new Date(`${string}T00:00`)

  switch (string.split('-').length) {
    case 1:
      return String(date.getFullYear())
    case 2:
      return String(
        date.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })
      )
    case 3:
      return String(
        date.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        })
      )
    default:
      return string
  }
}

export const formatNumber = (
  num: number,
  precision: 'ORDER_OF_MAGNITUDE' | 'INTEGER' | 'TENTHS' | 'HUNDREDTHS'
) => {
  let str = num.toString()

  if (precision === 'ORDER_OF_MAGNITUDE') {
    if (num > 1000000) str = `${(num / 1000000).toFixed(1)}`
    else if (num > 1000) str = `${(num / 1000).toFixed(1)}`

    return str
      .replace(/(^-?\d+\.\d*[1-9])(0+$)|(\.0+$)/, '$1') // remove trailing 0s
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // and add commas when appropriate
      .concat(num > 1000000 ? 'M' : num > 1000 ? 'K' : '')
  } else if (precision === 'INTEGER') {
    if (num < 1) str = '< 1'
    else str = num.toFixed(0)
  } else if (precision === 'TENTHS') {
    if (num * 10 < 1) str = '< .1'
    else str = num.toFixed(1)
  } else if (precision === 'HUNDREDTHS') {
    if (num * 100 < 1) str = '< .01'
    else str = num.toFixed(2)
  }

  return str
    .replace(/(^-?\d+\.\d*[1-9])(0+$)|(\.0+$)/, '$1') // remove trailing 0s
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // and add commas when appropriate
}
