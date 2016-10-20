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
    return func.call()
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
  try {
    var outp = ''
    for (var i = 0; i < arguments.length; i++) {
      outp += typeof arguments[i] === 'function' ? arguments[i].call() : arguments[i]
    }
  } catch (e) {
    return ''
  }
}

/** @function safeJoin
 * Concatinate a list of strings with separator inbetween.
 * Params that loosely evaluate as false (==) are skipped.
 *
 * @example
 * safeJoin([firstName, lastName], ' ')
 *
 */
function _safeJoin (items, separator) {
  var outp = items.filter((item) => item)
  return outp.join(separator)
}
