import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import React from 'react';
import { AtLeastOne } from '../../../typings/typingHelpers';

export interface TooltipIconProps extends SvgIconProps {
  IconComponent: React.ComponentType<SvgIconProps>;
  TooltipProps: AtLeastOne<TooltipProps, {
    title: Pick<TooltipProps, 'title'>
  }>;
}

const TooltipIcon: React.FunctionComponent<TooltipIconProps> = (props) => {
  const { IconComponent, TooltipProps, ...svgIconProps } = props;

  return (
    <Tooltip {...TooltipProps}>
      <IconComponent {...svgIconProps} />
    </Tooltip>
  )
}

export default TooltipIcon;