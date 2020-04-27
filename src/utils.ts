import { R } from './types'

/**
 * Utility function to return a sort() comparison function
 * @category Utility
 * @param key       The key to sort on
 * @param asc       An optional flag to sort ascending or descending; defaults to true (ascending)
 * @param numeric   An optional flag to do a numeric comparison; defaults to false (string comparison)
 */
export function sortBy (key: string, asc = true, numeric = false) {
  let aVal
  let bVal
  return function <T extends R> (a: T, b: T): 1 | 0 | -1 {
    aVal = numeric ? Number(a[key]) : a[key]
    bVal = numeric ? Number(b[key]) : b[key]
    return aVal === bVal
      ? 0
      : aVal > bVal
        ? (asc ? 1 : -1)
        : (asc ? -1 : 1)
  }
}
