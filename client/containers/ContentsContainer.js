import React, { PropTypes, Component } from 'react';

import ContentSection from '../components/ContentSection';

import './ContentsContainer.styl';

export default class ContentsContainer extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired
  };

  render() {
    let cssClass = (this.props.visible) ? 'ContentsContainer' : 'ContentsContainer closed';
    return <div className={cssClass}>
      <div className='Controls' onClick={() => this.props.toggleMenu()}>
      </div>
      <div className='Menu'>
        <h2>Contents</h2>
        <ol>
          {this.props.sections.map((section, id) => <ContentSection key={id} {...section} />)}
        </ol>
      </div>
    </div>;
  }

};