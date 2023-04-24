import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { rootReducer } from '../../store/store';
import '../../../mocks/matchMedia.mock'; // Must be imported before the tested file
import { ButtonTheme } from './ButtonTheme';

describe('ButtonTheme component tests', () => {
  let store: Store<unknown, AnyAction>;
  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
  });

  test('Correct render', () => {
    render(
      <Provider store={store}>
        <ButtonTheme />
      </Provider>,
    );
    const buttons = screen.getAllByTestId('toggleThemeBtn');

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
      expect(button).toMatchSnapshot();
    });
  });

  test('Change dataset onClick', () => {
    render(
      <Provider store={store}>
        <ButtonTheme />
      </Provider>,
    );
    const buttons = screen.getAllByTestId('toggleThemeBtn');

    buttons.forEach((button) => {
      fireEvent.click(button);

      const datasetAfterClick = button.dataset.active;

      expect(datasetAfterClick).toBe('true');
    });
  });
});
