import { renderToString } from 'react-dom/server';
import React from 'react';
import type * as express from 'express';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server.js';
import { Provider } from 'react-redux';
import { routes } from './src/router/router';
import { setupStore } from './src/store';

function createFetchHeaders(
  requestHeaders: express.Request['headers'],
): Headers {
  const headers = new Headers();

  Object.entries(requestHeaders).forEach(([key, values]) => {
    if (values) {
      if (Array.isArray(values)) {
        values.forEach((value) => headers.append(key, value));
      } else {
        headers.set(key, values);
      }
    }
  });

  return headers;
}

function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();

  req.on('close', () => {
    controller.abort();
  });

  const init: RequestInit = {
    method: req.method,
    headers: createFetchHeaders(req.headers),
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
}

export async function render(req: express.Request) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(req);
  const context = await query(remixRequest);

  if (context instanceof Response) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw context;
  }

  const store = setupStore();
  const router = createStaticRouter(dataRoutes, context);
  const renderResult = renderToString((
    <Provider store={store}>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </Provider>
  ));

  const initialState = store.getState();

  return [initialState, renderResult];
}
