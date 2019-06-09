/**
 * Axel Boberg © 2019
 */

const { Agent, should } = require('../index')

const _policy = [
  [
    should.equal('$input.foo', 'bar')
  ]
]

const input = {
  foo: 'bar'
}

const agent = new Agent(_policy)

test('simple authorization', () => {
  expect(agent.authorize(input)).toBe(true)
})