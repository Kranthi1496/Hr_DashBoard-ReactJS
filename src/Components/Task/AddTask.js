import React, {Component } from 'react';
import {
  Link
} from 'react-router-dom';
import $ from "jquery";
export default class AddTask extends Component {
  constructor(props){
    super(props);
    this.state={
      user_id:'',
      selectValue:'',
      task:{
        title:'',
        description:'',
        startdate:'',
        enddate:''
      },
      date_error:'',
      manager_exists:false
    };
    this.logout=this.logout.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.addtask=this.addtask.bind(this);
    this.checkid=this.checkid.bind(this);
   }
componentWillMount(){
  this.checkid();
}
checkid(){
   if(localStorage.id){
     console.log(localStorage.id);
     this.setState({user_id:localStorage.id},function(){




       $.ajax({
             url: "http://localhost:8080/ReactApp/leave/getmanagerid.php",
             type: "POST",
             contentType: 'application/json',
             data: JSON.stringify({
                                 'user_id':this.state.user_id

                                     }),
             success: function(response) {
               //console.log(response);
              var res=JSON.parse(response);
             console.log(res.status);
              if(res.status === 'OK'){
                this.setState({manager_exists:true});
              }


             }.bind(this),
             error: function(xhr, resp, text) {
                 console.log(xhr, resp, text);
             }
         });

   });

 }//if end
 else {
   alert("session expired, please login");
     window.location="http://localhost:3000/login";
 }
}//checkid end


   logout(){
     localStorage.removeItem("id");
       window.location="http://localhost:3000/";
   }

//add task
addtask(e){
  e.preventDefault();
  var task=this.state.task;
  task.title=this.refs.title.value;
  task.description=this.refs.description.value;
  task.startdate=this.refs.startdate.value;
  task.enddate=this.refs.enddate.value;
  if(task.startdate > task.enddate){
    var date_error=this.state.date_error;
    this.setState({date_error:"end date should be greater than start date"});
  }
  else{
    this.setState({date_error:''});
    this.setState({task:task},function(){
      console.log(this.state);
    });
    if(this.state.user_id !=='' && this.state.task.title !=='' && this.state.task.description !==''  &&
       this.state.task.startdate !==''  && this.state.task.enddate && this.state.selectValue !=='')
     {
       this.refs.title.value='';
       this.refs.description.value='';
       this.refs.startdate.value='';
       this.refs.enddate.value='';
       $.ajax({
             url: "http://localhost:8080/ReactApp/task/addtask.php",
             type: "POST",
             contentType: 'application/json',
             data: JSON.stringify({
                                 'user_id':this.state.user_id,
                                 'task_title':this.state.task.title,
                                 'task_desc':this.state.task.description,
                                 'start_date':this.state.task.startdate,
                                 'end_date':this.state.task.enddate,
                                 'status':this.state.selectValue
                                     }),
             success: function(response) {
               //console.log(response);
               var res=JSON.parse(response);
              console.log(res.status);
               this.setState({status:res.status});
              //   this.getprevioustasks();
              if(res.status === 'OK'){
                window.location="http://localhost:3000/tasklist";
              }
             }.bind(this),
             error: function(xhr, resp, text) {
                 console.log(xhr, resp, text);
             }
         });
     }//if end
  }//else end
}//add task end
//

handleChange(e){
  e.preventDefault();
  this.setState({selectValue:e.target.value},function(){
    console.log(this.state);
     });
}
    render(){
      var m;
      if(this.state.manager_exists){
        m=<ul className="nav navbar-nav">
         <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
         <li><Link to="/tasklist">TaskList</Link></li>
         <li><Link to="/addtask">AddTask</Link></li>
        <li><Link to="/leave">Leave</Link></li>
        <li><Link to="/chat">Chat</Link></li>
         <li><a className="pointer" onClick={this.logout}>Logout</a></li>
        </ul>;
      }
      else{
        m=<ul className="nav navbar-nav">
         <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
         <li><Link to="/tasklist">TaskList</Link></li>
         <li><Link to="/addtask">AddTask</Link></li>
         <li><a className="pointer" onClick={this.logout}>Logout</a></li>
        </ul>;
      }
     return(
      <div>
      <nav className="navbar navbar-inverse">
        {m}
      </nav>
      <div className="container">
      <div className="row">
      <div className="col-md-3">
      </div>
      <div className="col-md-6">

        <h2 className="center">Add Task</h2>
        <form  onSubmit={this.addtask}>
         <div className="form-group">
          <label> Task Title:</label>
          <input type="text" className="form-control" ref="title" required/>
         </div>
         <div className="form-group">
          <label> Description:</label>
          <input type="text" className="form-control" ref="description" required/>
         </div>
         <div className="form-group">
          <label> Start Date:</label>
          <input type="date" className="form-control" ref="startdate" required/>
         </div>
         <div className="form-group">
          <label> End Date:</label>
          <input type="date" className="form-control" ref="enddate"  required/>
          {this.state.date_error}
         </div>
         <div className="form-group">
          <label> Status:</label>
          <select onChange={this.handleChange} className="form-control" required>
           <option value="">Select</option>
           <option value="ASSIGNED">ASSIGNED</option>
           <option value="INPROGRESS">INPROGRESS</option>
           <option value="FINISHED">FINISHED</option>
          </select>
         </div>

         <button type="submit" className="btn btn-primary" >Add</button>
        </form>


      </div>
      <div className="col-md-3">
      </div>
      </div>{/*row end*/}
      </div>{/*cointainer end*/}
      </div>//*main div end*/}
      );
   }
}
