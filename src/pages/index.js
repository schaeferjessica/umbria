import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Header from '../components/header';
import Intro from '../components/intro';

const IndexPage = () => {
  return (
    <Layout>
      <SEO />
      <Header />
      <Intro title="Feinkost Umbria" />
    </Layout>
  );
};

export default IndexPage;
