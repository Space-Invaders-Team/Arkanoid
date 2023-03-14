import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Avatar } from './Avatar';

describe('Avatar component tests', () => {
  const mockData = { userId: 1, userName: 'TestName' };

  test('Correct render', () => {
    render(<Avatar userId={mockData.userId} userName={mockData.userName} />);
    const component = screen.getByTestId('Avatar');

    expect(component).toBeInTheDocument();
  });

  test('Constructs Avatar without path', () => {
    render(<Avatar userId={mockData.userId} userName={mockData.userName} />);
    const component = screen.getByTestId('BigHead');

    expect(component).toBeInTheDocument();
  });

  test('Constructs Avatar with path', () => {
    const mockPath = '/sample-test';
    render(<Avatar userId={mockData.userId} userName={mockData.userName} path={mockPath} />);

    const img = screen.getByTestId('AvatarImg');

    expect(img.getAttribute('src')).toBe(mockPath);
  });
});
