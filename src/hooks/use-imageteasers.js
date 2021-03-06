import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulImageTeasers = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulImageTeasers {
        teasers {
          contentfulid
          image {
            title
            gatsbyImageData(
              width: 950 
              height: 630
            )
          }
          copyright
          title
          text {
            raw
          }
          linkUrl
          linkText
        }
      }
    }
  `);

  return data.contentfulImageTeasers.teasers.map((imageTeaser) => ({
    id: imageTeaser.contentfulid,
    title: imageTeaser.title,
    image: imageTeaser.image.gatsbyImageData,
    altText: imageTeaser.image.title,
    copyright: imageTeaser.copyright,
    text: imageTeaser.text.raw,
    linkUrl: imageTeaser.linkUrl,
    linkText: imageTeaser.linkText,
  }));
};

export default useContenfulImageTeasers;
