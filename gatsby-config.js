require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Feinkost Umbria Höchberg',
    siteUrl: `http://www.ristorante-umbria.de/`,
    description: `Feinkost Umbria - Montag-Sonntag 10:00-14:30, 17:00-22:00 - Markthalle, Hauptstraße 65, 97204 Höchberg`,
    keywords:
      'Umbria, Höchberg, Würzburg, Feinkost, Pizza, Eis, Italienisch, Restaurant',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    { 
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Feinkost Umbria Höchberg',
        short_name: 'Umbria',
        start_url: `/`,
        description:
          'Feinkost Umbria - Montag-Sonntag 10:00-14:30, 17:00-22:00 - Markthalle, Hauptstraße 65, 97204 Höchberg',
        background_color: `#FFEDED`,
        theme_color: `#FFEDED`,
        display: `standalone`,
        lang: 'de',
        icon: 'src/images/favicon.ico',
      },
    },
  ],
};
