import React, {Component } from 'react';
export default class ShowAssignedRoles extends Component {
constructor(props){
  super(props);
  this.state={

  };
 }
    render(){
     return(


<div>
  <table className="table table-bordered">
  <thead>
  <tr>
  <th>Emp_Id</th>
    <th>Designation</th>
    <th>Reporting_Manager_id</th>
  </tr>
</thead>
<tbody>
{this.props.previousroles.map((item,i)=>{
return  <tr key={i}><td>{item.emp_id}</td><td>{item.designation}</td><td>{item.manager_id}</td></tr>
    })}
</tbody>
</table>
</div>
      );
   }
}
