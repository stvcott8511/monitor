import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import { MonitorDto } from '../../dtos/monitorDtos';
import { getMonitors } from '../../services/monitorsService';

const COLUMN_WIDTH = 400;
const ROW_HEIGHT = 150;

const useStyles = makeStyles((theme: Theme) => ({
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
    margin: theme.spacing(2),
  },
  gridContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    flex: '1 1 auto',
  },
  grid: {
    '& div': {
      position: 'relative',
    }
  },
  typography: {
    flex: '1 1 auto',
  },
}));

interface ComposeMonitorCellProps {
  monitorList: MonitorDto[];
  onClickCell: (monitor: MonitorDto) => void;
}

interface MonitorCellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}

function composeMonitorCell({ monitorList, onClickCell }: ComposeMonitorCellProps) {
  return function (props: MonitorCellProps) {
    const { columnIndex, rowIndex, style } = props;
    const index = ((rowIndex + 1) * (columnIndex + 1)) - 1;
    const classes = useStyles(props);
    const monitor = monitorList[index];

    return monitor
      ? (
        <div className={classes.cell} style={style}>
          <Card
            key={`monitor_list_row_${rowIndex}_column_${columnIndex}`}
            className={classes.card}
            elevation={5}>
            <CardActionArea onClick={() => onClickCell(monitor)}>
              <CardContent>
                <Typography variant="h5" gutterBottom component="h5">
                  {monitor.monName}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {monitor.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )
      : null;
  }
}

interface MonitorsGridProps extends RouteComponentProps {
  onSelectMonitor: (monitor: MonitorDto) => void;
}

const MonitorsGrid: React.FunctionComponent<MonitorsGridProps> = (props) => {
  const {
    onSelectMonitor = () => { },
  } = props;
  const classes = useStyles(props);
  const [monitors, setMonitors] = React.useState<MonitorDto[]>([]);
  const columnCount = (width: number) => Math.floor(width / COLUMN_WIDTH);
  const rowCount = (width: number) => Math.ceil(monitors.length / Math.floor(width / COLUMN_WIDTH));

  useEffect(() => {
    async function fetchMonitors() {
      // Get monitors from service
      console.log('load monitors');
      const result = await getMonitors();
      setMonitors(result);
    }
    fetchMonitors();
  }, []);

  function handleClickCell(monitor: MonitorDto) {
    onSelectMonitor(monitor);
  }

  return (
    <div className={classes.root}>
      <div className={classes.gridContainer}>
        <Typography component="div" className={classes.typography}>
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
                    {composeMonitorCell({ monitorList: monitors, onClickCell: handleClickCell })}
                  </Grid>
                )
              }
            }
          </AutoSizer>
        </Typography>
      </div>
    </div>
  );
}

export default MonitorsGrid;