import { StringObject } from '../../typings';

export type LoginProps = {
  onLogin(userData: StringObject): void;
};
