import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO />
      <Link to="/">Go home</Link>.
    </Layout>
  );
};

export default NotFoundPage;
