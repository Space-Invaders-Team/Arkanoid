import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import { LinkRow } from './LinkRow';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('LinkRow component tests', () => {
  const mockData = { cell1: 'first', cell2: 'second', cell3: 'third' };
  const mockPath = '/sample-test';

  test('Correct render', () => {
    render(<LinkRow rowData={mockData} path={mockPath} />);
    const component = screen.getByTestId('linkRow');

    expect(component).toMatchSnapshot();
  });

  test('should navigate, when LinkRow is clicked', () => {
    const tableBody = document.createElement('tbody');
    const { container } = render(
      <LinkRow rowData={mockData} path={mockPath} />,
      {
        container: document.body.appendChild(tableBody),
      },
    );
    const trow = getByTestId(container, 'linkRow');

    fireEvent.click(trow);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
