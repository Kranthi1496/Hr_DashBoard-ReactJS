import React, {Component } from 'react';
import {
  Link
} from 'react-router-dom';
class Home extends Component {
  constructor(props){
    super(props);
     this.state={

     };

   }

  render(){
    return(
      <div>
       <nav className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
         <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
         <li><Link to="/register">Register</Link></li>
         <li><Link to="/login">Login</Link></li>
       </ul>
      </nav>

     <div className="jumbotron ">
      <h1 className="center">Employee Connect</h1>
     </div>
    </div>
    );
  }
}

export default Home;
