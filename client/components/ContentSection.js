import React from 'react';

import './ContentSection.styl';

const ContentSection = (props) => {
  var subMenu = null;
  if (props.subSections) {
    subMenu = <ul>{props.subSections.map((subSection, id) => <ContentSection key={`${props.link}-${id}`} {...subSection} />)}</ul>;
  }

  return <li className='ContentSection'>
    <a href={props.link}>{props.title}</a>
    {subMenu}
  </li>;
};

export default ContentSection;