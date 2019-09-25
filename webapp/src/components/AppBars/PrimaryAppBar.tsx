import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import React from 'react';
import TabNavigation, { TabNavigationProps } from '../Navigation/TabNavigation';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    // flexGrow: 1,
  },
  tabs: {
    flexGrow: 1,
  },
}));

export interface PrimaryAppBarProps {
  hideNavigationButton?: boolean;
  NavigationIconComponent?: React.ComponentType<SvgIconProps>;
  NavigationIconProps?: Partial<SvgIconProps>;
  onClickNavigation?: () => void;
  TabNavigationProps?: TabNavigationProps;
  tabPropsList?: [];
  title?: string;
  TitleAppBarProps?: Partial<AppBarProps>;
  TitleToolbarProps?: Partial<ToolbarProps>;
  TypographyProps?: Partial<TypographyProps>;
}

const PrimaryAppBar: React.FunctionComponent<PrimaryAppBarProps> = (props) => {
  const {
    hideNavigationButton,
    NavigationIconComponent = TrackChangesIcon,
    NavigationIconProps,
    onClickNavigation = () => { },
    TabNavigationProps,
    tabPropsList,
    title,
    TitleAppBarProps,
    TitleToolbarProps,
    TypographyProps,
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" {...TitleAppBarProps}>
        <Toolbar {...TitleToolbarProps}>
          {
            !hideNavigationButton &&
            (
              <IconButton onClick={onClickNavigation} color="inherit">
                <NavigationIconComponent {...NavigationIconProps} />
              </IconButton>
            )
          }
          <Typography
            variant="h6"
            className={classes.title}
            {...TypographyProps}>
            {title}
          </Typography>
          <TabNavigation
            tabPropsList={tabPropsList || []}
            {...TabNavigationProps} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PrimaryAppBar;