const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const normalizedURL = 'wagslane.dev/path'

test('Normalise format 1', () => {
    expect(normalizeURL('https://wagslane.dev/path/')).toBe(normalizedURL);
});

test('Normalise format 2', () => {
    expect(normalizeURL('https://wagsLane.Dev/path')).toBe(normalizedURL);
});

test('Normalise format 3', () => {
    expect(normalizeURL('https://wagslane.dev/path')).toBe(normalizedURL);
});

test('Normalise format 3', () => {
    expect(normalizeURL('http://wagslane.dev/path')).toBe(normalizedURL);
});


test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://dog.com'
    const inputBody = '<html><body><a href="https://dog.com"><span>Dog.com></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://dog.com/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://dog.com'
    const inputBody = '<html><body><a href="/path/one"><span>dog.com></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://dog.com/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML both', () => {
    const inputURL = 'https://dog.com'
    const inputBody = '<html><body><a href="/path/one"><span>Dog.com></span></a><a href="https://other.com/path/one"><span>Dog.com></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://dog.com/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })


test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://dog.com'
    const inputBody = '<html><body><a href="path/one"><span>Dog.com></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
  })