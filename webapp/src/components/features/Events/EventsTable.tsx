import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import LowPriorityIcon from '@material-ui/icons/LowPriority';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';
import { EventDto, EventAlert } from '../../../dtos/eventDtos';
import VirtualizedTable, { VirtualizedTableCell } from '../../core/Tables/VirtualizedTable';
import TooltipIcon from '../../core/Icons/TooltipIcon';
import { BaseTheme } from '../../../themes/baseTheme';

const eventAlertIconComponents = (classes: Record<StyleClasses, string>) => ({
  [EventAlert.CLEAR]: () => (
    <TooltipIcon
      className={classes.infoIcon}
      IconComponent={InfoIcon}
      TooltipProps={{ title: 'Information' }} />
  ),
  [EventAlert.LOW]: () => (
    <TooltipIcon
      className={classes.lowIcon}
      IconComponent={LowPriorityIcon}
      TooltipProps={{ title: 'Low' }} />
  ),
  [EventAlert.MED]: () => (
    <TooltipIcon
      className={classes.mediumIcon}
      IconComponent={WarningIcon}
      TooltipProps={{ title: 'Medium' }} />
  ),
  [EventAlert.HIGH]: () => (
    <TooltipIcon
      className={classes.highIcon}
      IconComponent={ErrorIcon}
      TooltipProps={{ title: 'High' }} />
  ),
});

const eventColumnProps = (classes: Record<StyleClasses, string>) => ([
  {
    dataKey: 'alert',
    label: 'Severity',
    width: 20,
    flexGrow: 1,
    cellRenderer: ({ cellData, ...otherCellProps }: { cellData: EventAlert }) => {
      const Icon = eventAlertIconComponents(classes)[cellData];
      return (
        <VirtualizedTableCell
          {...otherCellProps}
          cellData={<Icon />} />
      );
    },
  },
  {
    dataKey: 'eventId',
    label: 'Type',
    width: 30,
    flexGrow: 1,
  },
  {
    dataKey: 'timeStamp',
    label: 'Date',
    width: 30,
    flexGrow: 1,
    cellRenderer: ({ cellData, ...otherCellProps }: { cellData: string | Date }) => (
      <VirtualizedTableCell
        {...otherCellProps}
        cellData={new Date(cellData).toLocaleString()} />
    ),
  },
  {
    dataKey: 'message',
    label: 'Message',
    width: 40,
    flexGrow: 2,
  },
  {
    dataKey: 'details',
    label: 'Details',
    width: 50,
    flexGrow: 3,
  },
]);

/**
 * Class names declared in useStyles.
 */
type StyleClasses = 'root' | 'infoIcon' | 'lowIcon' | 'mediumIcon' | 'highIcon';

const useStyles = makeStyles((theme: BaseTheme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  infoIcon: {
    color: theme.status.info,
  },
  lowIcon: {
    color: theme.status.low,
  },
  mediumIcon: {
    color: theme.status.medium,
  },
  highIcon: {
    color: theme.status.high,
  },
}));

export interface EventsTableProps {
  events?: EventDto[];
}

const EventsTable: React.FunctionComponent<EventsTableProps> = (props) => {
  const {
    events = [],
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <VirtualizedTable
        columns={eventColumnProps(classes)}
        rowGetter={({ index }: { index: number }) => events[index]}
        rowCount={events.length} />
    </div>
  );
}

export default EventsTable;