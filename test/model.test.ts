import {
  first,
  last,
  has,
  get,
  getIndex,
  getRandom,
  add,
  addOrMove,
  update,
  move,
  moveToEnd,
  moveByIndex,
  remove,
} from '../src'

import { people, makePerson, Person } from './setup'

describe('model functions', () => {
  it('first', () => {
    const person = first(people)
    expect(person && person.name).toBe('tom')
  })

  it('last', () => {
    const person = last(people)
    expect(person && person.name).toBe('harry')
  })

  it('has', () => {
    expect(has(people, 2)).toBe(true)
  })

  it('get', () => {
    const person = get(people, 2)
    expect(person && person.name).toBe('dick')
  })

  it('getIndex', () => {
    const index = getIndex(people, 1)
    expect(index).toBe(0)
  })

  it('getIndex: invalid id', () => {
    const index = getIndex(people, 99)
    expect(index).toBe(-1)
  })

  it('getRandom', () => {
    const person = getRandom(people)
    expect(person).toBeDefined()
  })

  it('add', () => {
    const person = makePerson('jill')
    add(people, person)
    expect(people.indexOf(person)).toBe(3)
  })

  it('add: at start', () => {
    const person = makePerson('jill')
    add(people, person, 0)
    expect(people.indexOf(person)).toBe(0)
  })

  it('add: update existing', () => {
    const updated = { id: 1, name: 'ben' }
    add(people, updated)
    expect(people[0].name).toBe('ben')
  })

  it('addOrMove', () => {
    const person = makePerson('jill')
    add(people, person)
    addOrMove(people, person, 0)
    expect(people.indexOf(person)).toBe(0)
  })

  it('update', () => {
    update(people, 3, { name: 'jane' })
    expect(people[2].name).toBe('jane')
  })

  it('move', () => {
    move(people, 3, 0)
    expect(people[0].name).toBe('harry')
  })

  it('move: to another array', () => {
    const other: Person[] = []
    move(people, 3, 0, other)
    expect(people.length).toBe(2)
    expect(other.length).toBe(1)
    expect(other[0].name).toBe('harry')
  })

  it('moveToEnd', () => {
    moveToEnd(people, 1)
    expect(people[2].name).toBe('tom')
  })

  it('moveByIndex', () => {
    moveByIndex(people, 1, 0)
    expect(people[0].name).toBe('dick')
  })

  it('moveByIndex: to another array', () => {
    const other: Person[] = [
      makePerson('jill'),
    ]
    moveByIndex(people, 1, 1, other)
    expect(people.length).toBe(2)
    expect(other.length).toBe(2)
    expect(other[1].name).toBe('dick')
  })

  it('remove', () => {
    const person = remove(people, 2)
    expect(people.length).toBe(2)
    expect(person && person.name).toBe('dick')
  })

  it('remove: invalid id', () => {
    const person = remove(people, 99)
    expect(person).toBeUndefined()
    expect(people.length).toBe(3)
  })
})
