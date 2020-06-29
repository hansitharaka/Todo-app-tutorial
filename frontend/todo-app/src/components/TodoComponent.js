import React, {Component} from 'react';
import moment from 'moment';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import TodoDataService from '../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

export default class TodoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            description : 'Learn Forms Now',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();

        TodoDataService.retrieveTodo(username,this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName();

        TodoDataService.updateTodo(username, this.state.id, {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }).then( () => { this.props.history.push('/todos') } )
        //console.log(values)
    }

    validate(values) {
        let errors = {}

        if(!values.description) {
            errors.description = "Enter s Description"
        } else if(values.description.length < 5) {
            errors.description = "Enter at least 5 Characters in Description"
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date'
        }

        return errors
    }

    render() {
        let {description, targetDate} = this.state; //destructuring
        //let targetDate =  this.state.targetDate;

        return (
            <div className="container-fluid">
                <h1>Todo</h1>
                <div className='container'>
                    <Formik
                        initialValues={{description,targetDate}}
                            //use this method when the key and value are the same
                            //otherwise use this, targetDate: targetDate this is the normal method
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                        >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field clasname="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field clasname="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}