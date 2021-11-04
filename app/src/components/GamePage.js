import React from 'react'
import { useLocation } from 'wouter'
import { customAlphabet } from 'nanoid'
import { db } from '../App'

// Import the functions you need from the SDKs you need
import { ref, update } from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'

//components
import QuestionPage from './QuestionsPage'
import ResultsPage from './ResultsPage'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvxyz', 5)

const GamePage = ({ gameId, playerId }) => {
    const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))
    const [location, setLocation] = useLocation()
  
    if (loading) return <div className="fw6 fs5">Loading...</div>
    const game = snapshot.val()
  
    const cancel = async () => {
      const updates = {}
      updates['/nextGame'] = null
      await update(ref(db), updates)
      setLocation(`/`)
    }
  
    if (game && game.status === 'playing') return <QuestionPage gameId={gameId} playerId={playerId} />
    if (game && game.status === 'finished') return <ResultsPage gameId={gameId} playerId={playerId} />
  
    return (
      <div className="page">
        <div className="fw6 fs9 tac">
          {!game && 'Waiting for opponent...'}
          {game && game.status === 'starting' && 'Starting game... Get READY!'}
        </div>
        {!game && (
          <div className="link" style={{ marginTop: '10rem' }} onClick={cancel}>
            Cancel
          </div>
        )}
      </div>
    )
  }

  export default GamePage