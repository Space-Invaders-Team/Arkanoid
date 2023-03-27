import { fireEvent, getByTestId, render } from '@testing-library/react';
import { LinkRow } from './LinkRow';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('LinkRow component tests', () => {
  const mockData = { cell1: 'first', cell2: 'second', cell3: 'third' };
  const mockPath = '/sample-test';
  let trow: Node | Window;

  beforeEach(() => {
    const tableBody = document.createElement('tbody');
    const { container } = render(
      <LinkRow rowData={mockData} path={mockPath} />,
      {
        container: document.body.appendChild(tableBody),
      },
    );
    trow = getByTestId(container, 'linkRow');
  });

  test('Correct render', () => {
    expect(trow).toMatchSnapshot();
  });

  test('should navigate, when LinkRow is clicked', () => {
    fireEvent.click(trow);
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
