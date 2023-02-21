import { StringObject } from '../typings';

export type RouterProps = {
  isLogged: boolean,
  onLogin(userData: StringObject): void,
  onRegister(userData: StringObject): void,
};
