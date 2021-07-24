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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals