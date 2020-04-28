import { update } from '../src'

const people = [
  { id: 1, name: 'tom' },
  { id: 2, name: 'dick' },
  { id: 3, name: 'harry' },
]

// attempt illegal update
update(people, 2, { age: 100 }) // error! Object literal may only specify known properties, and 'age' does not exist in type 'Partial<{ id: number; name: string; }>'.

// force update
update(people, 2, { age: 100 } as any)
