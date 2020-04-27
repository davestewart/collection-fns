import { get, add, move, remove } from '../src'

type Window = {
  windowId: number,
  content: string
}

let id = 1

class Windows {
  protected windows: Window[] = []

  // important that this stays untyped to work with index type `keyof T` !
  // @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
  protected key: any = 'windowId'

  add (content: string) {
    return add(this.windows, { windowId: id++, content }, 0)
  }

  get (id: number) {
    return get(this.windows, id, this.key)
  }

  focus (id: number) {
    return move(this.windows, id, 0, undefined, this.key)
  }

  remove (id: number) {
    return remove(this.windows, id, this.key)
  }
}

// new class
const windows = new Windows()

// add windows
windows.add('window 1')
windows.add('window 2')
windows.add('window 3')
console.log(windows) // windows will be stacked newest, top, so 3, 2, 1

// focus bottom window
windows.focus(1)
console.log(windows) // bottom window is now top, so 1, 3, 2

// remove middle window
windows.remove(3)
console.log(windows) // windows are now 1, 2
