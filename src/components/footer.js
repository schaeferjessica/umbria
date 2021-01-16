import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { moduleSpace } from '../styles/container';
import { devices } from '../styles/breakpoints';
import ThemeContext from '../styles/themecontext';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const space = 25;
const spaceMobile = 15;

export const FooterEl = styled.footer`
  ${moduleSpace}
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
export const SocialList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;

  li:not(:last-child) {
    margin-right: 20px;
  }
`;
export const Impressum = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
const Footer = ({ socialLinks, impressum }) => {
  const { colors } = useContext(ThemeContext);
  const [impressumActive, setImpressumActive] = useState(false);

  const handleOpenClick = () => {
    setImpressumActive(!impressumActive);
    document.querySelector('body').classList.add('prevent-scroll');
  };

  const handleCloseClick = () => {
    setImpressumActive(false);
    document.querySelector('body').classList.remove('prevent-scroll');
  };

  return (
    <FooterEl className="container">
      {socialLinks && (
        <SocialList>
          {socialLinks.map((link) => (
            <li key={link.linkText}>
              <a href={link.linkUrl} target="_blank" rel="noopener noreferrer">
                {link.linkText}
              </a>
            </li>
          ))}
          <li>
            <ImpressumButton color={colors} onClick={() => handleOpenClick()}>
              {impressum.button}
            </ImpressumButton>
          </li>
        </SocialList>
      )}

      {impressum && (
        <Impressum className={impressumActive ? 'is-active' : ''}>
          <div className="impressum-outer">
            <div className="impressum-inner">
              <ImpressumCloseButton
                onClick={() => handleCloseClick()}
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
    </FooterEl>
  );
};

export default Footer;
