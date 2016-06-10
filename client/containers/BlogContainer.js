import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';
import cx from 'classnames';

import AlgoVizContainer from './AlgoVizContainer';

import section1 from '../blog/section1';
import section2 from '../blog/section2';
import section3 from '../blog/section3';
import section4 from '../blog/section4';
import section5 from '../blog/section5';
import section6 from '../blog/section6';
import references from '../blog/references';

let sections = {
  1: section1,
  2: section2,
  3: section3,
  4: section4,
  5: section5,
  6: section6,
  references: references
};

import './BlogContainer.styl';

export default class BlogContainer extends Component {
  static propTypes = {
    sectionId: PropTypes.any.isRequired
  };

  render() {
    return <div className='BlogContainer'>
      {sections[this.props.sectionId]}
    </div>;
  }
};