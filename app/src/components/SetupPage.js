import { Link } from 'wouter'

const SetupPage = ({ minusScore, setMinusScore, randomizeFlags, setRandomizeFlags, gameTie, setGameTie }) => {
  const handleChange = name => {
    switch (name) {
      case 'minus-score':
        setMinusScore(!minusScore)
        break
      case 'random-flags':
        setRandomizeFlags(!randomizeFlags)
        break
      case 'tie-screen':
        setGameTie(!gameTie)
        break
      default:
        console.log('something went wrong')
    }
  }

  return (
    <div>
      <div className="flex-row">
        <p>Minus score</p>
        <label className="switch">
          <input type="checkbox" checked={minusScore} onChange={() => handleChange('minus-score')} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="flex-row">
        <p>Randomized flags</p>
        <label className="switch">
          <input type="checkbox" checked={randomizeFlags} onChange={() => handleChange('random-flags')} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="flex-row">
        <p>Tie screen</p>
        <label className="switch">
          <input type="checkbox" checked={gameTie} onChange={() => handleChange('tie-screen')} />
          <span className="slider round"></span>
        </label>
      </div>
      <Link href="/" className="re-home link">
        Go to app
      </Link>
    </div>
  )
}

export default SetupPage
