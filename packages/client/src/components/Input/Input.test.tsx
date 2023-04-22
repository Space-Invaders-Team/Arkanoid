import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('Input component', () => {
  test('renders correctly', () => {
    render(<Input placeholder="test placeholder" name="test" type="text" />);

    const input = screen.getByPlaceholderText(/test placeholder/i);

    expect(input).toBeInTheDocument();
    expect(input).toMatchSnapshot();
  });
});
