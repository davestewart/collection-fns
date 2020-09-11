import { R, Id } from './types'

/**
 * Get the first model in a collection
 * @category Model
 * @param models      An array of models
 */
export function first<T extends R> (models: T[]): T | undefined {
  return models[0]
}

/**
 * Get the last model in a collection
 * @category Model
 * @param models      An array of models
 */
export function last<T extends R> (models: T[]): T | undefined {
  return models[models.length - 1]
}

/**
 * Test if a collection has a model
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param key         The collection's key (defaults to "id")
 */
export function has<T extends R> (models: T[], id: Id, key: keyof T = 'id'): boolean {
  return !!get(models, id, key)
}

/**
 * Get a model from a collection
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param key         The collection's key (defaults to "id")
 */
export function get<T extends R> (models: T[], id: Id, key: keyof T = 'id'): T | undefined {
  if (typeof id !== 'undefined') {
    return models.find((model: T) => model[key] === id)
  }
}

/**
 * Get the index of a model in a collection
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param key         The collection's key (defaults to "id")
 */
export function getIndex<T extends R> (models: T[], id: Id, key: keyof T = 'id'): number {
  return models.findIndex((model: T) => model[key] === id)
}

/**
 * Get a random model from a collection
 * @category Model
 * @param models      An array of models
 */
export function getRandom<T extends R> (models: T[]): T {
  const index = Math.floor(Math.random() * models.length)
  return models[index]
}

/**
 * Add a model to a collection, or if it already exists, update
 * @category Model
 * @param models      An array of models
 * @param model       The model to add
 * @param index       The optional index at which to add the model (defaults to -1, the end)
 * @param key         The collection's key (defaults to "id")
 */
export function add<T extends R> (models: T[], model: T, index = -1, key: keyof T = 'id'): T {
  const trg = get(models, model[key], key)
  if (trg) {
    update(models, model[key], model, key)
    return model
  }
  index > -1 && index < models.length
    ? models.splice(index, 0, model)
    : models.push(model)
  return model
}

/**
 * Add a model to a collection, or if it already exists, move it to an index
 * @category Model
 * @param models      An array of models
 * @param model       The model to add
 * @param index       The optional index to which to move an existing model (defaults to -1, the end)
 * @param key         The collection's key (defaults to "id")
 */
export function addOrMove<T extends R> (models: T[], model: T, index = -1, key: keyof T = 'id'): T {
  const keyItem = model[key]
  const trg = get(models, keyItem, key)
  trg
    ? move(models, keyItem, index, models, key)
    : add(models, model, index, key)
  return model
}

/**
 * Update a model if it exists in a collection
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param values      The data with which to update the model
 * @param key         The collection's key (defaults to "id")
 */
export function update<T extends R, V extends Partial<T>> (models: T[], id: Id, values: V, key: keyof T = 'id'): T | undefined {
  const model = get(models, id, key)
  if (model) {
    Object.assign(model, values)
    return model
  }
}

/**
 * Move a model in a collection to a specific index in the same or a different array
 * @category Model
 * @param fromArr     An array of models
 * @param id          The id of the model to target
 * @param toIndex     The index to which to move the model
 * @param toArr       An optional (other) collection to move the model to
 * @param key         The collection's key (defaults to "id")
 */
export function move<T extends R> (fromArr: T[], id: Id, toIndex: number, toArr: T[] = fromArr, key: keyof T = 'id'): T | undefined {
  const fromIndex = getIndex(fromArr, id, key)
  if (fromIndex > -1) {
    return moveByIndex(fromArr, fromIndex, toIndex, toArr)
  }
}

/**
 * Move a model in a collection to the end of the same or a different array
 * @category Model
 * @param fromArr     An array of models
 * @param id          The id of the model to target
 * @param toArr       An optional (other) collection to move the model to
 * @param key         The collection's key (defaults to "id")
 */
export function moveToEnd<T extends R> (fromArr: T[], id: Id, toArr: T[] = fromArr, key: keyof T = 'id'): T | undefined {
  return move(fromArr, id, toArr.length - 1, toArr, key)
}

/**
 * Move a model in a collection from one index to another in the same or a different array
 * @category Model
 * @param fromArr     An array of models
 * @param fromIndex   The index from which to move the model
 * @param toIndex     The index to which to move the model
 * @param toArr       An optional (other) collection to move the model to
 */
export function moveByIndex<T extends R> (fromArr: T[], fromIndex: number, toIndex: number, toArr: T[] = fromArr): T | undefined {
  if (fromIndex > -1 && toIndex > -1) {
    toArr.splice(toIndex, 0, ...fromArr.splice(fromIndex, 1))
    return toArr[toIndex]
  }
}

/**
 * Remove a model from a collection
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param key         The collection's key (defaults to "id")
 */
export function remove<T extends R> (models: T[], id: Id, key: keyof T = 'id'): T | undefined {
  const index = getIndex(models, id, key)
  if (index > -1) {
    return models.splice(index, 1).shift()
  }
}
