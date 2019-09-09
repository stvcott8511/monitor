import { MonitorDto } from '../dtos/monitorDtos';
import { EventDto, EventAlert } from '../dtos/eventDtos';

export async function getMonitors(): Promise<MonitorDto[]> {
  return Promise.resolve([{
    monName: 'Test 1',
    description: 'Test Description',
  }, {
    monName: 'Test 2',
    description: 'Test Description',
  }, {
    monName: 'Test 3',
    description: 'Test Description',
  }, {
    monName: 'Test 4',
    description: 'Test Description',
  }]);
}

export async function getMonitorEvents(monName: string): Promise<EventDto[]> {
  return Promise.resolve([
    {
      eventId: 'Event Type 1',
      linkedMon: monName,
      alert: EventAlert.LOW,
      timeStamp: new Date(),
      message: 'Event message',
      details: 'Event Type 1 detailed information. Could be stack trace.'
    },
    {
      eventId: 'Event Type 2',
      linkedMon: monName,
      alert: EventAlert.LOW,
      timeStamp: new Date(),
      message: 'Event message',
      details: 'Event Type 2 detailed information. Could be stack trace.'
    },
  ]);
}