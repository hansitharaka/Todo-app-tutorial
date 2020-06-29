import React, {Component} from 'react';
import TodoDataService from '../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import TodoComponent from './TodoComponent';

export default class ListTodosComponent extends Component {
    constructor(props) {
        super(props);

        //when u calling an API better not to do the initial API call directly in the constructor
        //because the state wouldn't be initialized until the API call is completed
        //so we initialize it to be empty
        this.state = {
            todos : [],
            message: null
        }

        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        //this.refreshTodos = this.refreshTodos(this);
    }

    //this method get called when the component loaded for the first time
    //and shown on the browser
    componentDidMount() {
        this.refreshTodos();
        console.log(this.state);
    }

    //method to refresh page
    refreshTodos() {
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

    //delete method
    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        //console.log(id, username);
        TodoDataService.deleteTodo(username,id)
            .then(
                response => {
                    this.setState({message: `Item ${id} has been deleted successfully`});
                    this.refreshTodos();
                }
            )
    }

    //update method
    updateTodoClicked(id) {
        console.log('update'+id)
        this.props.history.push(`/todos/${id}`)
        ///todos/${id}
        // let username = AuthenticationService.getLoggedInUserName();
        // //console.log(id, username);
        // TodoDataService.deleteTodo(username,id)
        //     .then(
        //         response => {
        //             this.setState({message: `Item ${id} has been deleted successfully`});
        //             this.refreshTodos();
        //         }
        //     )
    }

    render() {
        return(
            <div className="container-fluid mx-auto px-5 py-5">
                <div className="row pb-4">
                    <h1 >My Todo List</h1>
                </div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="row">
                    <table className="table table-striped w-100">
                        <thead>
                            <tr>
                                <th className="text-left">Description</th>
                                <th className="text-left">Target Date</th>
                                <th className="text-left">is Completed?</th>
                                <th className="text-center">Update</th>
                                <th className="text-center">Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td className="text-left">{todo.description}</td>
                                        <td className="text-left">{todo.targetDate.toString()}</td>
                                        <td className="text-left">{todo.done.toString()}</td>
                                        <td><button className="btn btn-success"
                                                    onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-danger"
                                                    onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
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