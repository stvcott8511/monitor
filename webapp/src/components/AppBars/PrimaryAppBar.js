import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import TabNavigation from '../Navigation/TabNavigation';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function PrimaryAppBar({
    NavigationToolbarProps,
    TabNavigationProps,
    tabPropsList,
    title,
    TitleAppBarProps,
    TitleToolbarProps,
    TypographyProps,
}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" {...TitleAppBarProps}>
                <Toolbar {...TitleToolbarProps}>
                    <Typography
                        variant="h6"
                        className={classes.title}
                        {...TypographyProps}>
                        {title}
                    </Typography>
                </Toolbar>
                <Toolbar {...NavigationToolbarProps}>
                    <TabNavigation
                        tabPropsList={[{
                            label: 'home',
                        }]}
                        AppBarProps={{ className: classes.tabNavigationAppBar, position: 'static' }}
                        TabsProps={{ 'aria-label': 'test' }}
                        {...TabNavigationProps} />
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default PrimaryAppBar;