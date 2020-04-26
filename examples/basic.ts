import { get, add, move, update, filter, omit, last, sort } from '../src'

let id = 1
function person (name: string) { return { id: id++, name, alive: true } }

const exBeatles: any[] = []
const beatles = [
  person('john lennon'),
  person('paul mccartney'),
  person('george harrison'),
  person('pete best'),
]

// original beatles
console.log(beatles) // john, paul, george, pete

// find pete, passing an alternate key
const pete = get(beatles, 'pete best', 'name')

// get rid of pete
if (pete) {
  move(beatles, pete.id, 0, exBeatles)
}

// add ringo
add(beatles, person('ringo star'))

// check last
last(beatles) // ringo star

// sort
sort(beatles, 'name', true, false) // george, john, paul, ringo

// sadly, some beatles are no more
update(beatles, 1, { alive: false })
update(beatles, 3, { alive: false })

// log
console.log({
  liveBeatles: filter(beatles, true, 'alive'),
  deadBeatles: omit(beatles, true, 'alive'),
  exBeatles
})
