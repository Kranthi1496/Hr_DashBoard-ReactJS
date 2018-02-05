import React, {Component } from 'react';
import {
//  BrowserRouter as Router,
//  Route,
  Link
} from 'react-router-dom';
import $ from "jquery";
 export default class Login extends Component {
   constructor(props){
     super(props);
     this.state={
      user:{
       email:'',
       password:''
     },
     user_error:'',
     email_error:''
     };
     this.login=this.login.bind(this);
    }
    login(e){
      e.preventDefault();
    var user=this.state.user;
    user.email=this.refs.email.value;
    user.password=this.refs.pwd.value;
    this.setState({user:user},function(){
      console.log(this.state);
    })
    if(this.state.user.email !== '' && this.state.user.password !== ''){
      $.ajax({
            url: "http://localhost:8080/ReactApp/user/login.php",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                                   'email':this.state.user.email,
                                   'password':this.state.user.password,
                                    }),
            success: function(response) {
              //console.log(response);
              var res=JSON.parse(response);
             console.log(res);
          //    var res=response;
              if(res.status === 'OK'){
                 var obj=res.data[0];
                 console.log("success");
                 localStorage.setItem("id",obj.id);

                     if(obj.name === 'admin'){
                      window.location="http://localhost:3000/admin";
                      }
                     else{
                        if(res.role[0]){
                        var roleobj=res.role[0];
                        console.log(roleobj);
                          if(roleobj.designation === 'HR'){
                          window.location="http://localhost:3000/hr";
                          }
                          else{
                           window.location="http://localhost:3000/tasklist";
                           }

                         }
                        else{
                         window.location="http://localhost:3000/tasklist";
                         }
                      }

              }
              else if (res.status === 'email-and-password-not-matched') {
               this.setState({email_error:'email-and-password-not-matched'},function(){
                 console.log(this.state);
               });
              }
              else if (res.status === 'User-not-exists') {
               this.setState({user_error:'User-not-exists'},function(){
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
      if(this.state.user_error !==''){
        y=<span>{this.state.user_error}</span>;
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
      <form onSubmit={this.login}>

          <div className="form-group">
            <label >Email:</label>
            <input type="email" className="form-control" ref="email" placeholder="Enter email" name="email"  required />
            <p>{x}</p>
          </div>
          <div className="form-group">
            <label >Password:</label>
            <input type="password" className="form-control" ref="pwd" placeholder="Enter password" name="pwd" required />
          </div>

              <p>{y}</p>
          <button type="submit"  className="btn btn-success">Login</button>
        </form>
        </div>
</div>
      );
   }
}
