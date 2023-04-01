import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../../store';

export function App({ children }: PropsWithChildren) {
  return (
    <Provider store={setupStore}>
      {children}
    </Provider>
  );
}
