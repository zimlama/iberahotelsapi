import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./Redux/store/index";
import { ChakraProvider } from '@chakra-ui/react'
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-elskv0bc6witw5r1.us.auth0.com"
      clientId="LIsxhiAwSGUFCeFtzSnoEBUVb9yVvGkh"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ChakraProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </Auth0Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
