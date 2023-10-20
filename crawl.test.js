const { normalizeUrl,getURLfromHTML} = require('./crawl.js')
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

test('getURLfromHTML absoloute',() =>{
  const input = `
  <html>
    <body>
      <a href = "https://blog.boot.dev/path"></a>
    </body>
  </html>
  `
  const baseURL = 'https://blog.boot.dev/path'
  const actual = getURLfromHTML(input,baseURL)
  const excepted = ['https://blog.boot.dev/path']
  expect(actual).toEqual(excepted)
})

test('getURLfromHTML relative',() =>{
  const input = `
  <html>
    <body>
      <a href = "https://blog.boot.dev/path"></a>
      <a href = "/path"></a>
    </body>
  </html>
  `
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLfromHTML(input,baseURL)
  const excepted = ['https://blog.boot.dev/path','https://blog.boot.dev/path']
  expect(actual).toEqual(excepted)
})

test('getURLfromHTML both',() =>{
  const input = `
  <html>
    <body>
      <a href = "/path"></a>
    </body>
  </html>
  `
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLfromHTML(input,baseURL)
  const excepted = ['https://blog.boot.dev/path']
  expect(actual).toEqual(excepted)
})

test('getURLfromHTML invalid',() =>{
  const input = `
  <html>
    <body>
      <a href = "path"></a>
    </body>
  </html>
  `
  const baseURL = 'https://blog.boot.dev'
  const actual = getURLfromHTML(input,baseURL)
  const excepted = []
  expect(actual).toEqual(excepted)
})





