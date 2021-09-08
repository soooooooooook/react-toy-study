import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, SignUp } from '../pages'

class App extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={ Home }></Route>
                <Route path="/login" component={ Login }></Route>
                <Route path="/sign-up" component={ SignUp }></Route>
            </div>
        );
    }
}

export default App;
