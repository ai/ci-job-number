'use strict'

const ciJobNumber = require('./')

let originEnv = process.env
delete originEnv.TRAVIS
beforeEach(() => {
  process.env = { }
  for (let i in originEnv) process.env[i] = originEnv[i]
})

it('returns 1 when run without CI', () => {
  expect(ciJobNumber()).toEqual(1)
})

it('supports Travis CI', () => {
  process.env.TRAVIS = '1'
  process.env.TRAVIS_JOB_NUMBER = '207.2'
  expect(ciJobNumber()).toEqual(2)
})

it('supports AppVeyor', () => {
  process.env.APPVEYOR = '1'
  process.env.APPVEYOR_JOB_NUMBER = '3'
  expect(ciJobNumber()).toEqual(3)
})

it('supports CircleCI', () => {
  process.env.CIRCLECI = 'true'
  process.env.CIRCLE_NODE_INDEX = '3'
  expect(ciJobNumber()).toEqual(4)
})

it('supports Semaphore', () => {
  process.env.SEMAPHORE = 'true'
  process.env.SEMAPHORE_CURRENT_THREAD = '5'
  expect(ciJobNumber()).toEqual(5)
})

it('supports Gitlab CI with parallel', () => {
  process.env.GITLAB_CI = 'true'
  process.env.CI_NODE_INDEX = '7'
  expect(ciJobNumber()).toEqual(7)
})

it('supports Gitlab CI without parallel', () => {
  process.env.GITLAB_CI = 'true'
  expect(ciJobNumber()).toEqual(1)
})

it('supports own variable', () => {
  process.env.CI_JOB_NUMBER = '8'
  process.env.TRAVIS = '1'
  process.env.TRAVIS_JOB_NUMBER = '207.2'
  expect(ciJobNumber()).toEqual(8)
})
