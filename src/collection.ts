import { M, Key } from './types'
import { sortBy } from './utils'
import { get } from './model'

/**
 * Given two arrays of models, add the models not found in the first array from the second array, and return the new array
 * @category Collection
 * @param a           The initial collection of models
 * @param b           The new collection of models to be merged from
 * @param key         The collection's key (defaults to "id")
 */
export function merge<T extends M, K extends keyof T> (a: M[], b: M[], key: Key = 'id'): M[] {
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
 * Iterate over a collection of models and call a function on each model
 * @category Collection
 * @param models      An array of models
 * @param callback    The callback to apply to each model
 */
export function forEach<M> (models: M[], callback: Function): M[] {
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
export function map<M> (models: M[], callback: Function): M[] {
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
export function filter<T extends M, K extends keyof T> (models: M[], predicate: Function | any, key: Key = 'id'): M {
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
export function omit<T extends M, K extends keyof T> (models: M[], predicate: Function | any, key: Key = 'id'): M {
  return typeof predicate === 'function'
    ? models.filter((item, index) => !predicate(item, index, models))
    : models.filter(item => item[key] !== predicate)
}

/**
 * Sort a collection of models by key
 * @category Collection
 * @param models      An array of models
 * @param key         The collection's key (defaults to "id")
 * @param asc         An optional flag to sort ascending (true, default) or descending (false)
 * @param numeric     An optional flag to perform a numeric sort
 */
export function sort<T extends M, K extends keyof T> (models: M[], key: string, asc = true, numeric = false): M {
  return models.sort(sortBy(key, asc, numeric))
}
