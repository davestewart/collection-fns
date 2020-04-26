# Collection Fns

## Abstract

Collection Fns is a set of flexible functions designed to manipulate collections of models:

- a model is defined as an object with a common identifier such as `id`, `guid` or `someId`
- a collection is defined as an `Array` of models sharing the same `id` key
- flexible functions is defined that any function can applied to any collection of arbitrary models

### Project goals

The project has the following goals:

- to target models by arbitrary property (defaulting to `id`)
- to provide a basic set of array collection / model manipulation functions
- to be expressive and flexible
- to be purely functional
- to be TypeScript-native

## Installation

```bash
# NPM
npm i @likelylogic/collection-fns

# Yarn
yarn add @likelylogic/collection-fns
```

## Usage

Here are some basic examples showing the flexibility and functional nature of the library:

```js
// get the model identified by an id of 5
get(models, 5)
```

```js
// update the window identified by a windowId of 10 with new data 
update(windows, 10, data, 'windowId')
```

```js
// move a tab identified by a tabId 15 to the 5th index in another collection
move(left, 15, 5, right, 'tabId')
```

Check the example files for full code:

- [Basic](./examples/basic.ts) – manage arrays of arbitrary models
- [Advanced](./examples/advanced.ts) – compose the functions into reusable collection classes

## Functions

> Note that the "keyed" column indicates presence of the an optional `key` parameter, which defaults to `'id'`.

### Models

These functions are concerned with single models:

| Function    | Keyed  | Description                                                  | Returns |
| ----------- | ------ | ------------------------------------------------------------ | ------- |
| first       | &nbsp; | Get the first model in a collection                          | model   |
| last        | &nbsp; | Get the last model in a collection                           | model   |
| has         | x      | Test if a collection has a model                             | boolean |
| get         | x      | Get a model from a collection                                | model   |
| getIndex    | x      | Get the index of a model in a collection                     | number  |
| getRandom   | &nbsp; | Get a random model from a collection                         | model   |
| add         | x      | Add a model to a collection                                  | model   |
| addOrMove   | x      | Add a model to a collection, or if it already exists, move it to an index | model   |
| update      | x      | Update a model if it exists in a collection                  | model   |
| move        | x      | Move a model in a collection to a specific index in the same or a different array | model   |
| moveToEnd   | x      | Move a model in a collection to the end of the same or a different array | model   |
| moveByIndex | &nbsp; | Move a model in a collection from one index to another in the same or a different array | model   |
| remove      | x      | Remove a model from a collection                             | model   |

### Collections

These functions manipulate collections, offering simple lodash-like functionality:

| Function | Keyed  | Description                                                  | Returns  |
| -------- | ------ | ------------------------------------------------------------ | -------- |
| merge    | x      | Given two arrays of models, add the models not found in the first array from the second array, and return the new array | array    |
| forEach  | &nbsp; | Iterate over a collection of models and call a function on each model | array    |
| map      | &nbsp; | Iterate over a collection of models, call a function on each model, and return the updated array | array    |
| filter   | o      | Filter a collection of models by property, including matched values | array    |
| omit     | o      | Filter a collection of models by property, omitting matched values | array    |
| sort     | o      | Sort a collection of models by property                      | array    |
| sortBy   | &nbsp; | Utility function to return a sort() comparison function      | function |

# Scripts

 - `npm t`: run test suite
 - `npm start`: run `npm run build` in watch mode
 - `npm run test:watch`: run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:verbose`: run test suite in interactive mode and with verbose output
 - `npm run test:prod`: run linting and generate coverage
 - `npm run build`: generate bundles and typings, create docs
 - `npm run lint`: lints code
 - `npm run commit`: commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

