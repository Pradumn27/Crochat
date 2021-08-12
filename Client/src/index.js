import React from 'react';
import ReactDOM from 'react-dom';
import First from './First/First';
import "./index.css"
import reducer, { initialState } from './StateReducer/Reducer';
import { StateProvider } from './StateReducer/StateProvider';
import { ContextProvider } from './VideoContext/Context';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <ContextProvider>
      <First />
    </ContextProvider>
  </StateProvider>,
  document.getElementById('root')
);