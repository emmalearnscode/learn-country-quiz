import countries from './countries.js'

const hardCodedQuestions = {
  1: {
    alternatives: {
      1: 'swe',
      2: 'fra',
      3: 'dnk',
      4: 'bra'
    },
    correct: 'swe'
  },
  2: {
    alternatives: {
      1: 'blz',
      2: 'fra',
      3: 'cub',
      4: 'cog'
    },
    correct: 'fra'
  }
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

export const randomGeneratedQuestions = () => {
  const randomGeneratedQuestionsOBJ = {}
  const countryCodes = Object.keys(countries)
  const shuffledCountries = shuffle(countryCodes)

  for (let i = 1; i <= 5; i++) {
    const randomNumber = Math.floor(Math.random() * 4)
    randomGeneratedQuestionsOBJ[i] = {
      alternatives: {
        1: shuffledCountries[0].toLowerCase(),
        2: shuffledCountries[1].toLowerCase(),
        3: shuffledCountries[2].toLowerCase(),
        4: shuffledCountries[3].toLowerCase()
      },
      correct: shuffledCountries[randomNumber].toLowerCase()
    }
    shuffledCountries.splice(0, 4)
  }

  return randomGeneratedQuestionsOBJ
}

export const createGame = randomQuestions => {
  const questionsOBJ = randomGeneratedQuestions() //kommer uppdatera med random questions

  const generatedQuestions = randomQuestions ? questionsOBJ : hardCodedQuestions

  return {
    currentQuestion: 1,
    questions: generatedQuestions,
    score: { player1: 0, player2: 0 },
    status: 'starting'
  }
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
