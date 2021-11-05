import { Link } from 'wouter'

const SetupPage = ({
  minusScore,
  setMinusScore,
  randomizeFlags,
  setRandomizeFlags,
  gameTie,
  setGameTie,
  randomQuestions,
  setRandomQuestions,
  cookieBanner,
  setCookieBanner,
}) => {
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
      case 'random-questions':
        setRandomQuestions(!randomQuestions)
        break
      case 'cookie-banner':
        setCookieBanner(!cookieBanner)
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
      <div className="flex-row">
        <p>Randomize questions</p>
        <label className="switch">
          <input type="checkbox" checked={randomQuestions} onChange={() => handleChange('random-questions')} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="flex-row">
        <p>Cookie banner</p>
        <label className="switch">
          <input type="checkbox" checked={cookieBanner} onChange={() => handleChange('cookie-banner')} />
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
