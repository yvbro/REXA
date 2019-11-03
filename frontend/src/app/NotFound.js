import React from 'react';
import PageNotFound from '../assets/404.png';

const NotFound = () => (
  <div>
    <img alt="404" src={PageNotFound} style={{width: 400, height: 400, display: 'block', margin: 'auto', position: 'relative' }} />
  </div>
);

export default NotFound
