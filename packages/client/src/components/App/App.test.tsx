import { render, screen } from '@testing-library/react';
import './matchMedia.mock'; // Must be imported before the tested file
import App from './App';

const appContent = 'Главная';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
