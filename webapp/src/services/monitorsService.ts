import { EventAlert, EventDto } from '../dtos/eventDtos';
import { MonitorDto } from '../dtos/monitorDtos';

const MOCK_MONITORS = Object.freeze<MonitorDto[]>([
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

function mockEvents(monitorName: string): EventDto[] {
  return ([
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

export async function getMonitors(): Promise<MonitorDto[]> {
  return Promise.resolve([...MOCK_MONITORS]);
}

export async function getMonitor(monitorName: string): Promise<MonitorDto | undefined> {
  return Promise.resolve(MOCK_MONITORS.find(m => m.monName === monitorName));
}

export async function getMonitorEvents(monitorName: string): Promise<EventDto[]> {
  return Promise.resolve(mockEvents(monitorName));
}

export async function getMonitorEventsByType(monitorName: string, type: string): Promise<EventDto[]> {
  return Promise.resolve([]);
}

export async function getMonitorEventTypes(monitorName: string): Promise<Set<string>> {
  return Promise.resolve(mockEvents(monitorName)
    .reduce((accumulator, current) => accumulator.add(current.eventId),
      new Set<string>()));
}