module.exports = join_by_keys

function join_by_keys(data, join_by) {
  var getters = join_by.map(make_getter)
    , results = []

  for(var i = 0, len = data.length; i < len; ++i) {
    var keys = get_join_values(data[i])

    if(!keys.filter(not_undefined).length) {
      continue
    }

    for(var j = 0, jen = results.length; j < jen; ++j) {
      var result_keys = get_join_values(results[j])

      if(array_equal(result_keys, keys)) {
        results[j] = merge_objects(results[j], data[i])

        break
      }
    }

    if(j === results.length) {
      // then we never found a matching result.
      results.push(merge_objects({}, data[i]))
    }
  }

  return results

  function get_join_values(obj) {
    var values = []
      , len
      , i

    for(i = 0, len = getters.length; i < len; ++i) {
      values.push(getters[i](obj))
    }

    return values
  }

  function merge_objects(result, object) {
    var value
      , len
      , i

    var keys = Object.keys(object)

    for(i = 0, len = keys.length; i < len; ++i) {
      var key = keys[i]

      if(join_by.indexOf(key) > -1) {
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

function array_equal(a, b) {
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

function make_getter(key) {
  return function(obj) {
    return obj[key]
  }
}

function not_undefined(point) {
  return typeof point !== 'undefined'
}
