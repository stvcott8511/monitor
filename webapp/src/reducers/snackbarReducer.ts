import React from 'react';
import { SnackbarState, SnackbarStateAction, SnackbarStateActionType } from '../contexts/SnackbarContext';

export const reducer: React.Reducer<SnackbarState, SnackbarStateAction> = (prevState, action) => {
  switch (action.type) {
    case SnackbarStateActionType.DISPLAY:
      return {
        ...prevState,
        display: action.display,
        message: action.message || '',
      };
    case SnackbarStateActionType.HIDE:
      return {
        ...prevState,
        display: false,
        message: '',
      };
    default:
      return prevState;
  }
};