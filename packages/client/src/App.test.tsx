import { render, screen } from '@testing-library/react';
import App from './App';
// @ts-ignore
const appContent = 'landing';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
