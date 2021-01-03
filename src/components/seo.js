import React from 'react';
import { Helmet } from 'react-helmet';
import useStaticMetadata from '../hooks/use-sitemetadata';

const SEO = ({ pageTitle, pageUrl }) => {
  const { title, description, siteUrl, keywords } = useStaticMetadata();
  const siteTitle = pageTitle ? `${pageTitle} - ${title}` : title;
  const url = pageUrl ? `${siteUrl}${pageUrl}` : siteUrl;

  return (
    <Helmet>
      <html lang="de" />
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="generator" content="Gatsby.js" />
      <meta name="”robots" content="noodp,noydir" />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Angelo Puglisi" />
      <meta property="og:site_name" content="Feinkost Umbria" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:description" content={description} />
      <meta name="google-site-verification" content="" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" content={url}></link>
    </Helmet>
  );
};

export default SEO;
