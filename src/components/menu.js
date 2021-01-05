import React, { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ThemeContext from '../styles/themecontext';

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
  margin-top: -110px;
  background-color: white;
  padding-bottom: 40px;

  @media ${devices.tablet} {
    margin-top: -100px;
  }

  h2 {
    font-family: 'Kufam';
    font-size: 34px;
    text-transform: uppercase;

    @media ${devices.tablet} {
      font-size: 24px;
    }

    button {
      color: ${(props) => props.color.red};
      width: 100%;
      text-align: left;
      padding-top: 40px;
      padding-right: 40px;
      padding-bottom: 40px;
      padding-left: 40px;
    }
  }
`;
export const MenuList = styled.ul`
  list-style: none;
  padding-right: 40px;
  padding-left: 40px;

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
  padding-right: 40px;
  padding-left: 40px;

  li:not(:last-child) {
    margin-right: 20px;
  }
`;
export const Impressum = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 500ms ease-in-out;
  z-index: 999;
  pointer-events: none;

  &.is-active {
    opacity: 1;
    pointer-events: inherit;
  }

  .impressum-outer {
    background-color: white;
    overflow: auto;
    width: 100%;
    height: 100%;
  }

  .impressum-inner {
    position: relative;
    padding: 40px;
    font-size: 16px;

    @media ${devices.mobile} {
      font-size: 14px;
    }
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 40px;

    @media ${devices.mobile} {
      font-size: 16px;
    }
  }

  p {
    margin-top: 20px;
  }
`;
export const ImpressumButton = styled.button`
  text-decoration: underline;
  color: ${(props) => props.color.red};
`;
export const ImpressumCloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  background-color: ${(props) => props.color.red};
  border-radius: 50%;
  width: 15px;
  height: 15px;
`;

const Menu = ({ data, socialLinks, impressum, updateFakeScroll }) => {
  const menu = useRef(null);
  const menuOuter = useRef(null);
  const fakeMenu = useRef(null);
  const [impressumActive, setImpressumActive] = useState(false);
  const { colors } = useContext(ThemeContext);

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
    const marginMinus = mql.matches ? 100 : 110;
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
          <MenuInner className="menu-inner" color={colors}>
            <h2>
              <button onClick={() => handleClick()}>{data.title}</button>
            </h2>
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
              <li>
                <ImpressumButton
                  color={colors}
                  onClick={() => setImpressumActive(!impressumActive)}
                >
                  {impressum.button}
                </ImpressumButton>
              </li>
            </SocialList>
          </MenuInner>
        </MenuOuter>
      </MenuContainer>
      <Impressum className={impressumActive ? 'is-active' : ''}>
        <div className="impressum-outer">
          <div className="impressum-inner">
            <ImpressumCloseButton
              onClick={() => setImpressumActive(false)}
              color={colors}
            >
              <span className="sr-only">Impressum schließen</span>
            </ImpressumCloseButton>
            {documentToReactComponents(JSON.parse(impressum.text.raw))}
          </div>
        </div>
      </Impressum>
    </>
  );
};

export default Menu;
