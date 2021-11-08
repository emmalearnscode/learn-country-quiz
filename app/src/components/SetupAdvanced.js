import React from 'react'

import { db } from '../App'
import { ref, update } from 'firebase/database'
import { useObject } from 'react-firebase-hooks/database'

const SetupAdvanced = () => {
  const [snapshot, loading, error] = useObject(ref(db, 'profiles'))

  if (loading) return <div className="fw6 fs5">Loading...</div>
  const profiles = snapshot.val()

  return (
    <div>
      <div className="grid-row">
        <h3></h3>
        <h3>Grid:</h3>
        <h3>Latest games:</h3>
        <h3>Countdown:</h3>
        <h3>NumQuestions:</h3>
        <h3>Background:</h3>
      </div>
      <ProfileRow profile={profiles.alpha} profileName="alpha" bgColor="#4D6EF6" />
      <ProfileRow profile={profiles.beta} profileName="beta" bgColor="#FBB005" />
      <ProfileRow profile={profiles.pilots} profileName="pilots" bgColor="#FB5253" />
      <ProfileRow profile={profiles.rest} profileName="rest" bgColor="#82C91F" />
    </div>
  )
}

const ProfileRow = ({ profileName, bgColor, profile }) => {
  const changeHandler = async featureKey => {
    const updates = {}
    updates[`/profiles/${profileName}/${featureKey}`] = !profile[featureKey]
    await update(ref(db), updates)
  }

  return (
    <div className="grid-row">
      <label className="switch">
        <h3>{profileName}</h3>
      </label>
      <label className="switch">
        <input type="checkbox" checked={profile.grid} onChange={() => changeHandler('grid')} />
        <span className="slider round"></span>
      </label>
      <label className="switch">
        <input type="checkbox" checked={profile.latestGames} onChange={() => changeHandler('latestGames')} />
        <span className="slider round"></span>
      </label>
      <label className="switch">
        <input type="checkbox" checked={profile.countdown} onChange={() => changeHandler('countdown')} />
        <span className="slider round"></span>
      </label>
      <label className="switch">
        <input type="checkbox" checked={profile.numQuestions} onChange={() => changeHandler('numQuestions')} />
        <span className="slider round"></span>
      </label>
      <label className="switch">
        <div className="color-box" style={{ backgroundColor: bgColor }}></div>
      </label>
    </div>
  )
}

export default SetupAdvanced
