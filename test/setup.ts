export type Person = { id: number, name: string }

export function makePerson (name: string, optionalId = -1): Person {
  return { id: optionalId > -1 ? optionalId : id++, name }
}

export function initialize () {
  id = 1
  people = [
    makePerson('tom'),
    makePerson('dick'),
    makePerson('harry'),
  ]
}

beforeEach(() => {
  initialize()
})

export let id = 1
export let people: Person[] = []
