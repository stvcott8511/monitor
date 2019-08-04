import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

function TabNavigation({
    tabPropsList,
    TabsProps,
    ...otherProps
}) {
    const classes = useStyles(otherProps);

    return (
        <Tabs aria-label="tab navigation" {...TabsProps}>
            {
                tabPropsList.map((tabProps, index) => <Tab key={`${tabProps.label}_${index}`} {...tabProps} />)
            }
        </Tabs>
    );
}

export default TabNavigation;