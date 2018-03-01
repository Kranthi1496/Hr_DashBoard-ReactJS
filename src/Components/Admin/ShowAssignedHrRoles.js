import React, {Component } from 'react';
export default class ShowAssignedHrRoles extends Component {
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
    </tr>
   </thead>
   <tbody>
    {this.props.hr.map((item,i)=>{
     return  <tr key={i}><td>{item.emp_id}</td><td>{item.designation}</td></tr>
    })}
   </tbody>
  </table>
 </div>
      );
   }
}
