import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import EventsTable from '../components/features/Events/EventsTable';
import MasterDetailLayout, { MasterListConfig } from '../components/core/Layouts/MasterDetailLayout';
import { EventDto } from '../dtos/eventDtos';
import { MonitorDto } from '../dtos/monitorDtos';
import { getMonitorEvents, getMonitorEventTypes } from '../services/monitorsService';
import Event from './Event';
import { MonitorsRouteParams } from './Monitors';

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
    match,
    monitor = { monName: match.params.monitorName }
  } = props;
  const [events, setEvents] = useState<EventDto[]>([]);
  const [eventTypes, setEventTypes] = useState<MasterListConfig[]>([]);

  useEffect(() => {
    function handleClickEventType(name: string) {
      name !== 'All' && history.push(`${match.url}/${name}`);
    }

    (async () => {
      console.log(`load events for ${monitor.monName}`);
      const result = await getMonitorEvents(monitor.monName);
      setEvents(result);
    })();
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
