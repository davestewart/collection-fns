import {
  merge,
  forEach,
  map,
  filter,
  omit,
  sort } from '../src'


import { people, makePerson, Person } from './setup'

describe('model functions', () => {
  it('merge', () => {
    const newArray = [
      people[0],
      makePerson('jane'),
      people[1],
      makePerson('jill'),
      people[2],
      makePerson('sarah'),
    ]
    const finalArray = merge(people, newArray)
    expect(finalArray.length).toBe(6)
  })

  it('forEach', () => {
    forEach(people, (person: Person) => {
      person.name = 'dave'
    })
    expect(people.every(person => person.name === 'dave')).toBe(true)
  })

  it('map', () => {
    const arr = map(people, (person: Person) => {
      person.name = 'dave'
      return person
    })
    expect(arr.every(person => person.name === 'dave')).toBe(true)
  })

  it('filter: id', () => {
    const arr = filter(people, 1)
    expect(arr.length).toBe(1)
  })

  it('filter: function', () => {
    const arr = filter(people, (person: Person) => person.name.length > 3)
    expect(arr.length).toBe(2)
  })

  it('omit: id', () => {
    const arr = omit(people, 1)
    expect(arr.length).toBe(2)
  })

  it('omit: function', () => {
    const arr = omit(people, (person: Person) => person.name.length > 3)
    expect(arr.length).toBe(1)
  })

  it('sort', () => {
    const arr = sort(people, 'name')
    expect(arr.map((person: Person) => person.name).join()).toBe('dick,harry,tom')
  })

})
