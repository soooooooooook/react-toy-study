import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById("root")
);
reportWebVitals();
