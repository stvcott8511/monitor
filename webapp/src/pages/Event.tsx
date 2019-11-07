import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LineChart from '../components/core/Charts/LineChart';

const CHART_LABELS = Object.freeze(['Jan', 'Feb', 'Mar', 'Apr', 'May',
  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

const DATASET_OPTIONS = Object.freeze({
  high: {
    baseColor: '#ed1818',
    gradientLowColor: 'rgba(128, 182, 244, 0)',
    gradientHighColor: 'rgba(237, 24, 24, 0.40)',
  },
  low: {
    baseColor: '#f0d213',
    gradientLowColor: 'rgba(128, 182, 244, 0)',
    gradientHighColor: 'rgba(240, 210, 19, 0.40)',
  },
  info: {
    baseColor: '#1781eb',
    gradientLowColor: 'rgba(128, 182, 244, 0)',
    gradientHighColor: 'rgba(23, 129, 235, 0.40)',
  },
});

export interface EventRouteParams {
  monitorName: string;
  eventType: string;
}

export interface EventProps extends RouteComponentProps<EventRouteParams> {

}

const Event: React.FunctionComponent<EventProps> = (props) => {
  const { match } = props;
  const { eventType } = match.params;

  console.log(eventType);

  function buildDataSetOptions(severityLevel: 'high' | 'low' | 'info') {
    return (canvas: HTMLElement) => {
      var ctx = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, DATASET_OPTIONS[severityLevel].gradientLowColor);
      gradientFill.addColorStop(1, DATASET_OPTIONS[severityLevel].gradientHighColor);
      return ({
        backgroundColor: gradientFill,
        borderColor: DATASET_OPTIONS[severityLevel].baseColor,
        pointBackgroundColor: DATASET_OPTIONS[severityLevel].baseColor,
      });
    };
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <div>
          <Typography variant="h6">High</Typography>
          <LineChart
            label="High Severity"
            chartLabels={[...CHART_LABELS]}
            data={[542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]}
            dataSetOptions={buildDataSetOptions('high')} />
        </div>
        <div>
          <Typography variant="h6">Medium</Typography>
          <LineChart
            label="Medium Severity"
            chartLabels={[...CHART_LABELS]}
            data={[542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]} />
        </div>
        <div>
          <Typography variant="h6">Low</Typography>
          <LineChart
            label="Low Severity"
            chartLabels={[...CHART_LABELS]}
            data={[542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]}
            dataSetOptions={buildDataSetOptions('low')} />
        </div>
        <div>
          <Typography variant="h6">Information</Typography>
          <LineChart
            label="Information"
            chartLabels={[...CHART_LABELS]}
            data={[542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]}
            dataSetOptions={buildDataSetOptions('info')} />
        </div>
      </Grid>
      <Grid item xs={9}>

      </Grid>
    </Grid>
  );
}

export default Event;