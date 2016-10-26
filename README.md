# safe-utils

Simple helper methods that lets you access properties without worrying about defensive programming.

## safeGet ##
Wrap your accessor in an arrow function and pass it to safeGet. You get more readable syntax and
safeGet handles any exception for you returning provided default value instead.

```
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

## safeConcat ##
Concat an arbitrary number of arguments. If you wrap a property accessor in an arrow function, we
will skip it if it throws an exception. This is just a convenience, you could achieve the same with safeGet
and an empty string as default value.

```
const {safeConcat} = require('safe-utils')

var req = undefined
safeConcat('/users/', () => req.params.profile.username)
// returns '/users/'

var req = {params: { profile: {username: 'hoyce'}}}
safeConcat('/users/', () => req.params.profile.username)
// returns '/users/hoyce'
```

## safeJoin ##
Join an array into a string with given separator, skipping any items that loosely equals (==) undefined.

```
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
```
