import Grid from '@material-ui/core/Grid';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LineChart from '../components/core/Charts/LineChart';

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
                <LineChart
                    label="Active Users"
                    chartLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                    data={[542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630]} />
            </Grid>
            <Grid item xs={9}>

            </Grid>
        </Grid>
    );
}

export default Event;