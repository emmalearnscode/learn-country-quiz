import assert from 'assert'

import { randomGeneratedQuestions } from '../utils.js'

describe('randomGeneratedQuestions', () => {
  it('should not ask about the same flag', () => {
    const questions = randomGeneratedQuestions()

    let correctAnswers = []
    for (const key in questions) {
      correctAnswers.push(questions[key].correct)
    }
    const setArr = new Set(correctAnswers)
    assert.equal(setArr.size, 5)
  })
  it('should not repeat alternatives', () => {
    const questions = randomGeneratedQuestions()

    for (const key in questions) {
      const alternatives = Object.values(questions[key].alternatives)
      const setArr = new Set(alternatives)
      assert.equal(setArr.size, 4)
    }
  })
})
