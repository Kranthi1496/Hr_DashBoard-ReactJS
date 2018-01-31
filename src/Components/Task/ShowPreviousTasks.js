import React, {Component } from 'react';
import Moment from 'moment';
export default class ShowPreviousTasks extends Component {
constructor(props){
  super(props);
  this.state={
   task:{
     emp_id:'',
     name:'',
     task_title:'',
     task_desc:'',
     start_date:'',
     end_date:'',
     status:''
   },
   showResults:false
  };
 }
showtask(item){
  //console.log("clicked");
  let task=this.state.task;
  task.name=item.name;
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

     return(
          <div className="row">
           <div className="col-md-12">
            <h2 className="center">Tasks</h2>
            <table className="table table-bordered">
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
             {this.props.previous_tasks.map((item,i)=>{

             return  <tr data-toggle="modal" data-target="#myModal"  key={i} onClick={this.showtask.bind(this,item)}>
             <td>{item.user_id}</td>
             <td>{item.name}</td>
             <td>{item.task_title}</td>
             <td>{item.task_desc}</td>
             <td>{Moment(item.start_date).format('LL')}</td>
             <td>{Moment(item.end_date).format('LL')}</td>
             <td>{item.status}</td></tr>
            })}
         {/*<td>{Moment(item.start_date).format('LL')}</td><td>{Moment(item.end_date).format('LL')}</td><td>{item.status}</td>
            onClick={this.showtask.bind(this,item)}
         */}
            </tbody>
          </table>
         </div>

         <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
           <div className="modal-content">
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Selected Task</h4>
            </div>
            <div className="modal-body">
             <table className="table table-hover">
              <tbody>
              <tr className="info">
               <th>Id</th>
               <td>{this.state.task.emp_id}</td>
              </tr>
              <tr className="info">
               <th>Name</th>
               <td>{this.state.task.name}</td>
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
           </table>
         </div>
        <div className="modal-footer">
         <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

  </div>
</div>
        {/* <h2 className="center">Selected Task</h2>
         { this.state.showResults ? x : null }*/}

</div>
      );
   }
}
