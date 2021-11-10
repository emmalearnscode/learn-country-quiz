import React from 'react'
import { db } from '../firebase-analytics'
import { ref, query, orderByChild, limitToLast } from 'firebase/database'
import { useList } from 'react-firebase-hooks/database'

const LatestGames = () => {
  const timestampQuery = query(ref(db, 'games'), orderByChild('timestamp'), limitToLast(3))
  //console.log(timestampQuery)
  const [snapshots, loading, error] = useList(timestampQuery) // snapshots is an array of each snapshot in order

  if (loading) return <div className="fw6 fs5">Loading...</div>
  const games = snapshots.map(snapshot => snapshot.val())
  const mostRecentGames = games.reverse()

  return (
    <div>
      <h3>Latest games:</h3>
      {mostRecentGames.map(game => (
        <div key={game.timestamp}>
          <p>{`Player 1: ${game.score.player1} Player 2: ${game.score.player2}`}</p>
        </div>
      ))}
    </div>
  )
}

export default LatestGames
