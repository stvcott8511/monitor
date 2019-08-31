import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';

const COLUMN_WIDTH = 500;
const ROW_HEIGHT = 200;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  cell: {
    display: 'flex',
  },
  card: {
    display: 'flex',
    flex: 1,
    margin: 10,
  },
  gridContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: '1 1 auto',
  },
  grid: {
    '& div': {
      position: 'relative',
    }
  }
});

function composeMonitorCell(monitorList: MonitorRecord[]) {
  return function (props: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) {
    const { columnIndex, rowIndex, style } = props;
    const index = ((rowIndex + 1) * (columnIndex + 1)) - 1;
    const classes = useStyles(props);
    return index < monitorList.length
      ? (
        <div className={classes.cell} style={style}>
          <Card
            key={`monitor_list_row_${rowIndex}_column_${columnIndex}`}
            className={classes.card}
            elevation={5}>
            {monitorList[index].monName}
          </Card>
        </div>
      )
      : null;
  }
}

export interface MonitorRecord {
  monName: string;
  description: string;
  timeout?: number;
}

export interface MonitorsProps {

}

const Monitors: React.FunctionComponent<MonitorsProps> = (props) => {
  const classes = useStyles(props);
  const [monitors/*, setMonitors*/] = React.useState<MonitorRecord[]>([{
    monName: 'Test 1',
    description: 'Test Description',
  }, {
    monName: 'Test 2',
    description: 'Test Description',
  }, {
    monName: 'Test 3',
    description: 'Test Description',
  }, {
    monName: 'Test 4',
    description: 'Test Description',
  }]);
  const columnCount = (width: number) => Math.floor(width / COLUMN_WIDTH);
  const rowCount = (width: number) => Math.ceil(monitors.length / Math.floor(width / COLUMN_WIDTH));
  return (
    <div className={classes.root}>
      <div className={classes.gridContainer}>
        <AutoSizer>
          {
            ({ height, width }) => {
              return (
                <Grid
                  className={classes.grid}
                  columnCount={columnCount(width)}
                  columnWidth={Math.floor(width / columnCount(width))}
                  height={height}
                  width={width}
                  rowCount={rowCount(width)}
                  rowHeight={ROW_HEIGHT}>
                  {composeMonitorCell(monitors)}
                </Grid>
              )
            }
          }
        </AutoSizer>
      </div>
    </div>
  );
}

export default Monitors;