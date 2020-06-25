import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Link, Router} from 'react-router-dom';

export default class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="#" className="navbar-brand">in28Minutes</a></div>
                    <ul className="navbar-nav">
                        <li><Link to={'/welcome/in28min'} className="nav-link">Home</Link></li>
                        <li><Link to={'/todos'} className="nav-link">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link to={'/login'} className="nav-link">Login</Link></li>
                        <li><Link to={'/logout'} className="nav-link">Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}