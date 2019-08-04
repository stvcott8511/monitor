import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PrimaryAppBar from '../AppBars/PrimaryAppBar';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
    },
    appHeader: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
    },
    toolbarSpacing: {
        ...theme.mixins.toolbar,
    },
    mainArea: {
        display: 'flex',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    contentArea: {
        flex: 1,
    }
}));

function PrimaryLayout({
    children,
    PrimaryAppBarProps,
}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.appHeader}>
                <PrimaryAppBar AppBarProps={{ position: 'static' }} {...PrimaryAppBarProps} />
            </div>
            <main className={classes.mainArea}>
                <div className={classes.toolbarSpacing} />
                <div className={classes.toolbarSpacing} />
                <content className={classes.contentArea}>

                </content>
            </main>
        </div>
    );
}

export default PrimaryLayout;