export const copySet = <I>(set: Set<I>): Set<I> => {
  const newSet = new Set<I>()
  set.forEach((item) => {
    newSet.add(item)
  })
  return newSet
}

export const filterSet = <I>(callback: (item: I) => boolean, set: Set<I>): Set<I> => {
  const newSet = new Set<I>()
  set.forEach((item) => {
    if (callback(item)) {
      newSet.add(item)
    }
  })
  return newSet
}

export const reduceSet = <I, T>(
  callback: (accumulator: T, item: I) => T,
  set: Set<I>,
  initial: T
): T => {
  let accu = initial
  set.forEach((item) => {
    accu = callback(accu, item)
  })
  return accu
}

export const mapSet = <I, T>(callback: (item: I) => T, set: Set<I>): Set<T> => {
  const newSet = new Set<T>()
  set.forEach((item) => {
    newSet.add(callback(item))
  })
  return newSet
}

export const concatSet = <I>(a: Set<I>, b: Set<I>): Set<I> => {
  const newSet = new Set<I>()
  a.forEach((item) => {
    newSet.add(item)
  })
  b.forEach((item) => {
    newSet.add(item)
  })
  return newSet
}

export const pushSet = <I>(set: Set<I>, ...items: I[]): Set<I> => {
  const newSet = new Set<I>()
  set.forEach((item) => {
    newSet.add(item)
  })
  items.forEach((item) => {
    newSet.add(item)
  })
  return newSet
}

export const compareSets = <I>(a: Set<I>, b: Set<I>): boolean => {
  if (a.size !== b.size) {
    return false
  }

  for (const item of a) {
    if (!b.has(item)) {
      return false
    }
  }

  return true
}

export const toggleSetItem = <I>(set: Set<I>, subject: I): Set<I> => {
  const newSet = new Set<I>()

  if (set.has(subject)) {
    set.forEach((item) => {
      if (item !== subject) {
        newSet.add(item)
      }
    })
  } else {
    newSet.add(subject)
    set.forEach((item) => {
      newSet.add(item)
    })
  }

  return newSet
}
