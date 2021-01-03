import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulMenu = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulMenu {
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

export default useContenfulMenu;
