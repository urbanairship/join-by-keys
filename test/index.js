var join = require('../')

var test = require('tape')

test('can join on one key', function(t) {
  var expectedResult = []
    , arrayOfData = []
    , result

  t.plan(1)

  arrayOfData.push({
      'a': 'sunshine'
    , 'b': 'soldier'
  })

  arrayOfData.push({
      'a': 'sunshine'
    , 'b': 'culture'
  })

  arrayOfData.push({
      'a': 'chaos'
    , 'b': 'non-comformity'
  })

  arrayOfData.push({
      'a': 'chaos'
    , 'b': 'conditioning'
  })

  result = join(arrayOfData, ['a'])

  expectedResult = []

  expectedResult.push({
      'a': 'sunshine'
    , 'b': ['soldier', 'culture']
  })

  expectedResult.push({
      'a': 'chaos'
    , 'b': ['non-comformity', 'conditioning']
  })

  t.deepEqual(result, expectedResult)

  t.end()
})

test('can join on multiple keys', function(t) {
  var expectedResults = []
    , data = []
    , result

  t.plan(1)

  data.push({
      'a': 'sunshine'
    , 'b': 'soldier'
    , 'count': 10
  })

  data.push({
      'a': 'sunshine'
    , 'b': 'soldier'
    , 'count': 1
  })

  data.push({
      'a': 'sunshine'
    , 'b': 'civilian'
    , 'count': 1
  })

  data.push({
      'a': 'sunshine'
    , 'b': 'civilian'
    , 'count': 11
  })

  data.push({
      'a': 'chaos'
    , 'b': 'legionaire'
    , 'count': 10
  })

  data.push({
      'a': 'chaos'
    , 'b': 'legionaire'
    , 'count': 5
  })

  data.push({
      'a': 'chaos'
    , 'b': 'officer'
    , 'count': 2
  })

  data.push({
      'a': 'chaos'
    , 'b': 'officer'
    , 'count': 4
  })

  data.push({
      'a': 'chaos'
    , 'b': 'officer'
  })

  result = join(data, ['a', 'b'])

  expectedResults.push({
      'a': 'sunshine'
    , 'b': 'soldier'
    , 'count': [10, 1]
  })

  expectedResults.push({
      'a': 'sunshine'
    , 'b': 'civilian'
    , 'count': [1, 11]
  })

  expectedResults.push({
      'a': 'chaos'
    , 'b': 'legionaire'
    , 'count': [10, 5]
  })

  expectedResults.push({
      'a': 'chaos'
    , 'b': 'officer'
    , 'count': [2, 4]
  })

  t.deepEqual(result, expectedResults)

  t.end()
})

test('fails correctly for non-present keys', function(t) {
  var expectedResult = []
    , data = []
    , result

  data.push({a: {b: 'a', v: 1}})
  data.push({a: {b: 'a', v: 2}})
  data.push({a: {b: 'b', v: 3}})
  data.push({a: {b: 'b', v: 4}})

  result = join(data, ['a.b'])

  t.deepEqual(result, expectedResult)
  t.end()
})

test('can handle falsey keys', function(t) {
  var expected = []
    , data = []
    , result

  t.plan(1)

  data.push({i: 0, v: 0, k: 1})
  data.push({i: 0, v: 0})

  result = join(data, ['i'])

  expected = [{i: 0, v: [0, 0], k: [1]}]

  t.deepEqual(expected, result)
  t.end()
})
