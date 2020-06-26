import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import AuthenticationService from "./AuthenticationService";

class HeaderComponent extends Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://www.google.lk/" className="navbar-brand">in28Minutes</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link to={'/welcome/in28min'} className="nav-link">Home</Link></li>}
                        {isUserLoggedIn && <li><Link to={'/todos'} className="nav-link">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link to={'/login'} className="nav-link">Login</Link></li>}
                        {isUserLoggedIn && <li><Link to={'/logout'} className="nav-link" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);



//To ensure that header menus are updated whenever the router is called we need to wrap HeaderComponent
// with a call to with Router.