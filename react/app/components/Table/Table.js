import React from 'react'
import PropTypes from 'prop-types'
// import { ThemeConsumer } from '../contexts/theme'

export default function Table ({ header, subheader, href, name, children }) {
  return (
    <div className='table'>
      <h4 className='header-lg center-text'>
        {header}
      </h4>
      {subheader && (
        <h4 className='center-text'>
          {subheader}
        </h4>
      )}
      <table>

      </table>
      {children}
    </div>
  )
}

// Card.propTypes = {
//   header: PropTypes.string.isRequired,
//   subheader: PropTypes.string,
//   avatar: PropTypes.string.isRequired,
//   href: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired
// }