import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from '../shared/App';
import Header from "../pages/layout/Header";

const Root = () => {
    return (
        <BrowserRouter>
            <Header/>
            <App/>
        </BrowserRouter>
    )
}


export default Root;
