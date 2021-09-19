import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, SignUp, MemberControl } from '../pages'

class App extends Component {
    render() {
        return (
            <div>
                <Login></Login>
                {/*<Route exact path="/" component={ Home }></Route>*/}
                {/*<Route path="/login" component={ Login }></Route>*/}
                {/*<Route path="/sign-up" component={ SignUp }></Route>*/}
                {/*<Route path="/Member-control" component={ MemberControl }></Route>*/}
            </div>
        );
    }
}

export default App;
