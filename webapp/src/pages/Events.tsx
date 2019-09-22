import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import EventsTable from '../components/Events/EventsTable';
import MasterDetailLayout from '../components/Layouts/MasterDetailLayout';
import { EventDto } from '../dtos/eventDtos';
import { MonitorDto } from '../dtos/monitorDtos';
import { getMonitorEvents } from '../services/monitorsService';
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
    match,
    monitor = { monName: match.params.monitorName }
  } = props;
  const [events, setEvents] = useState<EventDto[]>([]);
  const [eventTypes, setEventTypes] = useState<{ name: string }[]>([]);

  useEffect(() => {
    (async () => {
      console.log(`load events for ${monitor.monName}`);
      const result = await getMonitorEvents(monitor.monName);
      setEvents(result);
    })();
  }, [monitor.monName]);

  useEffect(() => {
    const eventTypes = events.reduce((accumulator, current) => accumulator.add(current.eventId),
      new Set<string>(['All']));
    setEventTypes(Array.from(eventTypes)
      .map(value => ({ name: value, onClick: handleClickEventType })));
  }, [events]);

  function handleClickEventType(name: string) {
    console.log(name);
  }

  return (
    <MasterDetailLayout masterList={eventTypes}>
      <EventsTable events={events} />
    </MasterDetailLayout>
  );
}

export default Events;
