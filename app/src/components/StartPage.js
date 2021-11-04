import React from 'react'
import * as R from 'ramda'
import { useLocation } from 'wouter'
import { customAlphabet } from 'nanoid'
import * as utils from '../utils'

import { db } from '../App'

import { ref, update } from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvxyz', 5)



const StartPage = () => {
    const [snapshot, loading, error] = useObject(ref(db, 'nextGame'))
    const [location, setLocation] = useLocation()
  
    if (loading) return <div className="fw6 fs5">Loading...</div>
    const nextGame = snapshot.val()
  
    const play = async () => {
      if (R.isNil(nextGame)) {
        const updates = {}
        const gameId = nanoid()
        updates['/nextGame'] = gameId
        await update(ref(db), updates)
        setLocation(`/game/${gameId}/1`)
      } else {
        const game = utils.createGame()
        const updates = {}
        updates['/nextGame'] = null
        updates[`/games/${nextGame}`] = game
        await update(ref(db), updates)
        setLocation(`/game/${nextGame}/2`)
  
        await utils.sleep(3000)
        const updates2 = {}
        updates2[`/games/${nextGame}/status`] = 'playing'
        await update(ref(db), updates2)
      }
    }
    return (
      <div className="page">
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
        <div className="button btn-square" onClick={play}>
          START
        </div>
      </div>
    )
  }

  export default StartPage