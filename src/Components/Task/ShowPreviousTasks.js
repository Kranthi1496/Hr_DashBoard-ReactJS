import React, {Component } from 'react';
import Moment from 'moment';
export default class ShowPreviousTasks extends Component {
constructor(props){
  super(props);
  this.state={
   task:{
     emp_id:'1',

     task_title:'1',
     task_desc:'1',
     start_date:'1',
     end_date:'1',
     status:'1'
   },
   showResults:false
  };
 }
showtask(item){
  //console.log("clicked");
  let task=this.state.task;
  task.emp_id=item.user_id;
  task.task_title=item.task_title;
  task.task_desc=item.task_desc;
  task.start_date=item.start_date;
  task.end_date=item.end_date;
  task.status=item.status;
  this.setState({task:task},function () {
  console.log(this.state);
  this.setState({showResults:true});
  });
}

    render(){
      if(this.state.showResults){
        //var x=<div><p>{this.state.task.emp_id}</p><p>{this.state.task.task_title}</p><p>{this.state.task.task_desc}</p><p>{Moment(this.state.task.start_date).format('LL')}</p><p>{Moment(this.state.task.end_date).format('LL')}</p><p>{this.state.task.status}</p></div>;
      var x=<table className="table table-hover">
             <tbody>
              <tr className="info">
               <th>Emp_Id</th>
               <td>{this.state.task.emp_id}</td>
              </tr>
              <tr className="info">
               <th>Title</th>
               <td>{this.state.task.task_title}</td>
              </tr>
              <tr className="info">
               <th>Description</th>
               <td>{this.state.task.task_desc}</td>
              </tr>
              <tr className="info">
               <th>Start_date</th>
               <td>{Moment(this.state.task.start_date).format('LL')}</td>
              </tr>
              <tr className="info">
               <th>End_date</th>
               <td>{Moment(this.state.task.end_date).format('LL')}</td>
              </tr>
              <tr className="info">
               <th>Status</th>
               <td>{this.state.task.status}</td>
              </tr>
             </tbody>
           </table>;
      }

     return(
          <div className="row">
           <div className="col-md-6">
            <h2 className="center">Tasks</h2>
            <table className="table table-bordered">
             <thead>
              <tr>
              <th>Emp_Id</th>
              <th>Title</th>
              <th>Description</th>
              </tr>
             </thead>
             <tbody>
             {this.props.previous_tasks.map((item,i)=>{

             return  <tr onClick={this.showtask.bind(this,item)} key={i}><td>{item.user_id}</td><td>{item.task_title}</td><td>{item.task_desc}</td></tr>
            })}
         {/*<td>{Moment(item.start_date).format('LL')}</td><td>{Moment(item.end_date).format('LL')}</td><td>{item.status}</td>*/}
            </tbody>
          </table>
         </div>
         <div className="col-md-6">
         <h2 className="center">Selected Task</h2>
         { this.state.showResults ? x : null }
         </div>

      </div>
      );
   }
}
