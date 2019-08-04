import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PrimaryLayout from './components/Layouts/PrimaryLayout';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrimaryLayout PrimaryAppBarProps={{ title: "Monitor" }} />
    </div>
  );
}

export default App;
