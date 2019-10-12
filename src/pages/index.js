import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'
import Img from 'gatsby-image'

export default ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges
  console.log(posts)

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title='All recipes' />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Link to={node.fields.slug}>
            <article key={node.fields.slug}>
              <header style={{ display: `flex` }}>
                <Img fixed={node.frontmatter.featured_image.childImageSharp.fixed} />
                <div style={{ flex: 1, marginLeft: rhythm(1 / 4) }}>
                  <h1
                    style={{
                      fontSize: rhythm(3 / 4),
                      marginTop: 0,
                      marginBottom: rhythm(1 / 4)
                    }}
                  >
                    <Link style={{ boxShadow: `none`, color: 'hsla(212,56%,16%,1)' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h1>
                  <small style={{ color: 'hsla(0,0%,0%,0.9)' }}>{node.frontmatter.date}</small>
                </div>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || ``
                  }}
                />
              </section>
            </article>
          </Link>
        )
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "recipe"}}}, sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D MMM, YYYY")
            title
            featured_image {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
