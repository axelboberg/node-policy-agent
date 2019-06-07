/**
 * Axel Boberg © 2019
 */

const { Agent, should } = require('../index')

const _policy = [
  // test
  [
    should.matchUri('$input.path', '/test'),
    should.equal('$input.method', 'GET'),
    input => {
      return new Promise(resolve => {
        setTimeout(() => resolve(true), 200)
      })
    }
  ]
]

const input = {
  path: '/test',
  method: 'GET',
  scopes: [
    'user-read',
    'user-write'
  ]
}

const agent = new Agent(_policy)

test('execute an asynchronous rule', () => {
  expect(agent.authorize(input)).resolves.toBe(true)
})