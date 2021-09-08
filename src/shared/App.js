import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login } from '../pages'

class App extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={ Home }></Route>
                <Route path="/login" component={ Login }></Route>
            </div>
        );
    }
}

export default App;
