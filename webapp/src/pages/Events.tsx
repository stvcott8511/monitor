import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import MasterDetailLayout, { MasterListConfig } from '../components/core/Layouts/MasterDetailLayout';
import EventsTable from '../components/features/Events/EventsTable';
import { EventDto } from '../dtos/eventDtos';
import { MonitorDto } from '../dtos/monitorDtos';
import { getMonitorEvents, getMonitorEventTypes } from '../services/monitorsService';
import { getParams } from '../utilities/router';
import Event from './Event';
import { MonitorsRouteParams } from './Monitors';

const EVENTS_ROUTE_PROPS = Object.freeze({
  path: '/monitors/:monitorName/events/:eventType',
});

export interface EventsRouteParams {
  eventType: string;
}

export interface EventsProps extends RouteComponentProps<MonitorsRouteParams> {
  monitor?: MonitorDto
}

/**
 * Events renders events published to a monitor.
 * 
 * @param props 
 */
const Events: React.FunctionComponent<EventsProps> = (props) => {
  const {
    history,
    location,
    match,
    monitor = { monName: match.params.monitorName }
  } = props;
  const [events, setEvents] = useState<EventDto[]>([]);
  const [eventTypes, setEventTypes] = useState<MasterListConfig[]>([]);

  useEffect(() => {
    let params = getParams<EventsRouteParams>(location.pathname, EVENTS_ROUTE_PROPS);
    !params.eventType
      && (
        async () => {
          console.log(`load events for ${monitor.monName}`);
          const result = await getMonitorEvents(monitor.monName);
          setEvents(result);
        }
      )();
  }, [monitor.monName, location.pathname]);

  useEffect(() => {
    function handleClickEventType(name: string) {
      name !== 'All' && history.push(`${match.url}/${name}`);
    }

    (async () => {
      const result = await getMonitorEventTypes(monitor.monName);
      const eventTypes = ['All', ...Array.from<string>(result)];
      setEventTypes(eventTypes.map(value => ({ name: value, onClick: handleClickEventType })));
    })();
  }, [monitor.monName, history, match]);

  return (
    <MasterDetailLayout masterList={eventTypes}>
      <Switch>
        <Route
          path={match.path}
          exact
          render={() => <EventsTable events={events} />} />
        <Route
          path={`${match.path}/:eventType`}
          render={routeProps => <Event monitor={monitor} {...routeProps} />} />
      </Switch>
    </MasterDetailLayout>
  );
}

export default Events;
