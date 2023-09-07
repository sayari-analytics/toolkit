import { spacer } from './common'
import { dropLast } from 'ramda'

export type StringCase = 'camel' | 'pascal' | 'snake' | 'kebab' | 'sentence'
export type NumberPrecision = 'ORDER_OF_MAGNITUDE' | 'INTEGER' | 'TENTHS' | 'HUNDREDTHS'

export const capitalize = (str: string) => str.replace(/^./, (first) => first.toUpperCase())

export const toSnakeCase = (string: string) => string.toLowerCase().replace(/[\s|\/]/g, '_')

export const prettifySnakeCase = (string: string) => spacer(...string.split('_').map(capitalize))

export const prettifyKebobCase = (string: string) => spacer(...string.split('-').map(capitalize))

export const toTitleCase = (string: string, type: StringCase): string => {
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

const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
export const pluralize = (text: string, count = Infinity) => {
  if (
    count !== 1 &&
    text[text.length - 1].toLowerCase() === 'y' &&
    !vowels.has(text[text.length - 2].toLowerCase())
  ) {
    return dropLast(1, text) + 'ies'
  } else if (count === 1) {
    return text
  } else {
    return text + 's'
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

export const formatDate = (date: string, offByOne?: boolean) => {
  if (!date) return ''
  try {
    const dt = new Date(offByOne ? `${date}T00:00` : date)
    const year = dt.getFullYear()
    const month = `${dt.getMonth() + 1}`.padStart(2, '0')
    const day = `${dt.getDate()}`.padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Date format error :', error)
    return ''
  }
}

const isToday = (dt: Date) => {
  const today = new Date()
  return (
    dt.getDate() === today.getDate() &&
    dt.getMonth() === today.getMonth() &&
    dt.getFullYear() === today.getFullYear()
  )
}

export const formatDateTime = (date?: string) => {
  if (date === undefined) {
    return ''
  }

  try {
    const dt = new Date(date ?? '')
    const year = dt.getFullYear()
    const month = `${dt.getMonth() + 1}`.padStart(2, '0')
    const day = `${dt.getDate()}`.padStart(2, '0')
    const hour = `${dt.getHours() % 12 || 12}`
    const min = `${dt.getMinutes()}`.padStart(2, '0')
    const mid = dt.getHours() >= 12 ? 'PM' : 'AM'

    const dateString = `${year}-${month}-${day}`
    const time = `${hour}:${min} ${mid}`

    return isToday(dt) ? `Today at ${time}` : `${dateString} at ${time}`
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Date format error :', error)
    return ''
  }
}

export const cleanNumber = (str: string) => {
  return str
    .replace(/(^-?\d+\.\d*[1-9])(0+$)|(\.0+$)/, '$1') // remove trailing 0s
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') // and add commas when appropriate
}

export const formatNumber = (num: number, precision: NumberPrecision) => {
  const str = num.toString()
  switch (precision) {
    case 'ORDER_OF_MAGNITUDE':
      if (num > 1000000) {
        return `${cleanNumber(`${(num / 1000000).toFixed(1)}`)}M`
      } else if (num > 1000) {
        return `${cleanNumber(`${(num / 1000).toFixed(1)}`)}K`
      } else {
        return cleanNumber(str)
      }
    case 'INTEGER':
      return cleanNumber(num < 1 ? '< 1' : num.toFixed(0))
    case 'TENTHS':
      return cleanNumber(num * 10 < 1 ? '< 0.1' : num.toFixed(1))
    case 'HUNDREDTHS':
      return cleanNumber(num * 100 < 1 ? '< 0.01' : num.toFixed(2))
  }
}

export const elapsedTime = (date: string) => {
  const now = new Date()
  const then = new Date(date)

  const elapsed = now.getTime() - then.getTime()
  const seconds = Math.floor(elapsed / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds} ${pluralize('second', seconds)} ago`
  } else if (minutes < 60) {
    return `${minutes} ${pluralize('minute', minutes)} ago`
  } else if (hours < 24) {
    return `${hours} ${pluralize('hour', hours)} ago`
  } else if (days < 30) {
    return `${days} ${pluralize('day', days)} ago`
  } else {
    return formatDate(date)
  }
}

export const percentFormat = (percentage: number, precision: NumberPrecision = 'HUNDREDTHS') =>
  `${formatNumber(percentage, precision)}%`

export const formatDateOfBirth = (year: string, month: string, day: string) => {
  return [year, month ? `0${month}`.slice(-2) : month, day ? `0${day}`.slice(-2) : day]
    .filter((v) => !!v)
    .join('-')
}

const CURRENCY_LOOKUP: Record<string, string> = {
  USD: '$',
  CNY: '¥',
  EUR: '€',
  INR: '₹',
  RUB: '₽',
  VES: 'Bs.',
}
export const formatCurrency = (value: number, currency?: string) => {
  const amount = Math.abs(value).toLocaleString()
  const prefix = value < 0 ? '-' : ''

  if (currency === undefined) {
    return `${prefix}${amount}`
  } else if (CURRENCY_LOOKUP[currency]) {
    return `${prefix}${CURRENCY_LOOKUP[currency]}${amount}`
  }
  return `${prefix}${amount} ${currency}`
}
