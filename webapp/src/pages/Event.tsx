import Grid from '@material-ui/core/Grid';
import { ChartOptions } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { RouteComponentProps } from 'react-router-dom';

const chartColor = '#FFFFFF';

const data = (canvas: HTMLElement) => {
    var ctx = (canvas as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);

    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    gradientFill.addColorStop(1, 'rgba(249, 99, 59, 0.40)');
    return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Active Users',
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
            data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]
        }]
    }
};
const options: ChartOptions = {
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
};

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

    return (
        <Grid container>
            <Grid item xs={3}>
                <Line data={data} options={options} />
            </Grid>
            <Grid item xs={9}>

            </Grid>
        </Grid>
    );
}

export default Event;