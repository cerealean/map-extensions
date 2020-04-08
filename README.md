# Map Extensions

This is a small, single purpose package to assist in working with JavaScript / TypeScript Maps.

#### Installation

`npm i map-extensions`

#### Added Functionality

This package provides a MapWrapper object which, exactly as it sounds, wraps current Map functionality while providing a few other useful methods. Those methods currently are:

- find
- filter
- map

The added methods perform exactly as their Array counterparters but instead work on the wrapped Map object.

#### Examples

###### Find

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

###### Filter

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

const actual = wrapper.filter((value) => value > 6);

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

###### Map

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
