import { render, screen } from '@testing-library/react';
// defineProperty for jest-test
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import './matchMedia.mock'; // Must be imported before the tested file
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { App } from './App';
import { rootReducer } from '../../store/store';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

describe('App component tests', () => {
  test('Test the loader is shown', async () => {
    const store = configureStore({ reducer: rootReducer });
    render(<Provider store={store}><App /></Provider>);

    const component = await screen.findByTestId('loader');
    expect(component).toBeInTheDocument();
  });
});
