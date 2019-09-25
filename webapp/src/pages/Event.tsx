import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface EventProps extends RouteComponentProps {

}

const Event: React.FunctionComponent<EventProps> = (props) => {
    return (
        <div>Hello World</div>
    );
}

export default Event;