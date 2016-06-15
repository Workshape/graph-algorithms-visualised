import React from 'react';

import './BlogHeading.styl';
import ShareButtons from './ShareButtons';

const BlogHeading = (props) => {
  return <section className='BlogHeading'>

    <div className='inner'>
      <img src='assets/illustration-top-white.svg' className='illustration-intro' />
      <h1><a name='top'>A Visual Guide to<span className='bottom'>Graph Traversal Algorithms</span></a></h1>
      <span className='made-by'>
        By <a href='https://www.workshape.io'>
          <img src='assets/ws-logo-white.svg' alt='WorkShape.io' />
        </a>
      </span>
      <ShareButtons />
    </div>

  </section>;
};

export default BlogHeading;