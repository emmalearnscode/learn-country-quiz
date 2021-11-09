import React from 'react'
import { CookieBanner as Cookies } from '@palmabit/react-cookie-law'

const CookieBanner = (props) => {

  const initialize = () => {
    props.onAccept()
  }

  return (
    <Cookies
      message="We use cookies to analyse our traffic. We also share information about your use of our site with our analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services."
      styles={{
        dialog: { backgroundColor: '#fff', position: 'fixed', top: 0, left: 0, right: 0, padding: '20px' },
      }}
      wholeDomain={true}
      onAccept={() => {
        console.log('accept')
        localStorage.setItem('analyticsEnabled', 'true')
      }}
      onAcceptPreferences={() => {
        console.log('acceptPref')
      }}
      onAcceptStatistics={() => {
        console.log('acceptStat')
        localStorage.setItem('analyticsEnabled', 'true')
        initialize()
      }}
      onAcceptMarketing={() => {
        console.log('acceptMark')
      }}
      policyLink="/cookies"
    />
  )
}

export default CookieBanner
