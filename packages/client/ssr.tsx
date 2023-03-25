import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server.js';
import { serverRoutes } from './src/router/router';
import { App } from './src/components/App';

export function render(url: string) {
  return renderToString((
    <App>
      <StaticRouter location={url}>
        {serverRoutes}
      </StaticRouter>
    </App>
  ));
}
