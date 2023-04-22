import { useEffect, useState } from 'react';
import { isSSR } from '../utils/isSSR';

export const useTheme = () => {
  const isDarkTheme = isSSR() ? false : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isDarkTheme ? 'dark' : 'light';
  const initialTheme = isSSR() ? defaultTheme : (localStorage.getItem('app-theme') || defaultTheme);

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
