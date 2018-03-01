import React, {Component } from 'react';
import {
//  BrowserRouter as Router,
//  Route,
  Link
} from 'react-router-dom';
import $ from "jquery";
import ShowList from '../Admin/ShowList';
import ShowAssignedRoles from './ShowAssignedRoles';
//import Moment from 'moment';
 export default class Hr extends Component {
   constructor(props){
     super(props);
     this.state={

       users:[],
       emprole:{
         empid:'',
         manager:''
       },
       status:'',
       previousroles:[],
       selectValue:''

     };
     this.logout=this.logout.bind(this);
     this.getusers=this.getusers.bind(this);
     this.assign_role=this.assign_role.bind(this);
     this.handleChange=this.handleChange.bind(this);
    }
    //role submit//
   assign_role(e){
     e.preventDefault();
       this.setState({status:''});
     var emprole=this.state.emprole;
       emprole.empid=this.refs.id.value;
      // emprole.designation=this.refs.designation.value;
       emprole.manager=this.refs.manager.value;
       this.setState({emprole:emprole},function(){
         console.log(this.state);
       })
     if(this.state.emprole.empid !=='' && this.state.selectValue !=='' && this.state.emprole.manager !=='')
      {
        this.refs.id.value='';
      //  this.refs.designation.value='';
        this.refs.manager.value='';
        $.ajax({
              url: "http://localhost:8080/ReactApp/role/assignrolehr.php",
              type: "POST",
              //contentType: 'application/json',
              data: JSON.stringify({
                                     'empid':this.state.emprole.empid,
                                  'designation':this.state.selectValue,
                                  'managerid':this.state.emprole.manager
                                      }),
              success: function(response) {
                //console.log(response);
                var res=JSON.parse(response);
               console.log(res.data);
                this.setState({status:res.data});

              }.bind(this),
              error: function(xhr, resp, text) {
                  console.log(xhr, resp, text);
              }
          });
      }//if end


   }
    //role submit end//
    //get members//
    componentDidMount(){
          this.getusers();
    }

    getusers(){
      if(localStorage.id){
        console.log(localStorage.id);
    $.ajax({
          url: "http://localhost:8080/ReactApp/role/getusers.php",
          type: "POST",
          //contentType: 'application/json',
          data: JSON.stringify({
                                 'id':localStorage.id

                                  }),
          success: function(response) {
            //console.log(response);
            var res=JSON.parse(response);
            if(res.status === 'OK'){
           console.log(res);
           this.setState({users:res.data},function(){
             console.log(this.state);
           });
           this.setState({previousroles:res.role},function(){
             console.log(this.state);
           });
         }
         else{
           console.log("error");
         }

          }.bind(this),
          error: function(xhr, resp, text) {
              console.log(xhr, resp, text);
          }
      });
     }
     else {
       alert("session expired, please login");
         window.location="http://localhost:3000/login";
     }
   }//function end

   handleChange(e){
     e.preventDefault();
     this.setState({selectValue:e.target.value},function(){
       console.log(this.state);
   });
 }
    //
    logout(){
      localStorage.removeItem("id");
        window.location="http://localhost:3000/";
    }
    render(){
    //  const k = "2018-01-03";
  //  const formattedDT = Moment(k).format('LL');
     return(
      <div>
      <nav className="navbar navbar-inverse">
       <ul className="nav navbar-nav">
        <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
        <li><Link to="/hr">Hr</Link></li>
        <li><a className="pointer" onClick={this.logout}>Logout</a></li>
       </ul>
      </nav>


<div className="container">
<div className="row">
<div className="col-md-4">
<h2 className="center">Members</h2>
  <ShowList users={this.state.users} />
</div>
<div className="col-md-4">
<h2 className="center">Assign Role</h2>
      <form  onSubmit={this.assign_role}>
  <div className="form-group">
    <label> Employee Id:</label>
    <input type="number" className="form-control" ref="id" min="1" required/>
  </div>
  <div className="form-group">
    <label> Designation:</label>
  {/*  <input type="text" className="form-control" ref="designation" required/>*/}
  <select onChange={this.handleChange} className="form-control" required>
   <option value="">Select</option>
   <option value="Software Engineer">Software Engineer</option>
  <option value="Senior Software Engineer">Senior Software Engineer</option>
  <option value="Team Lead">Team Lead</option>
  <option value="Manager">Manager</option>
  </select>
  </div>
  <div className="form-group">
    <label> Reporting Manager Id:</label>
    <input type="number" className="form-control" ref="manager" min="1" required/>
  </div>

  <button type="submit" className="btn btn-primary" >Assign</button>
</form>
<div className="center">{this.state.status}</div>
</div>
<div className="col-md-4">
<h2 className="center">Assigned Roles</h2>
<ShowAssignedRoles previousroles={this.state.previousroles} />
</div>
</div>
      </div>
      </div>
      );
   }
}
