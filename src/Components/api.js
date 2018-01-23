
import React, { Component } from 'react';
import $ from "jquery";
export default class Api extends Component {
  constructor(props){
    super(props);
    this.state={
      name:''
    };
    this.nameSubmit=this.nameSubmit.bind(this);
   }
   nameSubmit(e){
     e.preventDefault();
//   console.log("hi");
   var studentName=this.refs.name.value;
  this.setState({name:studentName}, function () {
  console.log(this.state);
  if(this.state.name !== ''){
    $.ajax({
          url: "http://localhost:8080/ReactApp/insert.php",
          type: "POST",
          //contentType: 'application/json',
          data: JSON.stringify({ 'name':  this.state.name}),
          success: function(response) {
            console.log(response);
          },
          error: function(xhr, resp, text) {
              console.log(xhr, resp, text);
          }
      });
  }
});
 }
  render(){
    return(
      <div>
        <h1> I am Home </h1>
        <form onSubmit={this.nameSubmit}>
              <input type="text" ref="name" />
             </form>
      </div>
    );
  }
}
