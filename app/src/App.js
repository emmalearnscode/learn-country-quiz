import React, { useEffect, useState } from 'react'
import { Route } from 'wouter'
import './App.css'

//Analytics
import { app } from './firebase-analytics'
import { getAnalytics } from 'firebase/analytics'

import LogRocket from 'logrocket'

//Componets
import StartPage from './components/StartPage.js'
import GamePage from './components/GamePage.js'
import SetupPage from './components/SetupPage.js'
import CookiesPage from './components/CookiesPage.js'
import CookieBanner from './components/CookieBanner.js'
import SetupAdvanced from './components/SetupAdvanced'

export let analytics = localStorage.getItem('analyticsEnabled') ? getAnalytics(app) : null
export let logRocket = localStorage.getItem('analyticsEnabled') ? LogRocket.init('sflrgz/new-flag-game') : null

const App = () => {
  const [minusScore, setMinusScore] = useState(true) // activeras när den är false
  const [randomizeFlags, setRandomizeFlags] = useState(true)
  const [gameTie, setGameTie] = useState(true)
  const [randomQuestions, setRandomQuestions] = useState(false)
  const [cookieBanner, setCookieBanner] = useState(false)
  const [profile, setProfile] = useState('')
  const [footerColor, setFooterColor] = useState('#000000')

  const featureFlags = {
    minusScore,
    randomizeFlags,
    gameTie,
    cookieBanner,
    randomQuestions
  }

  useEffect(() => {
    const profile = localStorage.getItem('profile')
    if (profile) {
      setProfile(profile)
    } else {
      const randomNumber = Math.random()
      if (randomNumber < 0.3) {
        localStorage.setItem('profile', 'pilots')
        setProfile('pilots')
      } else {
        localStorage.setItem('profile', 'rest')
        setProfile('rest')
      }
    }
  }, [])

  useEffect(() => {
    const featureFlags = JSON.parse(localStorage.getItem('featureFlags'))
    if (featureFlags) {
      setMinusScore(featureFlags.minusScore)
      setRandomizeFlags(featureFlags.randomizeFlags)
      setGameTie(featureFlags.gameTie)
      setRandomQuestions(featureFlags.randomQuestions)
      setCookieBanner(featureFlags.cookieBanner)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('featureFlags', JSON.stringify(featureFlags))
  }, [minusScore, randomizeFlags, gameTie, randomQuestions, cookieBanner])

  useEffect(() => {
    switch (profile) {
      case 'alpha':
        setFooterColor('#4D6EF6')
        break
      case 'beta':
        setFooterColor('#FBB005')
        break
      case 'pilots':
        setFooterColor('#FB5253')
        break
      case 'rest':
        setFooterColor('#82C91F')
        break
      default:
        setFooterColor('#000000')
    }
  }, [profile])

  const initializeAnalytics = () => {
    console.log('initializing analytics /App.js')
    analytics = getAnalytics(app)
    logRocket = LogRocket.init('sflrgz/new-flag-game')
  }

  return (
    <div className="app">
      {cookieBanner && <CookieBanner onAccept={initializeAnalytics} />}
      <div className="header">THE FLAG GAME</div>
      <div className="middle">
        <Route path="/">
          <StartPage randomQuestions={randomQuestions} randomizeFlags={randomizeFlags} />
        </Route>
        <Route path="/setup">
          <SetupPage
            minusScore={minusScore}
            setMinusScore={setMinusScore}
            randomizeFlags={randomizeFlags}
            setRandomizeFlags={setRandomizeFlags}
            gameTie={gameTie}
            setGameTie={setGameTie}
            randomQuestions={randomQuestions}
            setRandomQuestions={setRandomQuestions}
            cookieBanner={cookieBanner}
            setCookieBanner={setCookieBanner}
            profile={profile}
            setProfile={setProfile}
          />
        </Route>
        <Route path="/setup-advanced">
          <SetupAdvanced />
        </Route>
        <Route path="/game/:gameId/:playerId">
          {params => {
            return <GamePage gameId={params.gameId} playerId={params.playerId} />
          }}
        </Route>
        <Route path="/cookies">
          <CookiesPage />
        </Route>
      </div>
      <div className="footer" style={{ backgroundColor: footerColor }}></div>
    </div>
  )
}

export default App
