import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import VirtualizedTable, { VirtualizedTableCell } from '../Tables/VirtualizedTable';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
}));

function EventsTable(props) {
  const {
    events = [],
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VirtualizedTable
        columns={[
          {
            dataKey: 'name',
            label: 'Name',
            width: 30,
            flexGrow: 1,
          },
          {
            dataKey: 'date',
            label: 'Date',
            width: 30,
            flexGrow: 1,
            cellRenderer: ({ cellData, ...otherCellProps}) => (
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
        ]}
        rowGetter={({ index }) => events[index]}
        rowCount={events.length} />
    </div>
  );
}

export default EventsTable;