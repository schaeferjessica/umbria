import { createGlobalStyle } from 'styled-components';
import { devices } from './breakpoints';

export default createGlobalStyle`
  .container {
    max-width: 2000px;
    margin-right: auto;
    margin-left: auto;
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
    margin-top: 100px;
  }

  @media ${devices.mobile} {
    margin-top: 70px;
  }
`;
