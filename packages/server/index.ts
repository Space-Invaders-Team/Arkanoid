import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { expressCspHeader } from 'express-csp-header';
import { messageRoutes } from './routes/forum/messageRoutes';
import { topicRoutes } from './routes/forum/topicRoutes';
import { forumRoutes } from './routes/forum/forumRoutes';
import { themeRoutes } from './routes/theme/themeRoutes';
import { userRoutes } from './routes/userRoutes';
import { escapeHtml, getCspDirectives } from './utils';
import { createPostgresConnect } from './database';

dotenv.config();

const IS_DEV = process.env.NODE_ENV === 'development';

async function createServer() {
  const app = express();
  const port = Number(process.env.SERVER_PORT) || 9000;
  const distPath = IS_DEV ? '' : path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));

  app
    .use(cors())
    .use(helmet({ crossOriginEmbedderPolicy: false }))
    .use('/sw.js', express.static(path.resolve(distPath, 'sw.js')));

  const vite = IS_DEV
    ? await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })
    : undefined;

  if (IS_DEV && vite) {
    app.use(vite.middlewares);
  }

  if (!IS_DEV) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  // create application/json parser
  const jsonParser = bodyParser.json();

  // parse application/json
  app.use(jsonParser);

  // api routes
  forumRoutes(app);
  topicRoutes(app);
  themeRoutes(app);
  messageRoutes(app);
  userRoutes(app);

  app.use('*', expressCspHeader({ directives: getCspDirectives() }), async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(IS_DEV ? srcPath : distPath, 'index.html'),
        'utf-8',
      );

      // // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      // //    and also applies HTML transforms from Vite plugins, e.g. global
      // //    preambles from @vitejs/plugin-react
      if (vite) {
        template = await vite.transformIndexHtml(url, template);
      }

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const ssrClientPath = IS_DEV ? '' : require.resolve('client/ssr-dist/ssr.cjs');
      const { render } = (IS_DEV && vite)
        ? (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
        : (await import(ssrClientPath));

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const [initialState, appHtml] = await render(req);
      const initialStateSerialized = escapeHtml(JSON.stringify(initialState));

      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--store-data-->', initialStateSerialized)
        .replace(/<script/g, `<script nonce="${req.nonce}"`);

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace, so it maps back
      // to your actual source code.
      vite?.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

createServer();

// with node-postgres
// createClientAndConnect();

// with ORM Sequelize
createPostgresConnect();
