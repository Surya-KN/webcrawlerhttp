const { normalizeUrl } = require('./crawl.js')
const {test,expect} = require('@jest/globals')

test('normalizeUrl strip protocol',() =>{
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeUrl(input)
  const excepted = 'blog.boot.dev/path'
  expect(actual).toEqual(excepted)
})

test('normalizeUrl strip trail',() =>{
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeUrl(input)
  const excepted = 'blog.boot.dev/path'
  expect(actual).toEqual(excepted)
})

test('normalizeUrl capitalize',() =>{
  const input = 'https://BLOG.boot.dev/path/'
  const actual = normalizeUrl(input)
  const excepted = 'blog.boot.dev/path'
  expect(actual).toEqual(excepted)
})

test('normalizeUrl strip http',() =>{
  const input = 'http://BLOG.boot.dev/path/'
  const actual = normalizeUrl(input)
  const excepted = 'blog.boot.dev/path'
  expect(actual).toEqual(excepted)
})





