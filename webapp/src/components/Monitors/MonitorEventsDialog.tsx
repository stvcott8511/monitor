import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { MonitorDto } from '../../dtos/monitorDtos';
import DialogTransition from '../Animations/DialogTransition';

const useStyles = makeStyles((theme: Theme) =>
  ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

export interface MonitorEventsDialogProps {
  monitor: MonitorDto,
  onClose: () => void,
}

const MonitorEventsDialog: React.FunctionComponent<MonitorEventsDialogProps & DialogProps> = (props) => {
  const {
    monitor,
    onClose,
    ...dialogProps
  } = props;
  const classes = useStyles();
  return (
    <Dialog fullScreen TransitionComponent={DialogTransition} {...dialogProps}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {`Monitor ${monitor.monName} Events`}
          </Typography>
          <Button color="inherit" onClick={onClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  )
};

export default MonitorEventsDialog;