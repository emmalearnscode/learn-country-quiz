import React from 'react'
import * as R from 'ramda'
import { useLocation } from 'wouter'
import { customAlphabet } from 'nanoid'
import * as utils from '../utils'

//analytics
import { logEvent } from 'firebase/analytics'
import { analytics } from '../App'

import { db } from '../firebase-analytics'
import countries from '../countries'

import { ref, update } from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'
import LatestGames from './LatestGames'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvxyz', 5)

const countriesArr = Object.keys(countries)

const StartPage = ({ randomizeFlags, randomQuestions }) => {
  const [snapshot, loading, error] = useObject(ref(db, 'nextGame'))
  const [location, setLocation] = useLocation()
  const userProfile = localStorage.getItem('profile')
  const [profileSnapshot, profileLoading, profileError] = useObject(ref(db, `profiles/${userProfile}`))

  const randomNum = Math.floor(Math.random() * 156 + 1)
  const countriesArrSlice = countriesArr.slice(randomNum, randomNum + 60)
  if (loading || profileLoading) return <div className="fw6 fs5">Loading...</div>
  const nextGame = snapshot.val()
  const profile = profileSnapshot.val()

  const play = async numQs => {
    if (R.isNil(nextGame)) {
      const updates = {}
      const gameId = nanoid()
      updates['/nextGame'] = gameId
      await update(ref(db), updates)
      setLocation(`/game/${gameId}/1`)
    } else {
      const game = utils.createGame(randomQuestions, numQs)
      const updates = {}
      updates['/nextGame'] = null
      updates[`/games/${nextGame}`] = game
      await update(ref(db), updates)
      setLocation(`/game/${nextGame}/2`)

      await utils.sleep(1000)
      const updates2 = {}
      updates2[`/games/${nextGame}/status`] = 'playing'
      await update(ref(db), updates2)
    }

    analytics && logEvent(analytics, 'game_started')
  }

  const flags =
    randomizeFlags === false ? (
      <div className="st-flags">
        <div className="f32">
          <div className={`flag aze`}></div>
        </div>
        <div className="f32">
          <div className={`flag bih`}></div>
        </div>
        <div className="f32">
          <div className={`flag brb`}></div>
        </div>
        <div className="f32">
          <div className={`flag swe`}></div>
        </div>
        <div className="f32">
          <div className={`flag bgd`}></div>
        </div>
        <div className="f32">
          <div className={`flag bel`}></div>
        </div>
        <div className="f32">
          <div className={`flag bfa`}></div>
        </div>
        <div className="f32">
          <div className={`flag bgr`}></div>
        </div>
        <div className="f32">
          <div className={`flag bhr`}></div>
        </div>
        <div className="f32">
          <div className={`flag bdi`}></div>
        </div>
        <div className="f32">
          <div className={`flag ben`}></div>
        </div>
        <div className="f32">
          <div className={`flag bmu`}></div>
        </div>
        <div className="f32">
          <div className={`flag brn`}></div>
        </div>
        <div className="f32">
          <div className={`flag bol`}></div>
        </div>
        <div className="f32">
          <div className={`flag bra`}></div>
        </div>
        <div className="f32">
          <div className={`flag bhs`}></div>
        </div>
        <div className="f32">
          <div className={`flag btn`}></div>
        </div>
        <div className="f32">
          <div className={`flag fra`}></div>
        </div>
        <div className="f32">
          <div className={`flag bwa`}></div>
        </div>
      </div>
    ) : (
      <div className="st-flags">
        {countriesArrSlice.map(country => (
          <div className="f32" key={country}>
            <div className={`flag ${country.toLowerCase()}`}></div>
          </div>
        ))}
      </div>
    )

  const newButtons = (
    <div>
      <h3 className="choose-num">Your opponent is waiting. Please choose number of questions...</h3>
      <div className="buttonContainer">
        <div className="button btn-square btn-choice" onClick={() => play(5)}>
          5
        </div>
        <div className="button btn-square btn-choice" onClick={() => play(10)}>
          10
        </div>
        <div className="button btn-square btn-choice" onClick={() => play(15)}>
          15
        </div>
      </div>
    </div>
  )

  return (
    <div className="page">
      {flags}
      {profile.numQuestions && nextGame ? (
        newButtons
      ) : (
        <div className="button btn-square" onClick={() => play(5)}>
          START
        </div>
      )}

      {profile.latestGames && <LatestGames />}
    </div>
  )
}

export default StartPage
