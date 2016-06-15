import React from 'react';

import './ShareButtons.styl';

function twitterShare(path = '', text = null, tags = null) {
  tags = tags || [ 'workshape' ];
  text = text || 'Check out Graph Algorithms - A Visual Guide to Graph Traversal Algorithms by Workshape.io';

  let url = `http://workshape.github.io/visual-graph-algorithms/${path}`,
    twitterUrl = buildTwitterUrl({ url, text, tags });

  openModal(twitterUrl, 'Tweet', 700, 260);
}

function facebookShare(path = '') {
  let url = `http://workshape.github.io/visual-graph-algorithms/${path}`,
    facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  openModal(facebookUrl, 'Share', 560, 610);
}

function buildTwitterUrl(options) {
  return [
    `https://twitter.com/intent/tweet?tw_p=tweetbutton&hashtags=Workshape`,
    `&url=${encodeURI(options.url)}`,
    `&text=${options.text}`
  ].join('');
}

function openModal(url, title = null, width = 700, height = 500) {
  let screenSize = getScreenSize(),
    options = {
      left     : screenSize.width / 2 - width / 2,
      top      : screenSize.height / 2 - height / 2,
      titlebar : false,
      location : location,
      menubar  : false,
      status   : false,
      toolbar  : false,
      width, height
    };

  window.open(url, title, serialize(options));
}

function serialize(object) {
    var parts = [];

    for (let key in object) {
            parts.push(`${key}=${object[key]}`);
    }

    return parts.join(',');
}

function getScreenSize() {
    if (document.documentElement && document.documentElement.clientWidth) {
        return {
            width  : document.documentElement.clientWidth,
            height : document.documentElement.clientHeight
        };
    }

    if (document.body.clientWidth) {
        return {
            width : document.body.clientWidth,
            height : document.body.clientHeight
        };
    }

    return {
        width  : window.innerWidth,
        height : window.innerHeight
    };
}

const ShareButtons = (props) => {
  return <div className='ShareButtons'>
    <button className='pure-button button-twitter' onClick={twitterShare}>Tweet</button>
    <button className='pure-button button-facebook' onClick={facebookShare}>Share</button>
  </div>;
};

export default ShareButtons;