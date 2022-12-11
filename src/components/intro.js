import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { moduleSpace } from '../styles/container';
import { devices } from '../styles/breakpoints';
import { graphql, useStaticQuery } from 'gatsby';
import aniScroll from '../ani-scroll';

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
  const data = useStaticQuery(graphql`
  query {
    holidyDataRange: contentfulHoliday {
      startholiday
      endholiday
    }
    offDay: contentfulOffDay {
      day
    }
    days: allContentfulOpeningTimes {
      nodes {
        day
        startTimeMorning
        endTimeMorning
        startTimeEvening
        endTimeEvening
      }
    }
  }
  `);
  
  const holiday = data.holidyDataRange
  const openingTimes = data.days.nodes;
  const offDay = data.offDay.day;
  //const { openingTime, closingTime } = openingTimes.hours;

  const jumpTo = (e) => {
    e.preventDefault();

    const target = document.querySelector('#openingHours');
    const rect = target.getBoundingClientRect();
    const animationCompleted = target.classList.contains('animation-complete');
    const offset = animationCompleted ? 0 : target.clientHeight;

    aniScroll(rect.top - offset - 20, 800, 'linear');
  };

  useEffect(() => {
    const currentDate = new Date();
    const actualTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`
    const startHoliday = new Date(holiday.startholiday);
    const endHoliday = new Date(holiday.endholiday);

    // Holiday Check
    if (currentDate >= startHoliday && currentDate <= endHoliday) {
      return setIsOpen(false)
    }

    // get current day name from currentDate
    const currentDay = currentDate.toLocaleString('en-EN', { weekday: 'long' });
    if (currentDay === offDay) {
      return setIsOpen(false)
    }

    // get the openingTime data for the current day
    const currentOpeningDay = openingTimes.find(day => day.day === currentDay);
    const startTimeMorning = new Date(currentOpeningDay.startTimeMorning);
    const endTimeMorning = new Date(currentOpeningDay.endTimeMorning);
    const startTimeEvening = new Date(currentOpeningDay.startTimeEvening);
    const endTimeEvening = new Date(currentOpeningDay.endTimeEvening);

    // convert dates into time strings
    const openingTimeMorning = `${startTimeMorning.getHours()}:${startTimeMorning.getMinutes()}`
    const closingTimeMorning = `${endTimeMorning.getHours()}:${endTimeMorning.getMinutes()}`
    const openingTimeEvening = `${startTimeEvening.getHours()}:${startTimeEvening.getMinutes()}`
    const closingTimeEvening = `${endTimeEvening.getHours()}:${endTimeEvening.getMinutes()}`

    // Morning: if actual time is not in opening time range OR start and end time is null => return false (closed)
    if ((actualTime < openingTimeMorning && actualTime >= closingTimeMorning) || (currentOpeningDay.startTimeMorning === null && currentOpeningDay.endTimeMorning === null)) {
      return setIsOpen(false);
    }

    // Evening: if actual time is not in opening time range OR start and end time is null => return false (closed)
    if ((actualTime < openingTimeEvening && actualTime >= closingTimeEvening) || (currentOpeningDay.startTimeEvening === null && currentOpeningDay.endTimeEvening === null)) {
      return setIsOpen(false);
    }
  }, [holiday, openingTimes]);

  return (
    <IntroContainer className="container">
      <h1>{title}</h1>
      <a href="#openingHours" className="button" onClick={(e) => jumpTo(e)}>
        {isOpen ? 'wir haben geöffnet' : 'wir haben geschlossen'}
      </a>
    </IntroContainer>
  );
};

export default Intro;
