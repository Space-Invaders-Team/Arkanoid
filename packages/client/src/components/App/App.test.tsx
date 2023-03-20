import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
// defineProperty for jest-test
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import './matchMedia.mock'; // Must be imported before the tested file
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';

import { App } from './App';
import { rootReducer } from '../../store/store';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

describe('App component tests', () => {
  let store: Store<unknown, AnyAction>;
  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
  });

  test('Test the loader is shown', async () => {
    render(<Provider store={store}><App /></Provider>);

    const component = await screen.findByTestId('loader');
    expect(component).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  });

  test('Test the navigation is shown', async () => {
    render(<Provider store={store}><App /></Provider>);

    const component = await screen.findByTestId('navigation');
    expect(component).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
