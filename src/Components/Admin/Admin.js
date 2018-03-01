import React, {Component } from 'react';
import {
  Link
} from 'react-router-dom';
import $ from "jquery";
import ShowList from './ShowList';
import ShowAssignedHrRoles from './ShowAssignedHrRoles';
 export default class Admin extends Component {
   constructor(props){
     super(props);
     this.state={
       users:[],
       emprole:{
         empid:'',
         manager:''
       },
       status:'',
       selectValue:'',
       hr:[]

     };
     this.logout=this.logout.bind(this);
     this.getusers=this.getusers.bind(this);
     this.assign_role=this.assign_role.bind(this);
     this.handleChange=this.handleChange.bind(this);
     this.getdetails=this.getdetails.bind(this);
    }
    //role submit//
   assign_role(e){
     this.setState({status:''});
     e.preventDefault();
     var emprole=this.state.emprole;
       emprole.empid=this.refs.id.value;
      // emprole.designation=this.refs.designation.value;
      // emprole.manager=this.refs.manager.value;
       this.setState({emprole:emprole},function(){
         console.log(this.state);
       })
     if(this.state.emprole.empid !=='' && this.state.selectValue !=='' )
      {
        this.refs.id.value='';
        //this.refs.designation.value='';
        //this.refs.manager.value='';
        $.ajax({
              url: "http://localhost:8080/ReactApp/role/assignrole.php",
              type: "POST",
              //contentType: 'application/json',
              data: JSON.stringify({
                                     'empid':this.state.emprole.empid,
                                     'designation':this.state.selectValue,
                                     'managerid':54
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
      }


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
           console.log(res);
           this.setState({users:res.data},function(){
             console.log(this.state);
           });

          }.bind(this),
          error: function(xhr, resp, text) {
              console.log(xhr, resp, text);
          }
      });

    this.getdetails();
     }
     else {
       alert("session expired, please login");
         window.location="http://localhost:3000/login";
     }
   }//function end

   getdetails(){
     $.ajax({
           url: "http://localhost:8080/ReactApp/admin/getassignedhr.php",
           type: "GET",
           //contentType: 'application/json',
           success: function(response) {
             //console.log(response);
             var res=JSON.parse(response);
            //console.log(res.data);
             if(res.status === 'OK'){
             this.setState({hr:res.data});
           }
           }.bind(this),
           error: function(xhr, resp, text) {
               console.log(xhr, resp, text);
           }
       });
   }
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
     return(
      <div>
      <nav className="navbar navbar-inverse">
       <ul className="nav navbar-nav">
        <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
        <li><Link to="/admin">Admin</Link></li>
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
           <select onChange={this.handleChange} className="form-control" required>
            <option value="">Select</option>
            <option value="HR">HR</option>
           </select>
          </div>
         <button type="submit" className="btn btn-primary" >Assign</button>
        </form>
       <div className="center">{this.state.status}</div>
      </div>
      <div className="col-md-4">
       <h2 className="center">Assigned Roles</h2>
       <ShowAssignedHrRoles hr={this.state.hr}/>
      </div>
     </div>
    </div>
  </div>
      );
   }
}
