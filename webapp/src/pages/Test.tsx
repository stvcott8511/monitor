import Button from '@material-ui/core/Button';
import React from 'react';
import { useSnackbar, SnackbarStateActionType } from '../contexts/SnackbarContext';

export interface TestProps {

}

const Test: React.FunctionComponent<TestProps> = (props) => {
  const [, snackbarDispatch] = useSnackbar();

  function handleClickShowSnackbar() {
    snackbarDispatch({
      type: SnackbarStateActionType.DISPLAY,
      display: true,
      message: 'Hello World',
    });
  }

  return (
    <div>
      <Button onClick={handleClickShowSnackbar}>Show Snackbar</Button>
    </div>
  );
}

export default Test;