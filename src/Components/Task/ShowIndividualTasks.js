import React, {Component } from 'react';
import $ from "jquery";
import Moment from 'moment';
import EditTask from './EditTask';
export default class ShowIndividualTasks extends Component {
constructor(props){
  super(props);
  this.state={
   selectedtask:{
     task_id:'',
     emp_id:'',
     name:'',
     task_title:'',
     task_desc:'',
     start_date:'',
     end_date:'',
     status:''
   },
   emptasks:[],
   editvar:false,
   person_id:'',
   show_I_Task:false


  };
  //this.gettasks=this.gettasks.bind(this);
  this.editfunction=this.editfunction.bind(this);
  this.setfalse=this.setfalse.bind(this);
  this.deleteTask=this.deleteTask.bind(this);
 }
 componentDidMount(){
   this.setState({person_id:localStorage.id},function(){

 });
 }

 deleteTask(){
   if(this.state.selectedtask.task_id !== '' && this.state.selectedtask.emp_id !== ''){
     $.ajax({
           url: "http://localhost:8080/ReactApp/task/deletetask.php",
           type: "POST",
           contentType: 'application/json',
           data: JSON.stringify({
                               'task_id':this.state.selectedtask.task_id,
                               'user_id':this.state.selectedtask.emp_id
                                   }),
           success: function(response) {
             //console.log(response);
             var res=JSON.parse(response);
            console.log(res.status);
             //this.setState({status:res.status});
            //   this.getprevioustasks();
            if(res.status === 'OK'){
              window.location="http://localhost:3000/tasklist";
            }
           }.bind(this),
           error: function(xhr, resp, text) {
               console.log(xhr, resp, text);
           }
       });
   }
 }//deleteTask end

 setfalse(){
  this.setState({editvar:false});
  this.setState({selectedtask:{   task_id:'',
     emp_id:'',
     name:'',
     task_title:'',
     task_desc:'',
     start_date:'',
     end_date:'',
     status:''}},function() {
       console.log(this.state);
     });

 }

  editfunction(){
    this.setState({editvar:true});
  }
   gettasks(name){
     this.setState({show_I_Task:true});
   var temparray=[];
   this.setState({emptasks:temparray});
   console.log(this.props.previous_tasks);
   var len=this.props.previous_tasks.length;
   var i,j;
    for(i=0;i<len;i++){
     if(this.props.previous_tasks[i].name === name){
        temparray.push(this.props.previous_tasks[i]);
     }
    }
    this.setState({emptasks:temparray},function(){console.log(this.state)});
  }

  openmodal(item){
    let task=this.state.selectedtask;
    task.task_id=item.task_id;
    task.emp_id=item.user_id;
    task.task_title=item.task_title;
    task.task_desc=item.task_desc;
    task.start_date=item.start_date;
    task.end_date=item.end_date;
    task.status=item.status;
    this.setState({selectedtask:task},function () {
    console.log(this.state);

    });
  }

  render(){
    const divStyle = {
   color: 'blue'

    };
    var stdetails=<table className="table table-bordered">
     <tbody>
     <tr className="info">
      <th>Id</th>
      <td>{this.state.selectedtask.emp_id}</td>
     </tr>

     <tr className="info">
      <th>Title</th>
      <td>{this.state.selectedtask.task_title}</td>
     </tr>
     <tr className="info">
      <th>Description</th>
      <td>{this.state.selectedtask.task_desc}</td>
     </tr>
     <tr className="info">
      <th>Start_date</th>
      <td>{Moment(this.state.selectedtask.start_date).format('LL')}</td>
     </tr>
     <tr className="info">
      <th>End_date</th>
      <td>{Moment(this.state.selectedtask.end_date).format('LL')}</td>
     </tr>
     <tr className="info">
      <th>Status</th>
      <td>{this.state.selectedtask.status}</td>
     </tr>
    </tbody>
  </table>;
    if(this.state.person_id === this.state.selectedtask.emp_id){

      if(this.state.editvar === true ){
        var x=<EditTask selectedtask={this.state.selectedtask}/>;
        var y=<span></span>;
        var z=<span></span>;
       }
      else{
        var x=stdetails;
        var y=<button type="button" className="btn btn-primary" onClick={this.editfunction}>Edit</button>;
        var z=<button type="button" className="btn btn-danger" onClick={this.deleteTask}>Remove</button>;
       }

     }
     else{
        var x=stdetails;
        var y=<span></span>;
        var z=<span></span>;
      }
       if(this.state.show_I_Task){
         var m=   <h2 className="center">Selected User Tasks</h2>;
        var n=  <table className="table table-bordered">
           <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start_date</th>
            <th>End_date</th>
            <th>Status</th>
            </tr>
           </thead>
           <tbody>
           {this.state.emptasks.map((item,i)=>{

           return  <tr data-toggle="modal" data-target="#ITaskModal" data-backdrop="static" data-keyboard="false"  key={i} onClick={this.openmodal.bind(this,item)}>
           <td>{item.user_id}</td>
           <td>{item.name}</td>
           <td>{item.task_title}</td>
           <td>{item.task_desc}</td>
           <td>{Moment(item.start_date).format('LL')}</td>
           <td>{Moment(item.end_date).format('LL')}</td>
           <td>{item.status}</td></tr>
          })}

          </tbody>
        </table>;
       }
      return(
        <div className="row">
         <div className="col-md-3">
          <h2 className="center">Members</h2>
          <div className="panel panel-default">



             {this.props.users_name.map((item,i)=>{

               return  <div  className="panel-body center fs pointer odd" key={i} onClick={this.gettasks.bind(this,item)}>{item}</div>
             })
             }
             </div>
         </div>
         <div className="col-md-9">
        {m}
        {n}
         </div>
         {/*modal start*/}
         <div id="ITaskModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
           <div className="modal-content">
            <div className="modal-header">
            <button type="button" onClick={this.setfalse} className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Selected Task</h4>
            </div>
            <div className="modal-body">
            <div > {x}</div>
         </div>
        <div className="modal-footer">
        <span>
         {y}
         {z}
        <button type="button" onClick={this.setfalse} className="btn btn-success" data-dismiss="modal">Close</button>
        </span>
        </div>
      </div>

     </div>
   </div>
         {/*modal end*/}
</div>

      );
    }
}
