import type { CSPDirectives } from 'csp-header';
import { INLINE, NONCE, SELF, DATA } from 'express-csp-header';

const YANDEX_API_HOST = 'https://ya-praktikum.tech/api/v2/';
const VITE_HMR_HOST = 'http://localhost:24678/';

const directives: Partial<CSPDirectives> = {
  'default-src': [SELF],
  'connect-src': [SELF, YANDEX_API_HOST],
  'script-src': [SELF, NONCE],
  'style-src': [SELF, INLINE],
  'img-src': [SELF, YANDEX_API_HOST, DATA],
  'media-src': [SELF, DATA],
  'worker-src': [SELF],
  'block-all-mixed-content': true,
};

export const getCspDirectives = () => {
  if (process.env.NODE_ENV === 'development') {
    directives['connect-src']?.push('ws:', VITE_HMR_HOST);
    directives['script-src']?.push(INLINE);
  } else directives['script-src']?.push(NONCE);

  return directives;
};
