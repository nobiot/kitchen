import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

export default ({ location, data }) => {
  console.log(data)
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title='Food Scrapbook' />
      <h1>Scrapbook</h1>
      <p
        style={{
          color: 'hsla(209,15%,28%,1)',
          marginBottom: `0px`
        }}>Collection of food articles from the web that I find useful.</p>
      <p
        style={{
          color: 'hsla(207,12%,43%,1)'

        }}>{data.allMarkdownRemark.totalCount} Notes</p>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article key={node.fields.slug}>
          <Link to={node.fields.slug}>
            <h2
              style={{
                color: 'hsla(209,15%,28%,1)',
                textDecorationLine: `underline`,
                fontSize: rhythm(3 / 4),
                marginBottom: rhythm(1 / 4)
              }}
            >
              {node.frontmatter.title}
            </h2>
          </Link>
          <small
            style={{
              color: 'hsla(210,16%,76%,1)'
            }}
          >
            {node.frontmatter.date}
          </small>
          <p
            style={{
              color: 'hsla(208,12%,58%,1)'
            }}
          >{node.excerpt}</p>
        </article>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "scrapbook"}}}, sort: {order: DESC, fields: frontmatter___date}) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "D MMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
