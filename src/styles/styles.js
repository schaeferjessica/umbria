import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  // adding own globals styles //----------------------------------------
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    border: 0;
    clip: rect(0, 0, 0, 0);
  }


  html {
    font-size: 18px;
    line-height: 1.5;
    font-family: 'Spartan', 'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${(props) => props.color.red};
    background-color: ${(props) => props.color.redLight};
  }

  a {
    color: ${(props) => props.color.red};
  }

  .button {
    padding: 20px;
    border: 1px solid currentColor;
    text-decoration: none;
  }
`;
