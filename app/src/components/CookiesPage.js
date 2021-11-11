import React from 'react'

const CookiesPage = () => {
  const handleCookies = () => {
    const cookies = document.cookie
    console.log(cookies)
    document.cookie = 'rcl_consent_given=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'rcl_preferences_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'rcl_statistics_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    document.cookie = 'rcl_marketing_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  return (
    <div className="cookie-page">
      <h2>Cookie Subprocessors</h2>
      <table className="subprocessor-table">
        <tr>
          <th>Name of subprocessor</th>
          <th>Description of processing</th>
          <th>Location of processing</th>
        </tr>
        <tr>
          <td>Google Analytics</td>
          <td>Website analytics and performance</td>
          <td>United States</td>
        </tr>
        <tr>
          <td>Logrocket</td>
          <td>Website optimization and bug tracking</td>
          <td>United States</td>
        </tr>
      </table>

      <h2>Cookie Information</h2>
      <h3>Necessary Cookies</h3>
      <p>
        These cookies are necessary to maintain our services and cannot be switched off. They are usually only set in response to actions
        made by you, such as creating an account or saving a wish-list for later. You can set your browser to block or alert you about these
        cookies, but that can make some parts of the site not work. These cookies do not store any personally identifiable information.
      </p>
      <h3>Performance Cookies</h3>
      <p>
        These cookies allow us to count visits and traffic so we can collect insights like which pages are the most popular and see how
        visitors move around the site. All information these cookies collect is aggregated and therefore, anonymous. If you do not allow
        these cookies, we will not be able to provide you with a tailored experience.
      </p>
      <h3>Statistics Cookies</h3>
      <p>
        These cookies enable the website to provide statistical analysis. They may be set by us or by third party providers whose services
        we have added to our pages. If you do not allow these cookies, then some or all of these services may not function properly.
      </p>
      <h3>Marketing Cookies</h3>
      <p>
        When you accept marketing cookies, you give us your consent to place cookies on your device to provide you with relevant content
        that fits your interests. These cookies may be set through our site by our advertising partners or us, to build a profile of your
        interests and show you relevant content on our and third-party sites. To be able to deliver content that fits your interests, we
        will use your interactions together with personal information you have provided to us on our site. To present you with relevant
        content on third-party sites, we will share this information and a customer identifier such as an encrypted email-address or device
        id with third parties, such as advertising platforms and social networks. To make the content as interesting as possible for you, we
        may link this data across the different devices you use. If you choose not to accept marketing cookies, we will not place such
        cookies on your device, and you may experience less relevant content from us.
      </p>
      {/* <button onClick={handleCookies}>Manage Cookie Preferences</button> */}
    </div>
  )
}

export default CookiesPage
