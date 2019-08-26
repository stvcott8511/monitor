import React from 'react';
import EventsTable from '../components/Events/EventsTable';
import MasterDetailLayout from '../components/Layouts/MasterDetailLayout';

export default function Events() {
  return (
    <MasterDetailLayout>
      <EventsTable events={[
        {
          name: 'Test Event',
          date: new Date(),
          message: 'This is a test event.',
          details: 'More details would be in here and probably really large information.',
        },
      ]} />
    </MasterDetailLayout>
  );
}
