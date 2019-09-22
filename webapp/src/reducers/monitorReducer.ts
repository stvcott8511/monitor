import { INITIAL_STATE, MonitorContextState } from '../contexts/MonitorContext';

export enum MonitorContextAction {

}

export default function monitorReducer(state: MonitorContextState, action: MonitorContextAction) {
  switch (action) {
    default:
      return INITIAL_STATE;
  }
}