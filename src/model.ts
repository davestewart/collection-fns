import { M, Id, Key } from './types'

/**
 * Get the first model in a collection
 * @category Model
 * @param models      An array of models
 */
export function first<M> (models: M[]): M | undefined {
  return models[0]
}

/**
 * Get the last model in a collection
 * @category Model
 * @param models      An array of models
 */
export function last<M> (models: M[]): M | undefined {
  return models[models.length - 1]
}

/**
 * Test if a collection has a model
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param key         The collection's key (defaults to "id")
 */
export function has<M> (models: Array<M>, id: Id, key: Key = 'id'): boolean {
  return !!get(models, id, key)
}

/**
 * Get a model from a collection
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param key         The collection's key (defaults to "id")
 */
export function get<T extends M, K extends keyof T> (models: T[], id: Id, key: Key = 'id'): T | undefined {
  if (id !== void 0) {
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
export function getIndex<M> (models: M[], id: Id, key: Key = 'id'): number {
  return models.findIndex((model: Record<Id, any>) => model[key] === id)
}

/**
 * Get a random model from a collection
 * @category Model
 * @param models      An array of models
 */
export function getRandom<M> (models: M[]): M {
  const index = Math.floor(Math.random() * models.length)
  return models[index]
}

/**
 * Add a model to a collection
 * @category Model
 * @param models      An array of models
 * @param model       The model to add
 * @param index       The optional index at which to add the model (defaults to -1, the end)
 * @param key         The collection's key (defaults to "id")
 */
export function add<T extends M, K extends keyof T> (models: M[], model: M, index = -1, key: Key = 'id'): M | undefined {
  const trg: M | undefined = get(models, model[key], key)
  if (trg) {
    return update(models, model[key], model, key)
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
export function addOrMove<T extends M, K extends keyof T> (models: M[], model: M, index = -1, key: Key = 'id') {
  const keyItem = model[key]
  const trg = get(models, keyItem, key)
  return trg
    ? move(models, keyItem, index, models, key)
    : add(models, model, index, key)
}

/**
 * Update a model if it exists in a collection
 * @category Model
 * @param models      An array of models
 * @param id          The id of the model to target
 * @param values      The data with which to update the model
 * @param key         The collection's key (defaults to "id")
 */
export function update<M, V extends Partial<M>> (models: M[], id: Id, values: V, key: Key = 'id'): M | undefined {
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
export function move<M> (fromArr: M[], id: Id, toIndex: number, toArr: M[] = fromArr, key: Key = 'id'): M | undefined {
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
export function moveToEnd<M> (fromArr: M[], id: Id, toArr: M[] = fromArr, key: Key = 'id'): M | undefined {
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
export function moveByIndex<M> (fromArr: M[], fromIndex: number, toIndex: number, toArr: M[] = fromArr): M | undefined {
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
export function remove<M> (models: M[], id: Id, key: Key = 'id'): M | undefined {
  const index = getIndex(models, id, key)
  if (index > -1) {
    return models.splice(index, 1).shift()
  }
}
