import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Header from '../components/header';
import Intro from '../components/intro';
import Menu from '../components/menu';
import ImageTeaser from '../components/image-teaser';
import useContenfulImageTeasers from '../hooks/use-imageteasers';
import useContenfulMenu from '../hooks/use-menu';
import styled from 'styled-components';

export const FakeScroll = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -9999;
  pointer-events: none;
`;

const IndexPage = () => {
  const [pageHeight, setPageHeight] = useState(0);
  const imageTeasers = useContenfulImageTeasers();
  const menu = useContenfulMenu();
  const isEven = (n) => n % 2 === 0;
  const setFinalPageHeight = () => {
    const menuOuter = document.querySelector('.menu-inner');
    const menuHeight = menuOuter ? menuOuter.clientHeight : 0;
    const mql = window.matchMedia('(max-width: 1024px)');
    const moduleSpace = mql.matches ? 60 : 150;
    setPageHeight(document.body.clientHeight + menuHeight + moduleSpace);
  };

  useEffect(() => {
    window.addEventListener('scroll', setFinalPageHeight);

    // make sure height gets set on pageLoad
    const timer = setTimeout(() => setFinalPageHeight(), 300);

    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      window.removeEventListener('scroll', setFinalPageHeight);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout>
      <SEO />
      <Header />
      <Intro title="Feinkost Umbria" />
      {imageTeasers.map((imageTeaser, index) => (
        <ImageTeaser
          key={imageTeaser.title}
          data={imageTeaser}
          side={isEven(index) ? 'right' : 'left'}
        />
      ))}
      <Menu data={menu} updateFakeScroll={() => setFinalPageHeight()} />
      <FakeScroll
        id="fake-scroll"
        style={{ height: `${pageHeight}px` }}
      ></FakeScroll>
    </Layout>
  );
};

export default IndexPage;
