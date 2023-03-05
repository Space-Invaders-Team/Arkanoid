import { createSelector } from '@reduxjs/toolkit';
import { StateObject } from './typings';

export const selectUserData = (state: StateObject) => state.auth.userData;
export const selectAuthStatus = (state: StateObject) => state.auth.status;
export const selectIsLogged = (state: StateObject) => state.auth.isLogged;
export const selectAuthError = (state: StateObject) => state.auth.error;
export const selectNavlinks = (state: StateObject) => state.auth.navLinks;

export const selectNavLinksByIsLogged = createSelector(
  selectNavlinks,
  selectIsLogged,
  (allNavLinks, isLogged) => {
    if (isLogged) {
      return allNavLinks.filter((elem) => {
        if (elem.protect) return elem;
        return false;
      });
    }
    if (!isLogged) {
      return allNavLinks.filter((elem) => {
        if (!elem.protect || (typeof elem.protect) === 'string') return elem;
        return false;
      });
    }
    return false;
  },
);
