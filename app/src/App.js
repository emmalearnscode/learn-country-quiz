import React, { useEffect, useState } from 'react'
import { Route } from 'wouter'
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

//Componets
import StartPage from './components/StartPage.js'
import GamePage from './components/GamePage.js'
import SetupPage from './components/SetupPage.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCdZj2RJiXOpnGw8qMFGwFO2VbHR1hYOnQ',
  authDomain: 'new-flag-game.firebaseapp.com',
  databaseURL: 'https://new-flag-game-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'new-flag-game',
  storageBucket: 'new-flag-game.appspot.com',
  messagingSenderId: '506951071245',
  appId: '1:506951071245:web:198d921497d464f70f4744'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getDatabase(app)

const App = () => {
  const [minusScore, setMinusScore] = useState(true) // activeras när den är false
  const [randomizeFlags, setRandomizeFlags] = useState(true)
  const [gameTie, setGameTie] = useState(true)

  const featureFlags = {
    minusScore,
    randomizeFlags,
    gameTie
  }

  useEffect(() => {
    const featureFlags = JSON.parse(localStorage.getItem('featureFlags'))
    if (featureFlags) {
      setMinusScore(featureFlags.minusScore)
      setRandomizeFlags(featureFlags.randomizeFlags)
      setGameTie(featureFlags.gameTie)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('featureFlags', JSON.stringify(featureFlags))
  }, [minusScore, randomizeFlags, gameTie])

  return (
    <div className="app">
      <div className="header">THE FLAG GAME</div>
      <div className="middle">
        <Route path="/">
          <StartPage randomizeFlags={randomizeFlags} />
        </Route>
        <Route path="/setup">
          <SetupPage
            minusScore={minusScore}
            setMinusScore={setMinusScore}
            randomizeFlags={randomizeFlags}
            setRandomizeFlags={setRandomizeFlags}
            gameTie={gameTie}
            setGameTie={setGameTie}
          />
        </Route>
        <Route path="/game/:gameId/:playerId">
          {params => {
            return <GamePage gameId={params.gameId} playerId={params.playerId} />
          }}
        </Route>
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
