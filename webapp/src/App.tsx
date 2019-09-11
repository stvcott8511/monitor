import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Monitors from './pages/Monitors';
import { BaseTheme } from './themes/baseTheme';

const theme: BaseTheme = createMuiTheme({
  status: {
    info: '#0e8ae8',
    low: '#999999',
    medium: 'orange',
    high: '#c94336',
  },
} as ThemeOptions) as BaseTheme;

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <Route path="/" exact render={() => <Redirect to="/monitors" />} />
          <Route path="/monitors" component={Monitors} />
        </Router>
      </div>
    </ThemeProvider>
  );
}
