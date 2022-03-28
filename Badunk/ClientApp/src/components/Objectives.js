import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService'


export class Objectives extends Component {
    static displayName = Objectives.name;

    constructor(props) {
        super(props);
        this.state = {
            apiUsers: [],       // to get the list of users
            apiObjectives: [],  // to get the user's objectives
            loading: true,      // rendering or loading
            userName: null,      // getting the currently logged in user's name
            match: false,       // to check if the user exists already or not
            userNameCut: null   // the user's name without the email extension
        };
    }

    static sayHello(userID, userName) {
        let confirmDelete = window.confirm("Are you sure you would like to delete this objective?");
        if (confirmDelete) {
            const url = "https://badunkapi.azurewebsites.net/" + userName + "/objectives/" + userID;
            fetch(url, {
                method: 'delete'
            });
            setTimeout(function () { window.location.reload(true) }, 500);
        }
    }

    /* Steps to Complete */
    // 1) get the currently logged in user's username
    // 2) parse the user info to cut off the email domain
    // 3) check to see if the user exists in the BadunkAPI database
    // *) if not, send a POST request to create the user
    // 4) once the user is created, show the user in the table

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // 5) fetch the tasks for the currently logged in user and display them on the table
    // 6) create buttons and corresponding pages to create and delete tasks (editing will come later)
    // 7) clean up unnecessary pages and spoof up the main pages with css bootstrap and all that jazz
    // 8) identity scaffolding to change the default identity login pages?

    componentDidMount() {
        this.populateState();   // we populate as many state variables as we can here
    }

    async populateState() {
        // getting the user's username
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
        let username = this.state.userName;

        // parsing the user's name to cut off the email extension
        this.setState({ userNameCut: username.substring(0, username.indexOf("@")) });

        // check to see if the user exists or not
        const userList = await fetch('https://badunkapi.azurewebsites.net/');
        let listOfUsers = await userList.json();
        listOfUsers.map(user =>
            {
                if (this.state.userNameCut == user.name) this.setState({ match: true });
            }
        );

        // if the user does not exist, create a new user
        if (!this.state.match) {
            fetch('https://badunkapi.azurewebsites.net/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.userNameCut
                })
            });
            alert("user created");
            console.log(this.state.match);
        }

        // get the user's objectives
        const short = this.state.userNameCut;
        const token = await authService.getAccessToken();
        const response = await fetch(`https://badunkapi.azurewebsites.net/${short}/objectives`, {
            headers: !token ? {} : {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        this.setState({ apiObjectives: data, loading: false });
    }

    static renderUsersTable(apiObjectives, userName) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {apiObjectives.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.description}</td>
                            <td>
                                <button className="btn btn-primary" type="button">EDIT</button>
                                <button className="btn btn-danger" type="button" onClick={() => Objectives.sayHello(user.id, userName)}>DELETE</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Objectives.renderUsersTable(this.state.apiObjectives, this.state.userNameCut);

        return (
            <div>
                <h1 id="tabelLabel" >Users Table</h1>
                <p>Testing to get all users from BadunkAPI.</p>
                <a class="btn btn-success" href="/create" role="button">Create</a>
                {contents}
            </div>
        );
    }
}