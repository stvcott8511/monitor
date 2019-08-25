import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import unsupportedProp from '../../utilities/unsupportedProp';

function TabNavigation(props) {
  const {
    tabPropsList,
    TabsProps,
  } = props;
  return (
    <Tabs aria-label="tab navigation" {...TabsProps}>
      {
        tabPropsList.map((tabProps, index) => <Tab key={`${tabProps.label}_${index}`} {...tabProps} />)
      }
    </Tabs>
  );
}

export default TabNavigation;

TabNavigation.propTypes = {
  children: unsupportedProp,
  tabPropsList: PropTypes.arrayOf(PropTypes.shape(Tab.propTypes)),
  TabsProps: PropTypes.shape(Tabs.propTypes),
};