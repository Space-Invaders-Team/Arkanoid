import sun from '../../assets/icons/sun.svg';
import moon from '../../assets/icons/moon.svg';
import rainbow from '../../assets/icons/rainbow.svg';
import { TThemes } from '../../typings';

export const THEMES: TThemes[] = [
  {
    theme_id: 1,
    theme_name: 'light',
    theme_icon: sun,
  },
  {
    theme_id: 2,
    theme_name: 'dark',
    theme_icon: moon,
  },
  {
    theme_id: 3,
    theme_name: 'rainbow',
    theme_icon: rainbow,
  },
];
