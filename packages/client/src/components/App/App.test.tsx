import { render, screen } from '@testing-library/react';
// defineProperty for jest-test
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
import './matchMedia.mock'; // Must be imported before the tested file
import { App } from './App';

const appContent = 'Главная';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
