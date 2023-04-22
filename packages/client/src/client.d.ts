import { setupStore } from './store';

declare global {
  interface Window {
    __INITIAL_STATE__?: typeof setupStore;
  }
}
