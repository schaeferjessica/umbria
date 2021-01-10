import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulMenuStarter = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulMenu(title: { eq: "Vorspeisen" }) {
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

export default useContenfulMenuStarter;
