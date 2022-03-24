import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'


export class Create extends Component {
    static displayName = Create.name;

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            username: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getUserName();   // we populate as many state variables as we can here
    }

    async getUserName() {
        // getting the user's username
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            username: user && user.name
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async onSubmit() {
        let Name = this.state.name;
        let Description = this.state.description;
        let userName = this.state.username;
        userName = userName.substring(0, userName.indexOf("@"))
        console.log("Name: " + this.state.name + ", Description: " + this.state.description);
        await fetch(`https://badunkapi.azurewebsites.net/${userName}/objectives`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: Name,
                description: Description
            })
        }).then(response => console.log("Success"));
    }


    render() {
        return (
            <div>
                <h1>Create Page</h1>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Name:
                        <input
                            name="name"
                            type="text"
                            onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <input
                            name="description"
                            type="text"
                            onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}
