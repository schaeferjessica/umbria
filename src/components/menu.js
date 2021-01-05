import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const MenuContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding-left: 150px;

  @media ${devices.tablet} {
    padding-left: 60px;
  }

  @media ${devices.mobile} {
    padding-left: 20px;
  }

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
export const MenuOuter = styled.div`
  position: absolute;
  width: calc(100% - 150px);
  will-change: transform;

  @media ${devices.tablet} {
    width: calc(100% - 60px);
  }

  @media ${devices.mobile} {
    width: calc(100% - 20px);
  }
`;
export const MenuInner = styled.div`
  margin-top: -120px;
  background-color: white;
  padding: 40px;

  @media ${devices.tablet} {
    margin-top: -100px;
  }

  h2 {
    font-family: 'Kufam';
    font-size: 34px;
    text-transform: uppercase;
    margin-bottom: 35px;
    cursor: pointer;

    @media ${devices.tablet} {
      font-size: 24px;
    }
  }
`;
export const MenuList = styled.ul`
  list-style: none;

  li:not(:last-child) {
    margin-bottom: 60px;
  }

  li strong {
    font-weight: 500;
  }
`;
export const SocialList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  margin-top: 60px;

  li:not(:last-child) {
    margin-right: 20px;
  }
`;

const Menu = ({ data, socialLinks, updateFakeScroll }) => {
  const menu = useRef(null);
  const menuOuter = useRef(null);
  const fakeMenu = useRef(null);

  const handleClick = () => {
    updateFakeScroll(); // update pageHeight (just to be sure)

    // scroll to Element
    window.scrollTo({
      top:
        menu.current.previousSibling.offsetTop +
        menu.current.previousSibling.clientHeight / 3,
      behavior: 'smooth',
    });
  };
  const transformMenu = () => {
    const mql = window.matchMedia('(max-width: 1024px)');
    const moduleSpace = mql.matches ? 60 : 150;
    const marginMinus = mql.matches ? 100 : 120;
    const scrollLimit = fakeMenu.current.offsetTop;
    const target = menuOuter.current;
    const pageOffset =
      document.documentElement.scrollTop +
      window.innerHeight -
      marginMinus -
      moduleSpace;

    if (pageOffset >= scrollLimit) {
      target.style.transform = `translate3d(0px, -${
        pageOffset - scrollLimit
      }px, 0px)`;
    } else {
      target.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transformMenu);

    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      window.removeEventListener('scroll', transformMenu());
    };
  }, []);

  return (
    <>
      <div id="fake-menu" ref={fakeMenu}></div>
      <MenuContainer ref={menu}>
        <MenuOuter className="menu-outer" ref={menuOuter}>
          <MenuInner className="menu-inner" onClick={() => handleClick()}>
            <h2>{data.title}</h2>
            <MenuList id="menu-list">
              {data.meals.map((meal) => (
                <li key={meal.title}>
                  <strong>
                    {meal.title} {meal.price}
                  </strong>
                  {documentToReactComponents(JSON.parse(meal.ingredients.raw))}
                </li>
              ))}
            </MenuList>
            <SocialList id="menu-list">
              {socialLinks.map((link) => (
                <li key={link.linkText}>
                  <a
                    href={link.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.linkText}
                  </a>
                </li>
              ))}
            </SocialList>
          </MenuInner>
        </MenuOuter>
      </MenuContainer>
    </>
  );
};

export default Menu;
