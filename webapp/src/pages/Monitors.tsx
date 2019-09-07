import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { History } from 'history';
import React from 'react';
import { match as Match, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid } from 'react-window';
import PrimaryLayout from '../components/Layouts/PrimaryLayout';
import { MonitorDto } from '../dtos/monitorDtos';
import Events from './Events';

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
  match: Match<{}>;
  history: History;
}

interface MonitorCellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}

function composeMonitorCell({ monitorList, match, history }: ComposeMonitorCellProps) {
  return function (props: MonitorCellProps) {
    const { columnIndex, rowIndex, style } = props;
    const index = ((rowIndex + 1) * (columnIndex + 1)) - 1;
    const classes = useStyles(props);
    const monitor = monitorList[index];

    function handleClickCard(monitor: MonitorDto) {
      history.push(`/monitors/${monitor.monName}/events`);
    }

    return monitor
      ? (
        <div className={classes.cell} style={style}>
          <Card
            key={`monitor_list_row_${rowIndex}_column_${columnIndex}`}
            className={classes.card}
            elevation={5}>
            <CardActionArea onClick={() => handleClickCard(monitor)}>
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

export interface MonitorsProps extends RouteComponentProps {

}

/**
 * Monitors renders a UI control of the available monitors in the system. 
 * 
 * @param props 
 */
const Monitors: React.FunctionComponent<MonitorsProps> = (props) => {
  const {
    history,
    match,
  } = props;
  const classes = useStyles(props);
  const [monitors/*, setMonitors*/] = React.useState<MonitorDto[]>([{
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
    <PrimaryLayout PrimaryAppBarProps={{ title: 'Monitor' }}>
      <Route path={match.url} exact render={() => (
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
                        {composeMonitorCell({ monitorList: monitors, match, history })}
                      </Grid>
                    )
                  }
                }
              </AutoSizer>
            </Typography>
          </div>
        </div>
      )} />
      <Route path={`${match.path}/:monitorName/events`} component={Events} />
    </PrimaryLayout>
  );
}

export default withRouter(Monitors);