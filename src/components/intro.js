import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { moduleSpace } from '../styles/container';
import { devices } from '../styles/breakpoints';
import { graphql, useStaticQuery } from 'gatsby';

export const IntroContainer = styled.div`
  ${moduleSpace}

  h1 {
    margin-bottom: 60px;
    font-size: 75px;
    font-family: 'Kufam';
    text-transform: uppercase;

    @media ${devices.mobile} {
      font-size: 35px;
    }
  }
`;

const Intro = ({ title }) => {
  const [isOpen, setIsOpen] = useState(true);
  const openingHours = useStaticQuery(graphql`
    query {
      hours: contentfulOpeningHours {
        openingTime
        closingTime
      }
    }
  `);
  const { openingTime, closingTime } = openingHours.hours;

  useEffect(() => {
    const currentDate = new Date();
    const actualDate = new Date(openingTime);
    actualDate.setHours(
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );
    const openingTimeDate = new Date(openingTime);
    const closingTimeDate = new Date(closingTime);

    if (actualDate >= openingTimeDate && actualDate < closingTimeDate) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [openingTime, closingTime]);

  return (
    <IntroContainer className="container">
      <h1>{title}</h1>
      <a href="#comingsoon" className="button">
        {isOpen ? 'wir haben geöffnet' : 'wir haben geschlossen'}
      </a>
    </IntroContainer>
  );
};

export default Intro;
