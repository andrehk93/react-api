import React from 'react';
import { render } from 'react-dom';
import './_manifest.scss';
import { BrowserRouter } from "react-router-dom";
import Site from "./components/site/Site";
import Dashboard from "./layouts/dashboard/Dashboard";

const App = () => {
    return (
        <Site>
            <Dashboard/>
        </Site>
    );
};

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);