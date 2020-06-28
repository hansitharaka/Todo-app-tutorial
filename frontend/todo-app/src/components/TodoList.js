import React, {Component} from 'react';
import TodoDataService from '../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

export default class ListTodosComponent extends Component {
    constructor(props) {
        super(props);

        //when u calling an API better not to do the initial API call directly in the constructor
        //because the state wouldn't be initialized until the API call is completed
        //so we initialize it to be empty
        this.state = {todos : []}
    }

    //this method get called when the component loaded for the first time
    //and shown on the browser
    componentDidMount() {
        //get the current logged in user's name
        let username = AuthenticationService.getLoggedInUserName();

        TodoDataService.retrieveAllTodos(username)
            .then(   //if it is successful
                response => {
                    //console.log(response)
                    this.setState({todos : response.data})
                }
            )
    }

    render() {
        return(
            <div>
                <h1>My Todo List</h1>
                <div className="container">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Completed</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}