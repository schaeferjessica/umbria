import React, { useEffect, useRef, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { devices } from '../styles/breakpoints';
import { moduleSpace } from '../styles/container';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ThemeContext from '../styles/themecontext';

const space = '30px';
export const MenuContainer = styled.div`
  width: 100%;
  padding-left: 150px;
  ${moduleSpace}

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
export const MenuInner = styled.div`
  background-color: white;
  padding-bottom: ${space};

  h2 {
    position: fixed;
    bottom: 0;
    font-family: 'Kufam';
    font-size: 34px;
    text-transform: uppercase;
    background-color: white;
    width: 100%;

    @media ${devices.tablet} {
      font-size: 24px;
    }

    &.is-static {
      position: relative;
    }

    button {
      color: ${(props) => props.color.red};
      width: 100%;
      text-align: left;
      padding: ${space};
    }
  }
`;
export const MenuList = styled.ul`
  list-style: none;
  padding-right: ${space};
  padding-left: ${space};

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
  padding-right: ${space};
  padding-left: ${space};

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
    padding: ${space};
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
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
`;
export const ImpressumCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 40px;
  color: ${(props) => props.color.red};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 80px;

  &:hover {
    animation: ${rotate} 1s linear infinite;
  }

  span[aria-hidden='true'] {
    height: 21px;
    display: block;
  }
`;

const Menu = ({ data, socialLinks, impressum }) => {
  const menu = useRef(null);
  const title = useRef(null);
  const fakeMenu = useRef(null);
  const [impressumActive, setImpressumActive] = useState(false);
  const { colors } = useContext(ThemeContext);

  const handleClick = () => {
    // scroll to Element
    window.scrollTo({
      top:
        menu.current.previousSibling.offsetTop +
        menu.current.previousSibling.clientHeight / 3,
      behavior: 'smooth',
    });
  };

  const affixScroll = () => {
    const pageOffset = document.documentElement.scrollTop;
    const menuOffset =
      menu.current.offsetTop - window.innerHeight + title.current.clientHeight;

    if (pageOffset >= menuOffset) {
      title.current.classList.add('is-static');
    } else {
      title.current.classList.remove('is-static');
    }
  };

  useEffect(() => {
    affixScroll();
    window.addEventListener('scroll', affixScroll);

    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      window.removeEventListener('scroll', affixScroll);
    };
  }, []);

  return (
    <>
      <div id="fake-menu" ref={fakeMenu}></div>
      <MenuContainer ref={menu}>
        <div className="menu-outer">
          <MenuInner className="menu-inner" color={colors}>
            <h2 ref={title}>
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
        </div>
      </MenuContainer>
      <Impressum className={impressumActive ? 'is-active' : ''}>
        <div className="impressum-outer">
          <div className="impressum-inner">
            <ImpressumCloseButton
              onClick={() => setImpressumActive(false)}
              color={colors}
            >
              <span aria-hidden="true">*</span>
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
