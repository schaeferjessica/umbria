import React, { useContext, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { moduleSpace } from '../styles/container';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { devices } from '../styles/breakpoints';
import ThemeContext from '../styles/themecontext';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs/lib/anime.es.js';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TeaserContainer = styled.div`
  ${moduleSpace}
`;
const Teaser = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.side === 'right' ? 'row' : 'row-reverse'};
  align-items: center;
  opacity: 0;
  transform: translateY(100%);

  @media ${devices.tablet} {
    display: block;
  }
`;
const TeaserText = styled.div`
  padding-right: ${(props) => (props.side === 'right' ? '0' : '80px')};
  padding-left: ${(props) => (props.side === 'right' ? '80px' : '0')};
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

  p:not(:first-child) {
    margin-top: 10px;
  }


`;
const TeaserImage = styled.figure`
  width: 55%;

  @media ${devices.tablet} {
    width: 100%;
  }

  picture {
    &:hover img {
      transform: scale(1.2);
    }
  }

  img {
    width: 100%;
    transition: opacity 500ms ease 0s, transform 0.5s linear 0s !important;
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
  const image = getImage(data.image)
  const [copyrightActive, setCopyrightActive] = useState(false);
  const { colors } = useContext(ThemeContext);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const teaserEl = useRef(null);

  useEffect(() => {
    if (inView) {
      const animation = anime({
        targets: teaserEl.current,
        translateY: ['20%', '0%'],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 2000,
        complete: () => {
          teaserEl.current.classList.add('animation-complete');
        },
      });
      animation.play();
    }
  }, [inView, ref, side]);

  return (
    <TeaserContainer ref={ref} side={side}>
      <Teaser className="container" side={side} id={data.id} ref={teaserEl}>
        <TeaserImage>
          <GatsbyImage image={image} alt={data.altText} />
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
