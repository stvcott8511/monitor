import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';

const DialogTransition = React.forwardRef<unknown, TransitionProps>(
  function DialogTransition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
)

export default DialogTransition;