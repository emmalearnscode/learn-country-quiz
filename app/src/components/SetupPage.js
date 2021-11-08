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
  profile,
  setProfile
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

  const selectProfile = e => {
    setProfile(e.target.value)

    if (e.target.value === '') {
      localStorage.removeItem('profile')
    } else {
      localStorage.setItem('profile', e.target.value)
    }
  }

  console.log(profile)

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

      <div>
        <p>Choose a profile</p>
        <label htmlFor="alpha">Alpha</label>
        <input
          checked={profile === 'alpha'}
          onChange={e => selectProfile(e)}
          name="profiles"
          id="alpha"
          type="radio"
          value="alpha"
        />
        <label htmlFor="beta">Beta</label>
        <input
          checked={profile === 'beta'}
          onChange={e => selectProfile(e)}
          id="beta"
          name="profiles"
          type="radio"
          value="beta"
        />
        <label htmlFor="pilots">Pilots</label>
        <input
          checked={profile === 'pilots'}
          onChange={e => selectProfile(e)}
          name="profiles"
          id="pilots"
          type="radio"
          value="pilots"
        />
        <label htmlFor="rest">Rest</label>
        <input
          checked={profile === 'rest'}
          onChange={e => selectProfile(e)}
          id="rest"
          name="profiles"
          type="radio"
          value="rest"
        />
        <label htmlFor="not-set">Not set</label>
        <input
          checked={profile === '' || !profile}
          onChange={e => selectProfile(e)}
          id="not-set"
          name="profiles"
          type="radio"
          value=""
        />
      </div>

      <Link href="/" className="re-home link">
        Go to app
      </Link>
    </div>
  )
}

export default SetupPage
