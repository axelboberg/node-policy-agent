/**
 * Axel Boberg © 2019
 */

const { should } = require('../index')

test('equals', () => {
  expect(should.equal('foo', 'foo')()).toBe(true)
})

test('does not equal', () => {
  expect(should.equal('foo', 'bar')()).toBe(false)
})

test('matches regex', () => {
  expect(should.matchRegex('foo', /foo/)()).toBe(true)
})

test('does not match regex', () => {
  expect(should.matchRegex('bar', /foo/)()).toBe(false)
})

test('matches ordered object', () => {
  expect(should.matchObject({'foo': 'bar'}, {'foo': 'bar'})()).toBe(true)
})

test('matches unordered object', () => {
  expect(should.matchObject({'foo': 'bar', 'baz': 'qux'}, {'baz': 'qux', 'foo': 'bar'})()).toBe(true)
})

test('does not match object', () => {
  expect(should.matchObject({'foo': 'baz', 1: 2}, {'foo': 'bar'})()).toBe(false)
})

test('matches uri', () => {
  expect(should.matchUri('/a/b/e/d/', '/a/b/:cde/d')()).toBe(true)
})

test('does not match uri', () => {
  expect(should.matchUri('/a/b/c/d', '/a/b/e/d/')()).toBe(false)
})

test('array contains', () => {
  expect(should.contain([1, 2, 3, 4, 5], 2)()).toBe(true)
})

test('array does not contain', () => {
  expect(should.contain([1, 2, 3, 4, 5], 6)()).toBe(false)
})

test('string contains', () => {
  expect(should.contain('hello world', 'ello w')()).toBe(true)
})

test('string does not contain', () => {
  expect(should.contain('foo bar', 'åäA')()).toBe(false)
})

test('is less than', () => {
  expect(should.beLessThan(1, 2)()).toBe(true)
})

test('is not less than', () => {
  expect(should.beLessThan(4, 2)()).toBe(false)
})

test('is more than', () => {
  expect(should.beMoreThan(3245, 421)()).toBe(true)
})

test('is not more than', () => {
  expect(should.beMoreThan(21, 4568)()).toBe(false)
})