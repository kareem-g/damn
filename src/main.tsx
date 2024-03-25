import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {persistor, store} from 'store';
import {PersistGate} from 'redux-persist/integration/react';
import {changeCurrentTab} from 'slices/appFunctionality.slice.ts';
import {Tabs} from 'models/tabs.ts';
import 'leaflet/dist/leaflet.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import {getCurrentTheme, loadTheme} from 'utils/getCurrentTheme.ts';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(changeCurrentTab(Tabs.TOUR_HOME));
window.addEventListener('DOMContentLoaded', () => {
  loadTheme(getCurrentTheme());
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {() => (
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        )}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
