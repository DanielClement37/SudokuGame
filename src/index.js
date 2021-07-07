import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import {StoreProvider} from './store/Store';
import {initialState, gameBoardReducer} from './store/GameReducer';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider initialState={initialState} reducer={gameBoardReducer}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


