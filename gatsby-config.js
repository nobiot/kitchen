module.exports = {
  siteMetadata: {
    title: `nobiot.kitchen`,
    author: `Noboru Ota`,
    description: `Everyday Recipes and Food Stories for Geeky Professionals Busy with Work & Life`,
    siteUrl: `https://nobiot.com`,
    social: {
      twitter: `_nobiot`
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/recipe`,
        name: `recipe`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/scrapbook`,
        name: `scrapbook`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: '_blank',
              rel: 'nofollow'
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1680
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-109049728-1`
      }
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `recipes by nobiot.kitchen`,
        short_name: `recipes`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `recipe`,
        icon: `content/assets/icon-120x120.png`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
}
