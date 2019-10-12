const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const moment = require('moment')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    console.log(`\n`, fileNode.relativePath)

    const relatievFilePath = createFilePath({ node, getNode })
    const bodyOfFilePath = relatievFilePath.slice(12)
    const date = moment(node.frontmatter.date).format('YYYY-MM-DD')
    const yyyy = date.slice(0, 4)
    const mm = date.slice(5, 7)
    const dd = date.slice(8, 10)
    console.log(`/${node.frontmatter.category}/${yyyy}/${mm}/${dd}/${bodyOfFilePath}`)
    createNodeField({
      node,
      name: `slug`,
      value: `/${node.frontmatter.category}/${yyyy}/${mm}/${dd}/${bodyOfFilePath}`
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const note = path.resolve(`./src/templates/scrapbook-note.js`)
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
                category
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
    const createPageParam = {
      path: post.node.fields.slug,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    }
    const component = (post.node.frontmatter.category === 'recipe')
      ? { component: blogPost } : { component: note }

    createPage(Object.assign(component, createPageParam))
  })
}
