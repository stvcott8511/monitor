import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Monitors from './pages/Monitors';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Route path="/" exact render={() => <Redirect to="/monitors" />} />
        <Route path="/monitors" component={Monitors} />
      </Router>
    </div>
  );
}
