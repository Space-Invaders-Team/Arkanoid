import { act, render, screen, waitFor } from '@testing-library/react';
import { enableFetchMocks } from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { rootReducer } from '../../store/store';
import { TLeaderBoard } from './typings';
import { BASE_URL_YANDEX, LEADERBOARD, TEAM_NAME } from '../../utils/apiConstans';
import { useAppSelector } from '../../store/hooks';
import { useLeaders } from '../../hooks/useLeaders';
import { Leaderboard } from './Leaderboard';

enableFetchMocks();

jest.mock('../../store/hooks');
jest.mock('../../hooks/useLeaders', () => ({
  useLeaders: jest.fn(),
}));

const mockData: TLeaderBoard[] = [
  { id: 1, name: 'User1', score: 200, place: 1, avatar: '/ava1.png' },
  { id: 2, name: 'User2', score: 100, place: 2, avatar: '/ava2.png' },
];

describe('Leaderboard', () => {
  let store: Store<unknown, AnyAction>;
  const originalUseLeaders = jest.requireActual('../../hooks/useLeaders').useLeaders;

  beforeEach(() => {
    fetchMock.resetMocks();
    store = configureStore({ reducer: rootReducer });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeAll(() => {
    (useLeaders as jest.Mock).mockImplementation(originalUseLeaders);
  });

  test('it renders with data and return leader rows', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Мокаем useAppSelector для возврата фиктивного userData
    (useAppSelector as jest.Mock).mockReturnValue({ id: 2 });

    // Мокаем useLeaders для возврата фиктивной функции и данных для isLoading и leadersError
    (useLeaders as jest.Mock).mockImplementation((setLeaders) => {
      const fetchLeaders = () => {
        setLeaders(mockData);
      };

      return [fetchLeaders, false, null];
    });

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>,
    );

    const leaderboard = screen.getByTestId('leaderboard');

    expect(leaderboard).toBeInTheDocument();
    expect(leaderboard).toMatchSnapshot();

    // Ожидание обновления состояния после выполнения useEffect и fetch-запроса
    await waitFor(() => screen.getByTestId('leaderboard-table'));

    // Проверяем, что отрисовывается таблица с данными
    expect(screen.getByTestId('leaderboard-table')).toBeInTheDocument();

    // Проверяем, что отрисовывается TableRow для каждого элемента данных
    mockData.forEach((leader) => {
      expect(screen.getByText(leader.name)).toBeInTheDocument();
      expect(screen.getByText(leader.score.toString())).toBeInTheDocument();
    });
  });

  test('it renders correctly without data', () => {
    // Восстанавливаем оригинальный хук useLeaders
    (useLeaders as jest.Mock).mockImplementation(originalUseLeaders);

    act(() => render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>,
    ));

    const leaderboard = screen.getByTestId('leaderboard');

    expect(leaderboard).toBeInTheDocument();
    expect(leaderboard).toMatchSnapshot();
  });

  test('loader is shown', () => {
    // Восстанавливаем оригинальный хук useLeaders
    (useLeaders as jest.Mock).mockImplementation(originalUseLeaders);

    act(() => render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>,
    ));

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });

  test('it sends a fetch to correct url', () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Восстанавливаем оригинальный хук useLeaders
    (useLeaders as jest.Mock).mockImplementation(originalUseLeaders);

    act(() => render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>,
    ));

    // Ожидаем, что fetch будет вызван 1 раз
    expect(fetch).toHaveBeenCalledTimes(1);

    const [requestUrl] = fetchMock.mock.calls[0];

    // Ожидаем, что fetch вызван с верным урлом Яндекса
    expect(requestUrl).toBe(`${BASE_URL_YANDEX}${LEADERBOARD}/${TEAM_NAME}`);
  });
});
