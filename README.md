# safe-utils
![](https://badgen.net/bundlephobia/minzip/safe-utils)

Simple helper methods that lets you access properties without worrying about defensive programming.

This package has been used without issues in production both in Node.js and in browsers (React style apps) for aprox 4 years.

## safeGet ##
NOTE: Optional chaining is now available in the ECMAscipt spec https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
This is included in @babel/preset-env via plugin https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
Available from Node 14.0.0.

```JavaScript
const title = page?.title
```

You might still want to use safeGet to wrap functional calls to get more readable code in cases where failing the call is an acceptable outcome and you want to supress the error.

Wrap your accessor in an arrow function and pass it to safeGet. You get more readable syntax and safeGet catches any exception for you returning provided default value instead.

NOTE! There is a performane hit when safeGet catches errors, but this hasn't been a problem in actual applications.

```JavaScript
const {safeGet} = require('safe-utils')

var test = undefined
safeGet(() => test.hallo)
// returns undefined

var test = undefined
safeGet(() => test.hallo, 'not found')
// returns 'not found'

var test = {hallo: 'world'}
safeGet(() => test.hallo)
// returns 'world'
```

## safeJoin ##
Join an array into a string with given separator, skipping any items that loosely equals (==) undefined.

```JavaScript
const {safeJoin} = require('safe-utils')

var user = {
    firstName: 'John',
    lastName: ''
}
safeJoin([user.firstName, user.lastName], ' ')
// returns 'John'

var user = {
    firstName: 'John',
    lastName: 'Doodle'
}
safeJoin([user.firstName, user.lastName], ' ')
// returns 'John Doodle'

// Using safeGet style method calls

safeJoin([() => user.firstName, () => user.lastName], ' ')
// returns 'John Doodle'

safeJoin([() => not.existing.prop, () => user.lastName], ' ')
// returns 'Doodle'
```

## safeCatch ##
Call a promise and return result and error in a Node inspired result object.

When used with await, this helper gives you more readable code by removing the nested catch.

```JavaScript
const {err, res} = await safeCatch(myPromisFunc)(params, to, promiseFunc)
```
