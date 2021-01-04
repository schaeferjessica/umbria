import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { moduleSpace } from '../styles/container';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { devices } from '../styles/breakpoints';
import ThemeContext from '../styles/themecontext';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es.js';

const TeaserContainer = styled.div`
  opacity: 0;
  transform: ${(props) =>
    props.side === 'right' ? 'translateX(500px)' : 'translateX(-500px)'};
  ${moduleSpace}
`;
const Teaser = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.side === 'right' ? 'row' : 'row-reverse'};
  align-items: center;

  @media ${devices.tablet} {
    display: block;
  }
`;
const TeaserText = styled.div`
  padding-right: ${(props) => (props.side === 'right' ? '0' : '150px')};
  padding-left: ${(props) => (props.side === 'right' ? '150px' : '0')};
  flex: 1;
  width: 45%;

  @media ${devices.tablet} {
    padding-left: 0;
    padding-right: 0;
    width: 100%;
    margin-top: 20px;
  }

  h2 {
    font-family: 'Kufam';
    font-size: 34px;
    text-transform: uppercase;
    margin-bottom: 20px;

    @media ${devices.tablet} {
      font-size: 24px;
    }
  }

  .button {
    margin-top: 25px;
  }
`;
const TeaserImage = styled.figure`
  width: 55%;

  @media ${devices.tablet} {
    width: 100%;
  }

  picture {
    position: relative;
    overflow: hidden;

    &:hover img {
      transform: scale(1.2);
    }
  }

  img {
    width: 100%;
    transition: transform 700ms ease-in-out;
  }
`;
const Figcaption = styled.figcaption`
  margin-top: 5px;
  font-size: 16px;

  @media ${devices.tablet} {
    font-size: 14px;
  }

  span {
    transition: opacity 300ms ease-in-out;
  }
`;
const CopyrightButton = styled.button`
  color: ${(props) => props.color.red};
`;

const ImageTeaser = ({ data, side }) => {
  const [copyrightActive, setCopyrightActive] = useState(false);
  const { colors } = useContext(ThemeContext);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const teaserEl = useRef(null);

  useEffect(() => {
    if (inView) {
      const animation = anime({
        targets: teaserEl.current,
        translateX: [side === 'right' ? 500 : -500, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1400,
      });
      animation.play();
    }
  }, [inView, ref, side]);

  return (
    <TeaserContainer ref={teaserEl} side={side}>
      <Teaser className="container" side={side} id={data.id} ref={ref}>
        <TeaserImage>
          <picture>
            <img src={data.image} alt={data.altText} />
          </picture>
          <Figcaption>
            <CopyrightButton
              color={colors}
              onMouseEnter={() => setCopyrightActive(true)}
              onMouseLeave={() => setCopyrightActive(false)}
            >
              ©
            </CopyrightButton>
            <span style={{ opacity: copyrightActive ? '1' : '0' }}>
              {data.copyright}
            </span>
          </Figcaption>
        </TeaserImage>
        <TeaserText side={side}>
          <h2>{data.title}</h2>
          {documentToReactComponents(JSON.parse(data.text))}
          {data.linkUrl ? (
            <a
              className="button"
              href={data.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.linkText}
            </a>
          ) : data.linkText ? (
            <div className="button">{data.linkText}</div>
          ) : null}
        </TeaserText>
      </Teaser>
    </TeaserContainer>
  );
};

export default ImageTeaser;
