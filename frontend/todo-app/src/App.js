import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

//import TodoApp from './components/TodoApp';
import LoginComponent from './components/Login';
import WelcomeComponent from './components/Welcome';
import ListTodosComponent from './components/TodoList';
import FooterComponent from './components/Footer';
import HeaderComponent from './components/Header';
import ErrorComponent from './components/ErrorComponent';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import LogoutComponent from './components/Logout';

import './App.css';

class App extends Component{
  render() {
    return (
        <div className="App">
            <Router>
                <HeaderComponent/>
                <Switch>
                    <Route exact path="/" component={LoginComponent}/>
                    <Route exact path="/login" component={LoginComponent}/>
                    <AuthenticatedRoute exact path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute exact path="/todos" component={ListTodosComponent}/>
                    <AuthenticatedRoute Route exact path="/logout" component={LogoutComponent}/>
                    <Route component={ErrorComponent}/>
                </Switch>
                <FooterComponent/>
            </Router>
        </div>
    );
  }
}

export default App;