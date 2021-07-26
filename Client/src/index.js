import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import reducer, { initialState } from './StateReducer/Reducer';
import { StateProvider } from './StateReducer/StateProvider';
import { ContextProvider } from './VideoContext/Context';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StateProvider>,
  document.getElementById('root')
);