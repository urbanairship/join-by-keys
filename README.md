# join-by-keys

Join an array of objects on a common key or keys.

## Example

```
var join = require('join-by-keys')

var result
  , data

data = [
    {
      'i': 0
      'j': 0
      'v': 1
    }
  , {
      'i': 0
      'j': 0
      'v': 2
    }
  , {
      'i': 1
      'j': 0
      'v': 3
    }
  , {
      'i': 1
      'j': 1
      'v': 4
    }
  , {
      'i': 1
      'j': 1
      'v': 5
    }
]

join(data, ['i', 'j']) 
// returns:
// [
//     {i: 0, j: 0, v: [1, 2]}
//   , {i: 1, j: 0, v: [3]}
//   , {i: 1, j: 1, v: [4, 5]}
// ]

```

## API

The module exports a function:

```javascript

function(data, keys) -> joined_data
```

### Arguments
- `data` is assumed to be an array of JavaScript objects to join.
- `keys` is an array of strings representing the names of attributes whose
  values should be used to join the data

### Return value

`joined_data` is an array of JavaScript objects: The join of the data on the
specified keys. It is computed as follows:

- Find all the elements of `data` with the same value in each of the `keys`
  slots.
- Create a new object representing the join of the matching elements by doing
  the iterating over each key and applying the following rules:
    - If key is in `keys`, on the new object, set the key to the value of the first matching object. 
      (It doesn't matter which you choose, since they are all the same
      anyway).
    - If key is *not* in `keys`, in the returned object, set key to an array
      holding all the values for the given key found on all of the matching
      objects.

## License

This project is licensed under the Apache License, Version 2.0. See
[LICENSE][license] for the full license.

[license]: ./LICENSE
