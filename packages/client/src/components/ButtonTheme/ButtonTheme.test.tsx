import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '../../../mocks/matchMedia.mock'; // Must be imported before the tested file
import { ButtonTheme } from './ButtonTheme';

describe('ButtonTheme component tests', () => {
  test('Correct render', () => {
    render(<ButtonTheme />);
    const component = screen.getByTestId('toggleThemeBtn');

    expect(component).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });

  test('Change className onClick', () => {
    render(<ButtonTheme />);
    const component = screen.getByTestId('toggleThemeBtn');
    const classListBeforeClick = component.classList.length;

    fireEvent.click(component);

    const classListAfterClick = component.classList.length;

    expect(classListBeforeClick).not.toBe(classListAfterClick);
  });
});
