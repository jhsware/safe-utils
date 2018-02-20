'use strict'

module.exports = {
  safeGet: _safeGet,
  safeConcat: _safeConcat,
  safeJoin: _safeJoin
}

/** @function safeGet
 * Access a property without having to check if it's parents are defined 
 * 
 * @param {func} func -- an arrow function that returns the property
 * @param {any} defaultValue -- default value if the property can't be accessed
 *  
 * @example
 * safeGet(() => data.what.is.this)
 *
 */
function _safeGet (func, defaultValue) {
  try {
    var tmp = func.call()
    return tmp !== undefined ? tmp : defaultValue
  } catch (e) {
    return defaultValue
  }
}

/** @function safeConcat
 * Concatinate an arbitrary number of strings and results of passed functions.
 * If any function throws an exception the returned string is empty.
 *
 * @example
 * safeConcat('A leading string ', () => data.what.is.this)
 * safeConcat(() => data.what.is.this, ' a trailing string')
 * safeConcat('A leading string ', () => data.what.is.this, ' a trailing string')
 * safeConcat(() => data.what.is.this, () => data.what.is.this, ' a trailing string')
 *
 */
function _safeConcat () {
  return _safeJoin(arguments, '')
}

/** @function safeJoin
 * Join a list of strings or results of functions with separator inbetween.
 * Params that loosely evaluate as false (==) are skipped.
 *
 * @example
 * safeJoin([firstName, lastName], ' ')
 * safeJoin([() => article.author.firstName, () => article.author.lastName], ' ')
 *
 */
function _safeJoin (items, sep) {
  var o = []
  
  for (var i=0; i < items.length; i++) {
    var fn = items[i]
    if (typeof fn === 'function') {
      try {
        var t = fn()
        if (t) {
          o.push(t) 
        }
      } catch (e) {
        // Do nothing
      }
    } else if (fn) {
      o.push(fn)
    }
  }

  return o.join(sep)
}
