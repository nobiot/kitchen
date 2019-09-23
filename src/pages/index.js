import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header style={{ display: `flex`}}>
                <Img fixed={node.frontmatter.featured_image.childImageSharp.fixed}/>
                <div style={{flex: 1, marginLeft: rhythm(1 / 4)}}>
                  <h1
                    style={{
                      fontSize: rhythm(3 / 4),
                      marginTop: 0,
                      marginBottom: rhythm(1 / 4)
                    }}
                  >
                    <Link style={{ boxShadow: `none`, color:'hsla(0,0%,0%,0.9)' }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h1>
                  <small>{node.frontmatter.date}</small>
                </div>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || ``,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
