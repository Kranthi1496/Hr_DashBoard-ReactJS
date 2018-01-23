import React, {Component } from 'react';
import Moment from 'moment';
export default class ShowSoftwareEngineerTasks extends Component {
constructor(props){
  super(props);
  this.state={
  // members:this.props.software_engineer
  };
 }
 // componentDidMount(){
 //  this.setState({members:this.props.software_engineer},function(){
 //    console.log(this.state);
 //  });
 // }
  render(){
    //  console.log(this.state);
  return(
   <div>
    <table className="table table-bordered">
     <thead>
      <tr>
       <th>Emp_Id</th>
       <th>Task Title</th>
       <th>Description</th>
       <th>Start Date</th>
       <th>End Date</th>
       <th>Status</th>
     </tr>
    </thead>
    <tbody>
    {this.props.software_engineer.map((item,i)=>{
return  <tr key={i}><td>{item.user_id}</td><td>{item.task_title}</td><td>{item.task_desc}</td><td>{Moment(item.start_date).format('LL')}</td><td>{Moment(item.end_date).format('LL')}</td><td>{item.status}</td></tr>
    })}
   </tbody>
   </table>
  </div>
      );
   }
}
