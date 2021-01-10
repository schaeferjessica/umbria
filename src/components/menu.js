import React, { useEffect, useRef, useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { devices } from '../styles/breakpoints';
import { moduleSpace } from '../styles/container';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ThemeContext from '../styles/themecontext';

const space = 25;
const spaceMobile = 15;

export const MenuContainer = styled.div`
  width: 100%;
  padding-left: ${(props) => `${125 + space * props.position}px`};
  position: relative;
  z-index: ${(props) => props.position};
  ${moduleSpace}

  & + .menu-container {
    margin-top: 20px;
  }

  @media ${devices.tablet} {
    padding-left: ${(props) => `${45 + spaceMobile * props.position}px`};
  }

  @media ${devices.mobile} {
    padding-left: ${(props) => `${5 + spaceMobile * props.position}px`};
  }

  &.is-static {
    h2 {
      position: relative;
    }

    ul {
      position: relative;
      z-index: 1;
      margin-top: ${(props) =>
        `-${props.titleHeight * (props.length - props.position) - space}px`};

      @media ${devices.tablet} {
        margin-top: ${(props) =>
          `-${
            props.titleHeight * (props.length - props.position) - spaceMobile
          }px`};
      }
    }
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
  border-bottom: 1px solid ${(props) => props.color.red};
  border-left: 1px solid ${(props) => props.color.red};
  padding-bottom: ${space}px;

  @media ${devices.tablet} {
    padding-bottom: ${spaceMobile}px;
  }

  h2 {
    position: fixed;
    bottom: 0;
    font-family: 'Kufam';
    font-size: 25px;
    text-transform: uppercase;
    width: 100%;

    @media ${devices.tablet} {
      font-size: 20px;
    }

    button {
      background-color: white;
      position: relative;
      left: -1px;
      color: ${(props) => props.color.red};
      border-top: 1px solid ${(props) => props.color.red};
      border-left: 1px solid ${(props) => props.color.red};
      width: 100%;
      text-align: left;
      padding: ${space}px;
      padding-bottom: ${(props) =>
        `${
          props.titleHeight * (props.length - props.position) + space - 10
        }px`};

      @media ${devices.tablet} {
        padding: ${spaceMobile}px;
        padding-bottom: ${(props) =>
          `${
            props.titleHeight * (props.length - props.position) +
            spaceMobile -
            5
          }px`};
      }
    }
  }
`;
export const MenuList = styled.ul`
  list-style: none;
  padding-right: ${space}px;
  padding-left: ${space}px;

  @media ${devices.tablet} {
    padding-right: ${spaceMobile}px;
    padding-left: ${spaceMobile}px;
  }

  li:not(:last-child) {
    margin-bottom: 50px;

    @media ${devices.tablet} {
      margin-bottom: 30px;
    }
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
  padding-right: ${space}px;
  padding-left: ${space}px;

  @media ${devices.tablet} {
    padding-right: ${spaceMobile}px;
    padding-left: ${spaceMobile}px;
  }

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
    padding: ${space}px;
    font-size: 16px;

    @media ${devices.tablet} {
      padding: ${spaceMobile}px;
    }

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

const Menu = ({ data, position, length, socialLinks, impressum }) => {
  const menu = useRef(null);
  const title = useRef(null);
  const [impressumActive, setImpressumActive] = useState(false);
  const [titleHeight, setTitleHeight] = useState(0);
  const { colors } = useContext(ThemeContext);

  const handleClick = () => {
    // scroll to Element
    window.scrollTo({
      top: menu.current.offsetTop - 20,
      behavior: 'smooth',
    });
  };

  const affixScroll = () => {
    const elHeight = title.current.firstElementChild.clientHeight;
    const pageOffset = document.documentElement.scrollTop;
    const menuOffset = menu.current.offsetTop - window.innerHeight + elHeight;

    if (pageOffset >= menuOffset) {
      menu.current.classList.add('is-static');
    } else {
      menu.current.classList.remove('is-static');
    }
  };

  useEffect(() => {
    setTitleHeight(title.current.clientHeight);
    affixScroll();
    window.addEventListener('scroll', affixScroll);

    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      window.removeEventListener('scroll', affixScroll);
    };
  }, []);

  return (
    <>
      <MenuContainer
        className="menu-container"
        ref={menu}
        position={position}
        length={length}
        titleHeight={titleHeight}
      >
        <div className="menu-outer">
          <MenuInner
            className="menu-inner"
            color={colors}
            position={position}
            length={length}
            titleHeight={titleHeight}
          >
            <h2 ref={title}>
              <button onClick={() => handleClick()}>{data.title}</button>
            </h2>
            <MenuList id="menu-list" color={colors}>
              {data.meals.map((meal) => (
                <li key={meal.title}>
                  <strong>
                    {meal.title} {meal.price}
                  </strong>
                  {documentToReactComponents(JSON.parse(meal.ingredients.raw))}
                </li>
              ))}
            </MenuList>

            {socialLinks && (
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
            )}
          </MenuInner>
        </div>
      </MenuContainer>

      {impressum && (
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
      )}
    </>
  );
};

export default Menu;
