'use strict'

module.exports = function ciJobNumber () {
  if (process.env.TRAVIS) {
    return parseInt(process.env.TRAVIS_JOB_NUMBER.split('.')[1])
  } else if (process.env.APPVEYOR) {
    return parseInt(process.env.APPVEYOR_JOB_NUMBER)
  } else {
    return 1
  }
}
