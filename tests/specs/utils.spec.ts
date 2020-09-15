import {
  sortBy,
} from '../../src'

import { people } from './setup'

describe('utils', () => {
  it('sorts an array of models', () => {
    const [tom, dick, harry] = people
    const unsorted = [dick, tom, harry, tom]
    const sorted = unsorted.sort(sortBy('name'))
    const expected = [dick, harry, tom, tom]
    expect(sorted).toEqual(expected)
  })
})
