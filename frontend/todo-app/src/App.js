import React, {Component} from 'react';

//import TodoApp from './components/TodoApp';
import LoginComponent from './components/Login';
import WelcomeComponent from './components/Welcome';

import {BrowserRouter as Router,Link} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import ListTodosComponent from './components/TodoList';
import FooterComponent from './components/Footer';
//import HeaderComponent from './components/Header';

import './App.css';
import AuthenticationService from "./components/AuthenticationService";

class App extends Component{
  render() {
    return (
        <div className="App">
            <Router>
                <HeaderComponent/>
                <Switch>
                    <Route exact path="/" component={LoginComponent}/>
                    <Route exact path="/login" component={LoginComponent}/>
                    <Route exact path="/welcome/:name" component={WelcomeComponent}/>
                    <Route exact path="/todos" component={ListTodosComponent}/>
                    <Route exact path="/logout" component={LogoutComponent}/>
                    <Route component={ErrorComponent}/>
                </Switch>
                <FooterComponent/>
            </Router>
        </div>
    );
  }
}

export default App;

function ErrorComponent() {
    return <div>An Error Occurred.</div>
}


//Header
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

//Logout
class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for using our application
                </div>
            </>
        )
    }
}