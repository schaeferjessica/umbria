import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulMenuIce = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulMenu(title: { eq: "Eis" }) {
        title
        meals {
          title
          price
          ingredients {
            raw
          }
        }
      }
    }
  `);

  return data.contentfulMenu;
};

export default useContenfulMenuIce;
