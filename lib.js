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
export const safeGet = function (func, defaultValue) {
  try {
    var tmp = func.call()
    return tmp !== undefined ? tmp : defaultValue
  } catch (e) {
    return defaultValue
  }
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
export const safeJoin = function (items, sep) {
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

/** @function safeCatch
 * Call a promise and return result and error in a Node inspired result object
 * {err, res}
 *
 * @example
 * const {err, res} = await safeCatch(myPromisFunc)(params, to, promiseFunc)
 *
 */
export const safeCatch = function (promiseFunc) {
  return () => {
    return promiseFunc.apply(promiseFunc, arguments)
      .then((res) => {
        return Promise.resolve({ err: undefined, res })
      })
      .catch((err) => {
        return Promise.resolve({ err, res: undefined })
      })
    }
}