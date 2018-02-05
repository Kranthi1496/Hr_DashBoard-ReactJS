import React, {Component } from 'react';
import {
//  BrowserRouter as Router,
//  Route,
  Link
} from 'react-router-dom';
//import { browserHistory } from 'react-router';
//import  { Redirect } from 'react-router-dom';
import $ from "jquery";
 export default class Register extends Component {
   constructor(props){
     super(props);
     this.state={
      user:{ name:'',
       email:'',
       password:'',
       dob:'',
       address:''
     },
     name_error:'',
     email_error:''

     };
     this.register=this.register.bind(this);
    }
    register(e){
      e.preventDefault();
      //this.props.history.push("/login");
    var user=this.state.user;
    user.name=this.refs.name.value;
    user.email=this.refs.email.value;
    user.password=this.refs.pwd.value;
    user.dob=this.refs.dob.value;
    user.address=this.refs.address.value;
    this.setState({user:user},function(){
      console.log(this.state);
    })
    if(this.state.user.name !== '' && this.state.user.email !== '' &&
    this.state.user.password !== '' && this.state.user.dob !== '' && this.state.user.address !== ''){
      $.ajax({
            url: "http://localhost:8080/ReactApp/user/register.php",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({ 'name' :  this.state.user.name,
                                   'email':this.state.user.email,
                                   'password':this.state.user.password,
                                   'dob':this.state.user.dob,
                                   'address':this.state.user.address
                                    }),
            success: function(response) {
              var res=JSON.parse(response);
              console.log(res);
          //    var res=response;
              if(res.status === 'OK'){
                console.log("entered");

              window.location="http://localhost:3000/login";
            //    this.context.router.history.push("/login");
              }
              else if (res.status === 'FAILN') {
                this.setState({name_error:'Name-already-exists-Try-another'},function(){
                  console.log(this.state);
                });
              }
              else if (res.status === 'FAILE') {
                this.setState({email_error:'Email-already-exists-Try-another'},function(){
                  console.log(this.state);
                });
              }
              else{}
            }.bind(this),
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
     }
   }//register end
    render(){
      var x,y;
      if(this.state.email_error !==''){
        x=<span>{this.state.email_error}</span>;
      }
      if(this.state.name_error !==''){
        y=<span>{this.state.name_error}</span>;
      }
     return(
       <div>
       <nav className="navbar navbar-inverse">
        <ul className="nav navbar-nav">
         <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>

         <li><Link to="/register">Register</Link></li>
           <li><Link to="/login">Login</Link></li>

        </ul>
       </nav>
        <div className="container">
      <form onSubmit={this.register}>
      <div className="form-group">
        <label >Name:</label>
        <input type="text" className="form-control" ref="name" placeholder="Enter name" name="name" required />
        {y}
      </div>
          <div className="form-group">
            <label >Email:</label>
            <input type="email" className="form-control" ref="email" placeholder="Enter email" name="email"  required />
            {x}
          </div>
          <div className="form-group">
            <label >Password:</label>
            <input type="password" className="form-control" ref="pwd" placeholder="Enter password" name="pwd" required />
          </div>
          <div className="form-group">
            <label >Date Of Birth:</label>
            <input type="date" className="form-control" ref="dob" min="1960-01-01" max="2000-01-01" required />
          </div>
          <div className="form-group">
            <label >Address:</label>
            <input type="text" className="form-control" ref="address" placeholder="Enter address" name="address" required />
          </div>

          <button type="submit"  className="btn btn-success">Register</button>
        </form>
        </div>
</div>
      );
   }
}
