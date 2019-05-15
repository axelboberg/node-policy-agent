# node-policy-agent

A framework for creating authorization policies. Loosely inspired by [OPA](https://www.openpolicyagent.org).

## Example usage

```javascript
  const { Agent, should } = require(node-policy-agent)

  const policy = [
    // /api/users/:id
    [
      should.matchUri('$input.path', '/api/users/:id'),
      should.equal('$input.method', 'GET'),
      should.contain('$input.user.roles', 'admin')
    ],

    // /api/foo
    [
      should.matchUri('$input.path', '/api/foo'),
      should.equal('POST', 'POST'),

      // A custom rule
      input => { 
        if (input.myParam === 'myValue' && 1 + 1 === 2) return true
        return false
      }
    ]
  ]

  const myAgent = new Agent(policy)

  const granted = myAgent.authorize({
    path: '/api/foo/username',
    method: 'GET',
    user: {
      roles: [
        'admin',
        'support'
      ]
    }
  })

  // granted === true
```

## API  

### `new Agent(policies [,opts])`  
Create a new Agent

### `.authorize(input [,policies [,opts]])`  
Authorize some input, provided policies will be used in place of the ones used when creating the Agent.

### Options  
Options for both the constructor and `.authorize()`.

```
{
  detailedResponse: false // Return more details when authorizing. Will return a Boolean if false. False is default.
}
```

### Built in rules  
The exported `require('node-policy-agent').should` contains the following pre-built rules:

#### `.equal(val1, val2)`  
Check if two values are equal

#### `.matchObject(obj1, obj2)`  
Check if two objects contain the same keys and values

#### `.matchRegex(str, regexp)`  
Check if a string matches a regular expression

#### `.matchUri(str, pattern)`  
Check if a string matches a uri-pattern,
valid patterns can contain placeholders idicated by a colon, such as `/api/users/:id`. Trailing slashes are automatically removed from both arguments.

#### `.beLessThan(num1, num2)`  
Check if `num1` is less than `num2`

#### `.beMoreThan(num1, num2)`  
Check if `num1` is more than `num2`

#### `.contain(set, val)`  
Check if the set contains the value, the set can be either a string or an array