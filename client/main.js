import { render } from 'react-dom';
import React from 'react';

import AppContainer from './containers/AppContainer';

import '../style/pure.css';
import '../style/icons.css';
import '../style/main.styl';

render(
  <AppContainer/>,
  document.getElementById('start-app')
);