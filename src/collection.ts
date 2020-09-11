import { R } from './types'
import { sortBy } from './utils'
import { get } from './model'

/**
 * Iterate over a collection of models and call a function on each model
 * @category Collection
 * @param models      An array of models
 * @param callback    The callback to apply to each model
 */
export function forEach<T extends R> (models: T[], callback: Function): T[] {
  models.forEach((model, index) => {
    callback(model, index, models)
  })
  return models
}

/**
 * Iterate over a collection of models, call a function on each model, and return the updated array
 * @category Collection
 * @param models      An array of models
 * @param callback    The callback to apply to each model
 */
export function map<T extends R> (models: T[], callback: Function): T[] {
  models.forEach((model, index) => {
    models[index] = callback(model, index, models)
  })
  return models
}

/**
 * Filter a collection of models by key, including matched values
 * @category Collection
 * @param models      An array of models
 * @param predicate   Either a value or a comparison function
 * @param key         The key to be used for the comparison (defaults to "id")
 */
export function filter<T extends R> (models: T[], predicate: any | Function, key: keyof T = 'id'): T[] {
  return typeof predicate === 'function'
    ? models.filter((item, index) => predicate(item, index, models))
    : models.filter(item => item[key] === predicate)
}

/**
 * Filter a collection of models by key, omitting matched values
 * @category Collection
 * @param models      An array of models
 * @param predicate   Either a value or a comparison function
 * @param key         The key to be used for the comparison (defaults to "id")
 */
export function omit<T extends R> (models: T[], predicate: any | Function, key: keyof T = 'id'): T[] {
  return typeof predicate === 'function'
    ? models.filter((item, index) => !predicate(item, index, models))
    : models.filter(item => item[key] !== predicate)
}

/**
 * Filter a collection of models, omitting those with duplicate ids
 * @category Collection
 * @param models      An array of models
 * @param key         The collection's key (defaults to "id")
 */
export function dedupe<T extends R> (models: T[], key: keyof T = 'id'): T[] {
  const output: T[] = []
  const ids: object = {}
  models.forEach(model => {
    const id: string = model[key]
    if (!ids[id]) {
      output.push(model)
      ids[id] = true
    }
  })
  return output
}

/**
 * Given two arrays of models, add the models not found in the first array from the second array, and return the new array
 * @category Collection
 * @param a           The initial collection of models
 * @param b           The new collection of models to be merged from
 * @param key         The collection's key (defaults to "id")
 */
export function merge<T extends R> (a: T[], b: T[], key: keyof T = 'id'): T[] {
  const output = [...a]
  b.forEach(model => {
    const found = get(a, model[key], key)
    if (!found) {
      output.push(model)
    }
  })
  return output
}

/**
 * Sort a collection of models by key
 * @category Collection
 * @param models      An array of models
 * @param key         The collection's key (defaults to "id")
 * @param asc         An optional flag to sort ascending (true, default) or descending (false)
 * @param numeric     An optional flag to perform a numeric sort
 */
export function sort<T extends R> (models: T[], key: string, asc = true, numeric = false): T[] {
  return models.sort(sortBy(key, asc, numeric))
}
