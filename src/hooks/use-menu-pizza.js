import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulMenuPizza = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulMenu(title: { eq: "Pizza" }) {
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

export default useContenfulMenuPizza;
