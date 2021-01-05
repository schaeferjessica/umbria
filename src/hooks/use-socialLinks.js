import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulSocialLinks = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSocialLinks {
        nodes {
          linkText
          linkUrl
        }
      }
    }
  `);

  return data.allContentfulSocialLinks.nodes.map((link) => ({
    linkUrl: link.linkUrl,
    linkText: link.linkText,
  }));
};

export default useContenfulSocialLinks;
