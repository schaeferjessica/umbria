import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Header from '../components/header';
import Intro from '../components/intro';
import ImageTeaser from '../components/image-teaser';
import useContenfulImageTeasers from '../hooks/use-imageteasers';

const IndexPage = () => {
  const imageTeasers = useContenfulImageTeasers();
  const isEven = (n) => n % 2 === 0;

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
    </Layout>
  );
};

export default IndexPage;
