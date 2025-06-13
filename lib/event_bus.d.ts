
export type EventPriority = 'VeryLow' | 'Low' | 'Normal' | 'High' | 'VeryHigh'

export interface EventEntry {
  data: any;
  isCanceled: boolean;
}

export interface EventListenerEntry {
  listenerFunction: (event: EventEntry) => void;
  priority: EventPriority;
}
