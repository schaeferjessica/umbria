require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Feinkost Umbria Höchberg',
    siteUrl: `http://www.ristorante-umbria.de/`,
    description: `Besuchen Sie uns in unserem Ristorante Feinkost Umbria. Markthalle, Hauptstraße 65, 97204 Höchberg. Öffnungszeiten: Montag-Sonntag 10:00-14:30, 17:00-22:00`,
    keywords:
      'Umbria, Höchberg, Würzburg, Feinkost, Pizza, Eis, Italienisch, Restaurant',
    ogdescription: 'Wir bieten Ihnen täglich hausgemachte Pizza, Pasta & Gelato sowie weitere Spezialitäten der italienischen Küche an. Unser name Umbrien (italienisch Umbria) kommt von einer Region Italiens, die zwischen der Toskana, Latium und den Marken liegt'.
  },
  plugins: [
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
          'Besuchen Sie uns in unserem Ristorante Feinkost Umbria. Markthalle, Hauptstraße 65, 97204 Höchberg. Öffnungszeiten: Montag-Sonntag 10:00-14:30, 17:00-22:00',
        background_color: `#FDF9F7`,
        theme_color: `#FF5F5F`,
        display: `standalone`,
        lang: 'de',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
