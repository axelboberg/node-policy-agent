/**
 * Axel Boberg © 2019
 */

const { Agent, should } = require('../index')

const _policy = [
  // test
  [
    should.matchUri('$input.path', '/test'),
    should.equal('$input.method', 'GET'),
    should.contain('$input.scopes', 'user-read')
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

test('simple authorization', () => {
  expect(agent.authorize(input)).toBe(true)
})