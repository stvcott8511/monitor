/**
 * The severity level of the Event logged.
 */
export enum EventAlert {
  CLEAR = 'CLEAR',
  LOW = 'LOW',
  MED = 'MED',
  HIGH = 'HIGH',
}

export interface EventDto {
  /**
   * Event ID acts more like an event type specification.
   */
  eventId: string;
  linkedMon: string;
  alert: EventAlert;
  /**
   * The date and time the event was logged.
   */
  timeStamp?: string | Date;
  message?: string;
  details?: string;
}