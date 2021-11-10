import React from 'react'
import * as utils from '../utils'
import countries from '../countries'
import { ref, update } from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'
import { db } from '../firebase-analytics'
import QuickResults from './QuickResults'

const QuestionPage = ({ gameId, playerId }) => {
  const [gameSnapshot, gameLoading, gameError] = useObject(ref(db, `games/${gameId}`))
  const userProfile = localStorage.getItem('profile')
  const [profileSnapshot, profileLoading, profileError] = useObject(ref(db, `profiles/${userProfile}`))

  if (gameLoading || profileLoading) return <div className="fw6 fs5">Loading...</div>
  const game = gameSnapshot.val()
  const profile = profileSnapshot.val()

  const youKey = `player${playerId}`
  const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`

  const question = game.questions[`${game.currentQuestion}`]

  if (!question) return 'Loading...'

  const featureFlags = JSON.parse(localStorage.getItem('featureFlags'))

  const answer = async countryCode => {
    if (question.fastest) return

    const updates = {}
    updates[`/games/${gameId}/questions/${game.currentQuestion}/fastest`] = { player: playerId, answer: countryCode }
    if (countryCode == question.correct) {
      updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] + 1
    } else if (countryCode != question.correct && featureFlags.minusScore === true) {
      updates[`/games/${gameId}/score/${youKey}`] = game.score[youKey] - 1
    }

    await update(ref(db), updates)

    if (game.currentQuestion < Object.values(game.questions).length) {
      await utils.sleep(1000)
      const updates2 = {}
      updates2[`/games/${gameId}/currentQuestion`] = parseInt(game.currentQuestion) + 1
      await update(ref(db), updates2)
    } else {
      await utils.sleep(1000)
      const updates2 = {}
      updates2[`/games/${gameId}/status`] = 'finished'
      await update(ref(db), updates2)
    }
  }

  return (
    <div className="page">
      <div className="f32">
        <div className={`flag ${question.correct}`}></div>
      </div>
      <div className={`alternatives ${profile.grid ? 'grid-view' : ''}`}>
        {Object.entries(question.alternatives).map(([k, countryCode]) => {
          let correct = null
          let youOrOpponent = false
          if (question.fastest && question.fastest.answer == countryCode) {
            correct = question.fastest.answer === question.correct
            if (question.fastest.player === playerId) {
              youOrOpponent = `YOU ${correct ? ' +1' : ''}`
            } else {
              youOrOpponent = `OPPONENT ${correct ? ' +1' : ''}`
            }
          }
          return (
            <div
              className={`button alt ${correct && 'alt-green'} ${correct === false && 'alt-red'}`}
              key={countryCode}
              title={countryCode}
              onClick={() => answer(countryCode)}
            >
              {countries[countryCode.toUpperCase()]}
              {}
              {youOrOpponent && <div className="alt-label">{youOrOpponent}</div>}
            </div>
          )
        })}
      </div>
      {question.fastest && <div className="fs7 fw5 m9">Get ready for the next question...</div>}
      {question.fastest && <QuickResults you={game.score[youKey]} opponent={game.score[opponentKey]} />}
    </div>
  )
}

export default QuestionPage
