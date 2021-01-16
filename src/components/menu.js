import React, { useEffect, useState, useContext, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { devices } from '../styles/breakpoints';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ThemeContext from '../styles/themecontext';

export const MenuButton = styled.button`
  font-family: 'Kufam';
  font-size: 32px;
  z-index: 3;
  margin-top: 20px;
  width: 100%;
  max-width: 280px;
  color: ${(props) => props.color.red};
  text-align: left;
  text-transform: uppercase;
  padding: 22px 20px 14px 20px;

  @media ${devices.tablet} {
    max-width: 125px;
    padding: 20px 15px 15px 15px;
    font-size: 16px;
    margin-top: 10px;
  }
`;
export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 300px;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${(props) => props.color.redLight};

  @media ${devices.tablet} {
    padding-left: 140px;
  }

  @media ${devices.mobile} {
    padding-left: 140px;
  }
`;
export const MenuList = styled.ul`
  list-style: none;
  padding-bottom: 50px;
  margin-top: 30px;
  margin-right: 10px;

  li:not(:last-child) {
    margin-bottom: 50px;

    @media ${devices.tablet} {
      margin-bottom: 30px;
      margin-top: 50px;
    }
  }

  li:first-child {
    margin-top: 20px;
  }

  li strong {
    font-weight: 500;
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
`;
export const MenuCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${(props) => props.color.red};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 80px;

  @media ${devices.tablet} {
    font-size: 70px;
    padding: 15px;
    top: 0;
    right: 0;
  }

  &:hover {
    animation: ${rotate} 1s linear infinite;
  }

  span[aria-hidden='true'] {
    height: 21px;
    display: block;
  }
`;

const Menu = ({ data, position, menuClick, activeMenu }) => {
  const { colors } = useContext(ThemeContext);
  const title = useRef(null);
  const [titleHeight, setTitleHeight] = useState(0);

  const handleOpenClick = () => {
    const alreadyActive = position === activeMenu ? false : position;
    menuClick(alreadyActive);

    if (position === activeMenu) {
      document.querySelector('body').classList.remove('prevent-scroll');
    } else {
      document.querySelector('body').classList.add('prevent-scroll');
    }
  };

  const handleCloseClick = () => {
    menuClick(false);
    document.querySelector('body').classList.remove('prevent-scroll');
  };

  useEffect(() => {
    const body = document.querySelector('body');
    const matches = (el, selector) =>
      (
        el.matches ||
        el.matchesSelector ||
        el.msMatchesSelector ||
        el.webkitMatchesSelector
      ).call(el, selector);
    const closest = (element, selector, checkSelf = true) => {
      let parent = checkSelf ? element : element.parentNode;

      while (parent && parent !== document) {
        if (matches(parent, selector)) return parent;
        parent = parent.parentNode;
      }
      return false;
    };
    const closeActiveMenu = (event) => {
      const insideMenu = closest(event.target, '.meal-ul');
      const insideButton = closest(event.target, '.menu-button');

      if (insideButton) return;

      if (position === activeMenu && !insideMenu) {
        menuClick(false);
        document.querySelector('body').classList.remove('prevent-scroll');
      }
    };

    setTitleHeight(title.current.clientHeight);
    body.addEventListener('click', closeActiveMenu);

    return () => {
      body.removeEventListener('click', closeActiveMenu);
    };
  }, [position, activeMenu, menuClick]);

  return (
    <>
      <MenuButton
        color={colors}
        position={position}
        titleHeight={titleHeight}
        className={`button menu-button ${
          activeMenu === position ? 'is-active' : ''
        }`}
        ref={title}
        onClick={() => handleOpenClick()}
      >
        {data.title}
      </MenuButton>
      {activeMenu === position ? (
        <MenuOverlay color={colors} className="menu-overlay">
          <MenuCloseButton onClick={() => handleCloseClick()} color={colors}>
            <span aria-hidden="true">*</span>
            <span className="sr-only">Menu schließen</span>
          </MenuCloseButton>
          <MenuList color={colors} className="meal-ul">
            {data.meals.map((meal) => (
              <li key={meal.title}>
                <strong>
                  {meal.title} {meal.price}
                </strong>
                {meal.ingredients &&
                  documentToReactComponents(JSON.parse(meal.ingredients.raw))}
              </li>
            ))}
          </MenuList>
        </MenuOverlay>
      ) : (
        ''
      )}
    </>
  );
};

export default Menu;
