import assert from 'assert'

import { randomGeneratedQuestions } from '../utils.js'

describe('randomGeneratedQuestions', () => {
  it('should return 5 different questions', () => {
    const questions = randomGeneratedQuestions(5)

    let correctAnswers = []
    for (const key in questions) {
      correctAnswers.push(questions[key].correct)
    }
    const setArr = new Set(correctAnswers)
    assert.equal(setArr.size, 5)
  })
  it('should return 10 different questions', () => {
    const questions = randomGeneratedQuestions(10)

    let correctAnswers = []
    for (const key in questions) {
      correctAnswers.push(questions[key].correct)
    }
    const setArr = new Set(correctAnswers)
    assert.equal(setArr.size, 10)
  })
  it('should return 15 different questions', () => {
    const questions = randomGeneratedQuestions(15)

    let correctAnswers = []
    for (const key in questions) {
      correctAnswers.push(questions[key].correct)
    }
    const setArr = new Set(correctAnswers)
    assert.equal(setArr.size, 15)
  })
  it('should not repeat alternatives', () => {
    const questions = randomGeneratedQuestions(5)

    for (const key in questions) {
      const alternatives = Object.values(questions[key].alternatives)
      const setArr = new Set(alternatives)
      assert.equal(setArr.size, 4)
    }
  })
})
