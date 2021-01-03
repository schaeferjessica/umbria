import React from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints';

export const NavHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  padding-top: 60px;

  @media ${devices.mobile} {
    padding-top: 30px;
  }

  a {
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <NavHeader className="container">
      <a href="tel:09314040360">0931 40 40 360</a>
    </NavHeader>
  );
};

export default Header;
