import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1>Hello, User!</h1>
            <p>Welcome to my first full-fledged app. This is Badunk, an event manager that I am working on. Right now, it's very simple and performs simple CRUD
                methods. Over time, I will add functionality to this app and make it into an event manager that people can hopefully use.</p>
            <h3>Things I Plan on Adding:</h3>
            <ul>
                <li>Admin/User roles added to accounts</li>
                <li>Point system for users who complete tasks on time (more points the quicker a task is completed)</li>
                <li>An attractive UI that will be fun to interact with</li>
                <li>And Much More!</li>
            </ul>
            <h3>Who Am I, Anyways?</h3>
            <p>My name is Chris Martinez. I'm an aspiring software developer who enjoys coding. I've always enjoyed programming and recently have wanted to put
                my skills to the test by creating passion projects such as this one. You can follow my activity on
                <a href="https://github.com/ifmycodecouldtalk" target="_blank"> Github</a>, 
                <a href="https://twitter.com/mycodecantalk" target="_blank"> Twitter</a>, and
                <a href="https://www.linkedin.com/in/chris-martinez-461b73226/" target="_blank"> LinkedIn</a>. Feel free to contact me for any questions!</p>
        </div>
    );
  }
}
