import React, { useEffect, useState } from 'react';
import EventsTable from '../components/Events/EventsTable';
import MasterDetailLayout from '../components/Layouts/MasterDetailLayout';
import { EventDto } from '../dtos/eventDtos';
import { MonitorDto } from '../dtos/monitorDtos';
import { getMonitorEvents } from '../services/monitorsService';

export interface EventsProps {
  monitor?: MonitorDto
}

/**
 * Events renders events published to a monitor.
 * 
 * @param props 
 */
export default function Events(props: EventsProps) {
  const { monitor = { monName: '' } } = props;
  const [events, setEvents] = useState<EventDto[]>([]);

  useEffect(() => {
    (async () => {
      console.log(`load events for ${monitor.monName}`);
      const result = await getMonitorEvents(monitor.monName);
      setEvents(result);
    })();
  }, [monitor.monName]);

  return (
    <MasterDetailLayout>
      <EventsTable events={events} />
    </MasterDetailLayout>
  );
}
