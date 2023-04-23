import { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import styles from './ButtonTheme.module.css';
import { THEMES } from './data';
import { useAppSelector } from '../../store/hooks';
import { selectUserData } from '../../store/selectors';
import { UserData } from '../../store/typings';
import { themeAPI } from '../../api/ThemeAPI/ThemeAPI';
import { isSSR } from '../../utils/isSSR';

/**
 * README!!!
 * Для добавления новой цветовой темы необходимо:
 * 1. Создать новую тему в массиве THEMES в .\data.ts, подобрать иконку;
 * 2. Прописать цвета в client\src\styles\properties.css
 * 3. Тема в БД попадет автоматически
 */

export function ButtonTheme() {
  const userData: UserData | null = useAppSelector(selectUserData);
  const userId: number | undefined = userData?.id;

  // тема по умолчанию - первая, светлая
  const defaultTheme = THEMES[0];
  const defaultThemeId = defaultTheme.theme_id;

  const [theme, setTheme] = useState<number>(defaultThemeId);

  // ищем нужный атрибут по id и добавляем к документу (для применения стилей)
  const setThemeInDocument = useCallback((id: number) => {
    const currentTheme = THEMES.find((item) => item.theme_id === id);
    const currentThemeName: string = currentTheme
      ? currentTheme.theme_name : defaultTheme.theme_name;
    document.documentElement.setAttribute('data-theme', currentThemeName);
  }, [defaultTheme]);

  useEffect(() => {
    // говорят, в SSR local storage не алё
    const themeFromLS = localStorage.getItem('user-theme');

    /**
     * Пытаемся достать тему из LS, при этом не получив всяких undefined
     * Затем пробуем взять её из БД
     * Также нужна заглушка для установки дефолтной темы
     */
    if (themeFromLS && typeof JSON.parse(themeFromLS).theme_id !== 'undefined') {
      setTheme(JSON.parse(themeFromLS).theme_id);
      setThemeInDocument(JSON.parse(themeFromLS).theme_id);
    } else if (userId) {
      const themeFromDB = themeAPI.getUserTheme(userId);
      themeFromDB.then((res) => {
        if (res) {
          setTheme(res.theme_id);
          setThemeInDocument(res.theme_id);
        } else {
          setTheme(defaultThemeId);
          setThemeInDocument(defaultThemeId);
        }
      });
    } else {
      setTheme(defaultThemeId);
      setThemeInDocument(defaultThemeId);
    }
  }, [setTheme, defaultThemeId, userId, setThemeInDocument]);

  const handleThemeClick = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }
    const selectedTheme = e.target.dataset.themeId;

    e.target.dataset.active = 'true';

    if (selectedTheme) {
      const selectedThemeNumeric = Number(selectedTheme);

      setThemeInDocument(selectedThemeNumeric);
      setTheme(selectedThemeNumeric);

      // говорят, в SSR local storage не алё
      if (!isSSR()) {
        localStorage.setItem('user-theme', JSON.stringify(selectedThemeNumeric));
      }

      // назначаем пользователю тему в БД
      if (userId) {
        themeAPI.setActiveUserTheme({ userId, themeId: selectedThemeNumeric });
      }
    }
  };

  const themeButtons = THEMES.map((item) => (
    <button
      type="button"
      aria-label="Set theme"
      onClick={(e) => handleThemeClick(e)}
      data-testid="toggleThemeBtn"
      data-theme-id={item.theme_id}
      key={item.theme_id + item.theme_name}
      data-theme-name={item.theme_name}
      className={classNames(styles[`btn-icon-${item.theme_name}`], styles.btnIcon)}
      data-active={theme === item.theme_id}
      style={{
        backgroundImage: `url("${item.theme_icon}")`,
      }}
    />
  ));

  return (
    <div className={styles.toggleThemeBtn} data-current={theme}>
      {themeButtons}
    </div>
  );
}
