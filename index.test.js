'use strict'

const ciJobNumber = require('./')

it('returns 1 when run without CI', () => {
  expect(ciJobNumber()).toEqual(1)
})
