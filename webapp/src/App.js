import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import PrimaryLayout from './components/Layouts/PrimaryLayout';
import Monitors from './pages/Monitors';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

// const routeParentLayouts = {
//   '/': { Component: PrimaryLayoutComponent },
//   '/monitors': { Component: PrimaryLayoutComponent },
//   '/monitors/test/events': { Component: PrimaryLayoutComponent },
// }

// function PrimaryLayoutComponent(props) {
//   const { children } = props;
//   console.log('PrimaryLayoutComponent');
//   return <PrimaryLayout PrimaryAppBarProps={{ title: 'Monitor' }}>{children}</PrimaryLayout>;
// }

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Route path="/" exact component={Monitors} />
        <Route path="/monitors" component={Monitors} />
      </Router>
    </div>
  );
}
