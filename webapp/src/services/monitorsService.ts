import { MonitorDto } from '../dtos/monitorDtos';
import { EventDto, EventAlert } from '../dtos/eventDtos';

const MOCK = Object.freeze<MonitorDto[]>([
  {
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
  }
]);

export async function getMonitors(): Promise<MonitorDto[]> {
  return Promise.resolve([...MOCK]);
}

export async function getMonitor(monitorName: string): Promise<MonitorDto | undefined> {
  return Promise.resolve(MOCK.find(m => m.monName === monitorName));
}

export async function getMonitorEvents(monitorName: string): Promise<EventDto[]> {
  return Promise.resolve([
    {
      eventId: 'Event Type 1',
      linkedMon: monitorName,
      alert: EventAlert.LOW,
      timeStamp: new Date(),
      message: 'Event message',
      details: 'Event Type 1 detailed information. Could be stack trace.'
    },
    {
      eventId: 'Event Type 2',
      linkedMon: monitorName,
      alert: EventAlert.HIGH,
      timeStamp: new Date(),
      message: 'Event message',
      details: 'Event Type 2 detailed information. Could be stack trace.'
    },
    {
      eventId: 'Event Type 3',
      linkedMon: monitorName,
      alert: EventAlert.MED,
      timeStamp: new Date(),
      message: 'Event message',
      details: 'Event Type 3 detailed information. Could be stack trace.'
    },
    {
      eventId: 'Event Type 4',
      linkedMon: monitorName,
      alert: EventAlert.CLEAR,
      timeStamp: new Date(),
      message: 'Event message',
      details: 'Event Type 4 detailed information. Could be stack trace.'
    }
  ]);
}