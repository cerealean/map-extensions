![Run Tests](https://github.com/cerealean/map-extensions/workflows/Run%20Tests/badge.svg?branch=master)

# Map Extensions

This is a small, single purpose package to assist in working with JavaScript / TypeScript Maps.

#### Installation

`npm i map-extensions`

#### Added Functionality

This package provides a MapWrapper object which, exactly as it sounds, wraps current Map functionality while providing a few other useful methods. Those methods currently are:

- find
- filter
- map
- some
- tuples

The added methods perform similarly to their Array counterparters but instead work on the wrapped Map object.

#### MapWrapper Examples

##### Find

```typescript
const map = new Map([
  ["first", "first value"],
  ["second", "second value"],
  ["third", "third value"],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.find((value) => value === "second value");

// actual will be the second tuple from the Map
// Special note that find returns an object named Tuple created in this package. It is a wrapper for the native tuple to make its use more clear.

const key = actual.key; // Would be "second"
const value = actual.value; // Would be "second value"
const nativeTuple = actual.toNativeTuple(); // Would be ["second", "second value"]
const newMap = actual.toMap(); // Would be a new Map instance with the tuple included within it
const newWrappedMap = actual.toMapWrapper(); // Would be a new MapWrapper instance with the tuple included within it
```

##### Filter

```typescript
const map = new Map<string, number>([
  ["uno", 1],
  ["dos", 2],
  ["tres", 3],
  ["quatro", 4],
  ["cinco", 5],
  ["seis", 6],
  ["siete", 7],
  ["ocho", 8],
  ["nueve", 9],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.filter((value, _key) => value > 6);

// actual will be a Map only containing the tuples 7, 8, and 9
console.log(actual);
/*
Will output:
Map {
  'siete' => 7,
  'ocho' => 8,
  'nueve' => 9 }
*/
```

##### Map

```typescript
const map = new Map<string, number>([
  ["uno", 1],
  ["dos", 2],
  ["tres", 3],
  ["quatro", 4],
  ["cinco", 5],
  ["seis", 6],
  ["siete", 7],
  ["ocho", 8],
  ["nueve", 9],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.map((value) => Math.pow(value, value));

// actual will be an array of the original numbers to their own power
// output would be [ 1, 4, 27, 256, 3125, 46656, 823543, 16777216, 387420489 ]
```
##### Some

```typescript
const map = new Map<string, number>([
  ["uno", 1],
  ["dos", 2],
  ["tres", 3],
  ["quatro", 4],
  ["cinco", 5],
  ["seis", 6],
  ["siete", 7],
  ["ocho", 8],
  ["nueve", 9],
]);
const wrapper = new MapWrapper(map);

let actual = wrapper.some((value, key) => key === 'ocho' || value === 8); // Returns true

let actual2 = wrapper.some(value => value > 100); // Returns false
```
##### Tuples

This is a method similar to the [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) method on a Map. The difference is that tuples will return a collection of Tuple objects instead of the native iterator containing key, value pairs.

```typescript
const map = new Map<string, number>([
    ['first', 1],
    ['second', 2],
    ['third', 3],
]);
const wrapper = new MapWrapper(map);

let actual = wrapper.tuples();

console.log(actual[0].key); // 'first'
console.log(actual[2].value); // 3

console.log(actual);
/*
Will output:
[
  Tuple { key: 'first', value: 1 },
  Tuple { key: 'second', value: 2 },
  Tuple { key: 'third', value: 3 }
]
*/
```

### Custom Tuple Object Examples

This package includes a custom Tuple object to make it easier working with Map entries.

##### key

```typescript
const map = new Map<string, number>([
    ['first', 1],
    ['second', 2],
    ['third', 3],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.tuples();
const myTuple = actual[0];

console.log(myTuple.key) // 'first';
```

##### value

```typescript
const map = new Map<string, number>([
    ['first', 1],
    ['second', 2],
    ['third', 3],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.tuples();
const myTuple = actual[0];

console.log(myTuple.value) // 1;
```

##### toNativeTuple

```typescript
const map = new Map<string, number>([
    ['first', 1],
    ['second', 2],
    ['third', 3],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.tuples();
const myTuple = actual[0];

console.log(myTuple.toNativeTuple()); // ['first', 1]
```
##### toMap

```typescript
const map = new Map<string, number>([
    ['first', 1],
    ['second', 2],
    ['third', 3],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.tuples();
const myTuple = actual[1];

console.log(myTuple.toMap()); 
/*
Returns a new Map object containing only myTuple as an entry:

Map {
  'second' => 2
  }
*/
```
##### toMapWrapper

```typescript
const map = new Map<string, number>([
    ['first', 1],
    ['second', 2],
    ['third', 3],
]);
const wrapper = new MapWrapper(map);

const actual = wrapper.tuples();
const myTuple = actual[2];

console.log(myTuple.toMapWrapper()); 
/*
Returns a new MapWrapper object containing only myTuple as an entry.
*/
```