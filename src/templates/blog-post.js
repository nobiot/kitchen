import React from 'react'
import { graphql } from 'gatsby'
import './footnote.css'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import Img from 'gatsby-image'

export default ({ location, data }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const featuredImgFluid = post.frontmatter.featured_image.childImageSharp.fluid
  const ingredients = post.frontmatter.recipe.ingredients
  const instructions = post.frontmatter.recipe.instructions

  const Md = require('markdown-it')().use(require('markdown-it-footnote'))
  const buildIngredientsHTML = (ingredients) => ingredients ? `<h2>Ingredients</h2>` + Md.render(ingredients) : '' // return empty string
  const buildInstructionsHTML = (instructions) => instructions ? `<h2>Steps</h2>` + Md.render(instructions) : '' // return empty string

  const html =
    buildIngredientsHTML(ingredients) +
    buildInstructionsHTML(instructions) +
    post.html

  return (
    <Layout location={location} title={siteTitle}>
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
              marginBottom: 0
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1)
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <main>
          <section dangerouslySetInnerHTML={{ __html: html }} />
        </main>
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
      </article>

    </Layout>
  )
}

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
