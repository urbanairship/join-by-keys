/**
 * Copyright 2015 Urban Airship and Contributors
 */
module.exports = joinByKeys

function joinByKeys(data, joinBy) {
  var getters = joinBy.map(makeGetter)
    , results = []
    , keys

  for(var i = 0; i < data.length; ++i) {
    keys = getJoinValues(data[i])

    if(!keys.filter(notUndefined).length) {
      continue
    }

    for(var j = 0; j < results.length; ++j) {
      var resultKeys = getJoinValues(results[j])

      if(arrayEqual(resultKeys, keys)) {
        results[j] = mergeObjects(results[j], data[i])

        break
      }
    }

    if(j === results.length) {
      // then we never found a matching result.
      results.push(mergeObjects({}, data[i]))
    }
  }

  return results

  function getJoinValues(obj) {
    var values = []

    for(var k = 0; k < getters.length; ++k) {
      values.push(getters[k](obj))
    }

    return values
  }

  function mergeObjects(result, object) {
    var mergeKeys = Object.keys(object)
      , key

    for(var k = 0; k < mergeKeys.length; ++k) {
      key = mergeKeys[k]

      if(joinBy.indexOf(key) > -1) {
        // the whole premise is that these are all the same.
        result[key] = object[key]

        continue
      }

      if(!result[key]) {
        result[key] = []
      }

      result[key].push(object[key])
    }

    return result
  }
}

function arrayEqual(a, b) {
  if(!a.length || (a.length !== b.length)) {
    return false
  }

  for(var i = 0, len = a.length; i < len; ++i) {
    if(a[i] !== b[i]) {
      return false
    }
  }

  return true
}

function makeGetter(key) {
  return function(obj) {
    return obj[key]
  }
}

function notUndefined(point) {
  return typeof point !== 'undefined'
}
