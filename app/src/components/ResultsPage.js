import React from 'react'
import { Link } from 'wouter'
import { ref } from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'
import { db } from '../firebase-analytics'

import QuickResults from './QuickResults'
import winning from '../../assets/winning.png'
import dog from '../../assets/dog.png'
import handshake from '../../assets/handshake.png'

const ResultsPage = ({ gameId, playerId }) => {
  const [snapshot, loading, error] = useObject(ref(db, `games/${gameId}`))

  const { gameTie } = JSON.parse(localStorage.getItem('featureFlags'))

  if (loading) return <div className="fw6 fs5">Loading...</div>
  const game = snapshot.val()

  const youKey = `player${playerId}`
  const opponentKey = `player${parseInt(playerId) === 1 ? 2 : 1}`

  const youWon = game.score[youKey] >= game.score[opponentKey]

  if (gameTie) {
    const youWon = game.score[youKey] > game.score[opponentKey]
    const youLost = game.score[youKey] < game.score[opponentKey]
    return (
      <div className="page">
        {youWon && <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />}
        {youLost && <Lost you={game.score[youKey]} opponent={game.score[opponentKey]} />}
        {!youWon && !youLost && <Tie you={game.score[youKey]} opponent={game.score[opponentKey]} />}
        <Link href="/" className="re-home link">
          Home
        </Link>
      </div>
    )
  } else {
    return (
      <div className="page">
        {youWon && <Won you={game.score[youKey]} opponent={game.score[opponentKey]} />}
        {!youWon && <Lost you={game.score[youKey]} opponent={game.score[opponentKey]} />}
        <Link href="/" className="re-home link">
          Home
        </Link>
      </div>
    )
  }
}

const Won = ({ you, opponent }) => {
  return (
    <div className="results">
      <img src={winning} style={{ width: '80%' }} />
      <div className="re-text">Congratulations!!</div>
      <QuickResults you={you} opponent={opponent} />
    </div>
  )
}

const Lost = ({ you, opponent }) => {
  return (
    <div className="results">
      <img src={dog} style={{ width: '80%' }} />
      <div className="re-text">Better luck next time...</div>
      <QuickResults you={you} opponent={opponent} />
    </div>
  )
}

const Tie = ({ you, opponent }) => {
  return (
    <div className="results">
      <img src={handshake} style={{ width: '80%' }} />
      <div className="re-text">It's a draw!</div>
      <QuickResults you={you} opponent={opponent} />
    </div>
  )
}

export default ResultsPage
