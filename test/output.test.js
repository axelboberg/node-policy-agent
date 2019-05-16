/**
 * Axel Boberg © 2019
 */

const { Agent, should } = require('../index')

const _policy = [
  [
    should.matchUri('$input.url', '/foo/bar'),
    (input, output) => {
      output.foo = 'bar'
      return true
    }
  ]
]

const input = {
  url: '/foo/bar'
}

const agent = new Agent(_policy, { detailedResponse: true })

test('output', () => {
  expect(agent.authorize(input).output.foo).toBe('bar')
})