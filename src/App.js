import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route
  //Link
} from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Admin from './Components/Admin/Admin';
import Hr from './Components/Hr/Hr';
import TaskList from './Components/Task/TaskList';
import AddTask from './Components/Task/AddTask';
class App extends Component {
  render() {
    return (
      <div >
      <Router>
      <div>


          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
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