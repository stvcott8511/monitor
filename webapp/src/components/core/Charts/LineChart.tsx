import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { ChartData, ChartDataSets, ChartOptions } from 'chart.js';
import React from 'react';
import { Line, LinearComponentProps } from 'react-chartjs-2';

const CHART_COLOR = '#FFFFFF';

const OPTIONS: Readonly<ChartOptions> = Object.freeze({
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    bodySpacing: 4,
    mode: 'nearest',
    intersect: false,
    position: 'nearest',
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10
  },
  responsive: true,
  scales: {
    yAxes: [{
      display: true,
      ticks: {
        display: true
      },
      gridLines: {
        zeroLineColor: 'black',
        drawTicks: true,
        display: true,
        drawBorder: true
      }
    }],
    xAxes: [{
      display: true,
      ticks: {
        display: true
      },
      gridLines: {
        zeroLineColor: 'black',
        drawTicks: true,
        display: true,
        drawBorder: true
      }
    }]
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 }
  }
});

const BASE_DATASET_OPTIONS: ChartDataSets = Object.freeze({
  borderColor: '#F96332',
  pointBorderColor: '#FFFFFF',
  pointBackgroundColor: '#F96332',
  pointBorderWidth: 2,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 1,
  pointRadius: 4,
  fill: true,
  borderWidth: 2,
});

export type ChartDataSetsFunction = (
  canvas: HTMLElement
) => ChartDataSets;

export interface LineChartProps {
  chartLabels: string[],
  data: number[],
  dataSetOptions?: ChartDataSets | ChartDataSetsFunction,
  label: string,
  LineProps?: LinearComponentProps,
  name: string,
  options?: ChartOptions,
  TypographyProps?: Partial<TypographyProps>,
}

const LineChart: React.FunctionComponent<LineChartProps> = (props) => {
  const {
    chartLabels,
    data,
    dataSetOptions,
    label,
    name,
    options,
    TypographyProps,
  } = props;

  function buildData(canvas: HTMLElement): ChartData {
    var ctx = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80B6f4');
    gradientStroke.addColorStop(1, CHART_COLOR);

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');

    const dataSetsOptionsProp = typeof dataSetOptions === 'function'
      ? dataSetOptions(canvas)
      : dataSetOptions;

    return {
      labels: chartLabels,
      datasets: [{
        ...BASE_DATASET_OPTIONS,
        label,
        backgroundColor: gradientFill,
        data,
        ...dataSetsOptionsProp
      }],
    };
  }

  return (
    <div>
      <Typography variant="h6" {...TypographyProps}>{name}</Typography>
      <Line
        data={buildData}
        options={options || OPTIONS} />
    </div>
  );
}

export default LineChart;