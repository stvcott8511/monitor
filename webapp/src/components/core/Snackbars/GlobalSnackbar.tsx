import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import React from 'react';
import { useSnackbar, SnackbarStateActionType } from '../../../contexts/SnackbarContext';

export const AUTO_CLOSE_TIME = 5000;

export interface GlobalSnackbarProps {
  SnackbarProps?: Partial<SnackbarProps>;
}

const GlobalSnackbar: React.FunctionComponent<GlobalSnackbarProps> = (props) => {
  const {
    SnackbarProps,
  } = props;

  const [
    { display, message, },
    snackbarDispatch
  ] = useSnackbar();

  function handleClose() {
    snackbarDispatch({
      type: SnackbarStateActionType.HIDE,
    });
  }

  return (
    <Snackbar
      open={Boolean(display)}
      onClose={handleClose}
      autoHideDuration={AUTO_CLOSE_TIME}
      message={message}
      {...SnackbarProps}>
    </Snackbar>
  );
};

export default GlobalSnackbar;