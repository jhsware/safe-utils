# safe-utils

Simple helper methods that lets you access properties without worrying about defensive programming.

## safeGet ##
Wrap your accessor in an arrow function and pass it to safeGet. You get more readable syntax and
safeGet handles any exception for you, returning profided default value instead.

```
const {safeGet} = require('safe-utils')

safeGet(() => test.hallo)
// returns undefined

safeGet(() => test.hallo, 'not found')
// returns 'not found'

var test = {hallo: 'world'}
safeGet(() => test.hallo)
// returns 'world'
```

## safeConcat ##
Concat an arbitrary number of arguments. If you wrap a property accessor in an arrow function, we
will skip it if it doesn't resolve.

```
const {safeConcat} = require('safe-utils')

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
    firstName: 'Sebastian',
    lastName: ''
}
safeJoin([user.firstName, user.lastName], ' ')
// returns 'Sebastian'

user.lastName = 'Ware'
safeJoin([user.firstName, user.lastName], ' ')
// returns 'Sebastian Ware'
```