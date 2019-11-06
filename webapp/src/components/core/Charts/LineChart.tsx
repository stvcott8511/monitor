import { ChartOptions } from 'chart.js';
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

export interface LineChartProps {
  chartLabels: string[],
  data: number[],
  label: string,
  LineProps?: LinearComponentProps,
}

const LineChart: React.FunctionComponent<LineChartProps> = (props) => {
  const {
    chartLabels,
    data,
    label,
    LineProps,
  } = props;

  const {
    data: linePropsData,
    options: linePropsOptions,
    ...restOfLineProps
  } = LineProps || {};

  function buildData(canvas: HTMLElement) {
    var ctx = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, CHART_COLOR);

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');
    return {
      labels: chartLabels,
      datasets: [{
        label,
        borderColor: '#f96332',
        pointBorderColor: '#FFF',
        pointBackgroundColor: '#f96332',
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        backgroundColor: gradientFill,
        borderWidth: 2,
        data,
      }],
    };
  }

  return (
    <Line
      data={linePropsData || buildData}
      options={linePropsOptions || OPTIONS}
      {...restOfLineProps} />
  );
}

export default LineChart;