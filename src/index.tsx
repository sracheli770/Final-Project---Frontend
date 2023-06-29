import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './themed-bootstrap.scss'
import { DarkModeContextProvider } from './context/darkModeContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DarkModeContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </DarkModeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
