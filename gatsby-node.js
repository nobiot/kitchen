const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const moment = require('moment')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const relatievFilePath = createFilePath({ node, getNode })
    const bodyOfFilePath = relatievFilePath.slice(12)
    const date = moment(node.frontmatter.date).format('YYYY-MM-DD')
    const yyyy = date.slice(0, 4)
    const mm = date.slice(5, 7)
    const dd = date.slice(8, 10)
    console.log(`/recipe/${yyyy}/${mm}/${dd}/${bodyOfFilePath}`)
    createNodeField({
      node,
      name: `slug`,
      value: `/recipe/${yyyy}/${mm}/${dd}/${bodyOfFilePath}`
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    })
  })
}
