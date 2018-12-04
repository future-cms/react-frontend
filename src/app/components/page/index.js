import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
const siteConfig = require('../../../.config');
const config = siteConfig.default();

const SITE_URL = config.siteUrl[config.env];

const FACEBOOK_APP_ID = config.facebookApp;

const defaultTitle = config.title;
const defaultDescription = config.description;
const defaultImage = `${SITE_URL}${config.logo}`;
const defaultTwitter = config.twitter;
const defaultSep = ' | ';

class PageComponent extends Component {
  getMetaTags(
    {
      title,
      description,
      image,
      contentType,
      twitter,
      facebookAppId,
      noCrawl,
      published,
      updated,
      category,
      tags
    },
    pathname
  ) {
    const theTitle = title
      ? (title + defaultSep + defaultTitle).substring(0, 60)
      : defaultTitle;
    const theDescription = description
      ? description.substring(0, 155)
      : defaultDescription;
    const theImage = image ? `${SITE_URL}${image}` : defaultImage;

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemprop: 'description', content: theDescription },
      { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription },
      { property: 'og:title', content: theTitle },
      { property: 'og:type', content: contentType || 'website' },
      { property: 'og:url', content: SITE_URL + pathname },
      { property: 'og:image', content: theImage },
      { property: 'og:description', content: theDescription },
      { property: 'og:site_name', content: defaultTitle },
      
    ];
    if(twitter || defaultTwitter!==''){
      metaTags.push({ name: 'twitter:card', content: 'summary_large_image' });
      metaTags.push({ name: 'twitter:site', content: defaultTwitter });
      metaTags.push({ name: 'twitter:title', content: theTitle });
      metaTags.push({ name: 'twitter:description', content: theDescription });
      metaTags.push({ name: 'twitter:creator', content: twitter || defaultTwitter });
      metaTags.push({ name: 'twitter:image:src', content: theImage });
    }
    if(facebookAppId || FACEBOOK_APP_ID!==''){
      metaTags.push({ property: 'fb:app_id', content: facebookAppId || FACEBOOK_APP_ID });
    }

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    if (published) {
      metaTags.push({ name: 'article:published_time', content: published });
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated });
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category });
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags });
    }

    return metaTags;
  }

  render() {
    const { children, id, className, ...rest } = this.props;

    return (
      <div id={id} className={className}>
        <Helmet
          htmlAttributes={{
            lang: 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${rest.schema || 'WebPage'}`
          }}
          title={
            rest.title ? rest.title + defaultSep + defaultTitle : defaultTitle
          }
          link={[
            {
              rel: 'canonical',
              href: SITE_URL + this.props.location.pathname
            }
          ]}
          meta={this.getMetaTags(rest, this.props.location.pathname)}
        />
        {children}
      </div>
    );
  }
}

export default withRouter(PageComponent);
