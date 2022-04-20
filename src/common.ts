export const noop = (): void => {
  return
}

export const neverEver = (never: never) => never

export const shallowEquals = <T extends unknown[]>(a: T, b: T): boolean => {
  if (a === b) {
    return true
  } else if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

export const boundNumber = (lower: number, upper: number, number: number) => {
  return Math.max(Math.min(number, upper), lower)
}

export const parseIntOr = (str: string, defaultValue: number) => {
  const int = parseInt(str, 10)
  return isNaN(int) ? defaultValue : int
}

export const spacer = (...strings: string[]) => strings.join(' ')
