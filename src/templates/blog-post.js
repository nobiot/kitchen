import React from "react"
import { graphql } from "gatsby"
import "./footnote.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import Img from "gatsby-image"
const Md = require("markdown-it")().use(require("markdown-it-footnote"))

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    let featuredImgFluid = post.frontmatter.featured_image.childImageSharp.fluid

    let ingredients = post.frontmatter.recipe.ingredients
    let instructions = post.frontmatter.recipe.instructions

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <Img fluid={featuredImgFluid} />
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <h2>Ingredients</h2>
          <section dangerouslySetInnerHTML={{ __html: Md.render(ingredients) }} />

          <h2>Steps</h2>
          <section dangerouslySetInnerHTML={{ __html: Md.render(instructions) }} />

          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            
          </footer>
        </article>

      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        recipe {
          ingredients
          instructions
        }
        featured_image {
          childImageSharp {
            fluid(maxWidth: 1680) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
