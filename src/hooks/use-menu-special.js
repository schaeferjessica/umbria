import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulMenuSpecial = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulMenu(title: { eq: "PIZZA Menu" }) {
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

export default useContenfulMenuSpecial;
