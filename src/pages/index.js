import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Header from '../components/header';
import Footer from '../components/footer';
import Intro from '../components/intro';
import Menu from '../components/menu';
import ImageTeaser from '../components/image-teaser';
import useContenfulImageTeasers from '../hooks/use-imageteasers';
import useContenfulMenuPizza from '../hooks/use-menu-pizza';
import useContenfulMenuStarter from '../hooks/use-menu-starter';
import useContenfulMenuSpecial from '../hooks/use-menu-special';
import useContenfulImpressum from '../hooks/use-impressum';
import useContenfulSocialLinks from '../hooks/use-socialLinks';
import styled from 'styled-components';

const ImageTeaserWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const MenuWrapper = styled.div`
  position: fixed;
  top: 21.8%;
  left: -2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IndexPage = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const imageTeasers = useContenfulImageTeasers();
  const menuPizza = useContenfulMenuPizza();
  const menuStarter = useContenfulMenuStarter();
  const menuSpecial = useContenfulMenuSpecial();
  const socialLinks = useContenfulSocialLinks();
  const impressum = useContenfulImpressum();
  const isEven = (n) => n % 2 === 0;
  const handleMenuClick = (position) => {
    setActiveMenu(position);
  };

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
      <MenuWrapper>
        <Menu
          data={menuStarter}
          position={1}
          menuClick={handleMenuClick}
          activeMenu={activeMenu}
        />
        <Menu
          data={menuPizza}
          position={2}
          menuClick={handleMenuClick}
          activeMenu={activeMenu}
        />
        <Menu
          data={menuSpecial}
          position={3}
          menuClick={handleMenuClick}
          activeMenu={activeMenu}
        />
      </MenuWrapper>
      <Footer socialLinks={socialLinks} impressum={impressum} />
    </Layout>
  );
};

export default IndexPage;
