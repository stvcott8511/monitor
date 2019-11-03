import Tab, { TabProps } from '@material-ui/core/Tab';
import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export interface TabNavigationProps {
  tabPropsList?: Partial<TabProps>[];
  TabsProps?: TabsProps;
}

const TabNavigation: React.FunctionComponent<TabNavigationProps> = (props) => {
  const {
    tabPropsList = [],
    TabsProps = {
      value: 0,
      centered: true,
    },
  } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Tabs aria-label="tab navigation" {...TabsProps}>
        {
          tabPropsList.map((tabProps, index) => <Tab key={`${tabProps.label}_${index}`} {...tabProps} />)
        }
      </Tabs>
    </div>
  );
}

export default TabNavigation;