import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({ data }) => {
  return (
    <Layout>
      <SEO title='All notes in scrapbook' />
      <h1>Scrapbook</h1>
      <p>{data.allMarkdownRemark.totalCount} Notes</p>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <h2>{node.frontmatter.title}</h2>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
  allMarkdownRemark(filter: {frontmatter: {category: {eq: "scrapbook"}}}, sort: {order: DESC, fields: frontmatter___date}) {
    edges {
      node {
        id
        frontmatter {
          title
          date
        }
      }
    }
  }
}
`
