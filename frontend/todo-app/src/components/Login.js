import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthenticationService from './AuthenticationService';


export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'in28min',
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        console.log(this.state);
        this.setState({
                [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        // //in28min,dummy
        // if(this.state.username === 'in28min' && this.state.password === 'dummy') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //this.setState({showSuccessMsg: true, hasLoginFailed: false})
        // } else {
        //     this.setState({showSuccessMsg: false, hasLoginFailed: true})
        // }

        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then( () => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.props.history.push(`/welcome/${this.state.username}`)
            }) .catch( () => {
            this.setState({showSuccessMsg: false, hasLoginFailed: true})
        })
    }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {/*<ShowLoginSuccessMsg showSuccessMsg={this.state.showSuccessMsg}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMsg && <div>Login Successful</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

/*function ShowInvalidCredentials(props) {
    if(props.hasLoginFailed) {
        return (<div>Invalid Credentials</div>)
    }
    return null
}

function ShowLoginSuccessMsg(props) {
    if(props.showSuccessMsg) {
        return (<div>Login Successful</div>)
    }
    return null
}*/