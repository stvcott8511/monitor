import React, { createContext, Dispatch, useContext, useReducer } from 'react';

export interface SnackbarState {
  display?: boolean;
  message?: string;
}

export const DEFAULT_SNACKBAR_STATE = Object.freeze<SnackbarState>({
  display: false,
  message: '',
});

export const SnackbarContext = createContext<[SnackbarState, Dispatch<SnackbarStateAction>]>([
  DEFAULT_SNACKBAR_STATE,
  (action: SnackbarStateAction) => { }
]);

export enum SnackbarStateActionType {
  DISPLAY = 'display',
  HIDE = 'hide',
}

export interface SnackbarStateAction {
  type: SnackbarStateActionType;
  display?: boolean;
  message?: string;
}

export interface SnackbarStateProviderProps {
  reducer: React.Reducer<SnackbarState, SnackbarStateAction>;
  initialState: SnackbarState;
}

export const SnackbarStateProvider: React.FunctionComponent<SnackbarStateProviderProps> = ({
  reducer,
  initialState,
  children,
}) => (
    <SnackbarContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </SnackbarContext.Provider>
  );

export const useSnackbar = () => useContext(SnackbarContext);