import { createGlobalStyle } from 'styled-components';
import { devices } from './breakpoints';

export default createGlobalStyle`
  .container {
    max-width: 2000px;
    margin: 0 auto;
    padding-left: 300px;
    padding-right: 150px;

    @media ${devices.tablet} {
      padding-left: 140px;
      padding-right: 60px;
    }

    @media ${devices.mobile} {
      padding-left: 70px;
      padding-right: 20px;
    }
  }
`;

export const moduleSpace = `
  margin-top: 150px;

  @media ${devices.tablet} {
    margin-top: 60px;
  }
`;
