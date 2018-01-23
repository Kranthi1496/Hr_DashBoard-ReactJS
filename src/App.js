import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
  //Link
} from 'react-router-dom';
//import Header from './Header';
import Home from './Components/Home';
//import Contact from './Contact';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import AssignRole from './Components/AssignRole';
import Hr from './Components/Hr';
import TaskList from './Components/TaskList';
import AddTask from './Components/AddTask';
class App extends Component {
  render() {
    return (
      <div >
      <Router>
      <div >


          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/role" component={AssignRole} />
          <Route path="/hr" component={Hr} />
          <Route path="/tasklist" component={TaskList} />
          <Route path="/addtask" component={AddTask} />
      </div>
      </Router>

      </div>
    );
  }
}

export default App;
