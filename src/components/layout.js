import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render () {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <div>
          <h1
            style={{
              ...scale(1.5),
              marginBottom: 0,
              marginTop: 0
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
          <nav
            style={{
              marginBottom: rhythm(2),
              textAlign: 'right',
              fontSize: rhythm(1 / 2)
            }}>
            <Link
              style={{
                display: `inline-block`,
                borderStyle: `solid`,
                borderColor: `hsla(210,16%,76%,1)`,
                paddingTop: rhythm(1 / 16),
                paddingBottom: rhythm(1 / 16),
                paddingRight: rhythm(1 / 4),
                paddingLeft: rhythm(1 / 4),
                color: 'hsla(209,15%,28%,1)',
                textDecoration: `none`,
                boxShadow: `none`
              }}
              to={`scrapbook`}>
                Go to scrapbook
            </Link>
          </nav>
        </div>

      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <hr />
        <footer style={{ fontSize: rhythm(0.5) }}>
          <p>Everyday recipes and food stories for geeky professionals busy with work & life</p>
          <p>© {new Date().getFullYear()}, <a style={{ boxShadow: `none` }} href='https://www.instagram.com/nobiot.kitchen/' target='_blank' rel='noopener noreferrer'>nobiot.kitchen</a></p>
        </footer>
      </div>
    )
  }
}

export default Layout
