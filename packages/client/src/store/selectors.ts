import { createSelector } from '@reduxjs/toolkit';
import { StateObject } from './typings';
import { NavLinkStatus } from '../utils/routeConstants';

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
        if (elem.protect === NavLinkStatus.YES || elem.protect === NavLinkStatus.ALL) return elem;
        return false;
      });
    }
    return allNavLinks.filter((elem) => {
      if (elem.protect === NavLinkStatus.NO || elem.protect === NavLinkStatus.ALL) return elem;
      return false;
    });
  },
);
