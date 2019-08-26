import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

export interface RouteParentLayouts {
  [key: string]: {
    Component: React.ComponentType<{}>;
  };
}

export interface RootLayoutProps {
  routeParentLayouts: RouteParentLayouts;
}

const RootLayout: React.SFC<RootLayoutProps & RouteComponentProps<any>> = (props) => {
  const {
    children,
    location,
    routeParentLayouts,
  } = props;

  const classes = useStyles(props);
  const RouteParentLayout = routeParentLayouts[location.pathname].Component;

  return (
    <div className={classes.root}>
      <RouteParentLayout>
        {children}
      </RouteParentLayout>
    </div>
  );
};

export default withRouter(RootLayout);