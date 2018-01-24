import React, {Component } from 'react';
export default class ShowList extends Component {
constructor(props){
  super(props);
  this.state={

  };
 }
    render(){
     return(

      <table className="table table-bordered">
      <thead>
      <tr>
      <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
    {this.props.users.map((item,i)=>{
    return  <tr key={i}><td>{item.id}</td><td>{item.name}</td></tr>
        })}
    </tbody>
  </table>


      );
   }
}
