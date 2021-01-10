import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Header from '../components/header';
import Intro from '../components/intro';
import Menu from '../components/menu';
import ImageTeaser from '../components/image-teaser';
import useContenfulImageTeasers from '../hooks/use-imageteasers';
import useContenfulMenu from '../hooks/use-menu';
import useContenfulImpressum from '../hooks/use-impressum';
import useContenfulSocialLinks from '../hooks/use-socialLinks';
import styled from 'styled-components';

export const ImageTeaserWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
export const FakeScroll = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -9999;
  pointer-events: none;
`;

const IndexPage = () => {
  const imageTeasers = useContenfulImageTeasers();
  const menu = useContenfulMenu();
  const socialLinks = useContenfulSocialLinks();
  const impressum = useContenfulImpressum();
  const isEven = (n) => n % 2 === 0;

  return (
    <Layout>
      <SEO />
      <Header />
      <Intro title="Feinkost Umbria" />
      <ImageTeaserWrapper>
        {imageTeasers.map((imageTeaser, index) => (
          <ImageTeaser
            key={imageTeaser.title}
            data={imageTeaser}
            side={isEven(index) ? 'right' : 'left'}
          />
        ))}
      </ImageTeaserWrapper>
      <Menu data={menu} socialLinks={socialLinks} impressum={impressum} />
    </Layout>
  );
};

export default IndexPage;
