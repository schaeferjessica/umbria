import { graphql, useStaticQuery } from 'gatsby';

export const useContenfulImpressum = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulImpressum {
        button
        text {
          raw
        }
      }
    }
  `);

  return data.contentfulImpressum;
};

export default useContenfulImpressum;
