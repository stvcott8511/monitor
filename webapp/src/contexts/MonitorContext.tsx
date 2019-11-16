import React from 'react';

export interface MonitorContextState {

}

export const INITIAL_STATE = Object.freeze<MonitorContextState>({

});

const MonitorContext = React.createContext<MonitorContextState | undefined | null>(null);

export default MonitorContext;