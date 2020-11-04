import React from 'react';
import { render } from 'react-dom';
import App from './App';

import { initializeFirebase } from './FCM/fcm';
import { registerServiceWorker }from './FCM/register-sw'

initializeFirebase();
registerServiceWorker();

render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  