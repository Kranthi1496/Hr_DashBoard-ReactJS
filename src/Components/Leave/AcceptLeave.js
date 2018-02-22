import React, { Component } from 'react';
import Moment from 'moment';
import $ from "jquery";
import {
//  BrowserRouter as Router,
//  Route,
//  Link
} from 'react-router-dom';
export default class AcceptLeave extends Component {
  constructor(props){
    super(props);
    this.state={
     user_id:'',
     leave:{
       name:'',
       uid:'',
       mid:'',
       subject:'',
       description:'',
       startdate:'',
       enddate:''
     },
     status:''
    };
      this.getdetails=this.getdetails.bind(this);
      this.acceptleave=this.acceptleave.bind(this);
      this.senddata=this.senddata.bind(this);
   }
   componentDidMount(){
     localStorage.removeItem("kran");
     this.setState({user_id:localStorage.id},function(){
     this.getdetails();
   });
   }
   acceptleave(e){
      //localStorage.removeItem("key");
     var x=e.target.id;
     if(x === 'accept'){
       this.setState({status:'YES'},function(){console.log(this.state.status);this.senddata();});
     }
     else{
     this.setState({status:'NO'},function(){console.log(this.state.status);this.senddata();});
     }

    // console.log(this.state.status);
   }
   senddata(){
    if(this.state.leave.uid !== '' && this.state.leave.mid !== '' &&
       this.state.leave.subject !== '' && this.state.leave.description !== '' && this.state.status !== ''){
         $.ajax({
               url: "http://localhost:8080/ReactApp/leave/acceptleave.php",
               type: "POST",
               contentType: 'application/json',
               data: JSON.stringify({
                                   uid:this.state.leave.uid,
                                   mid:this.state.leave.mid,
                                   subject:this.state.leave.subject,
                                   description:this.state.leave.description,
                                   status:this.state.status

                                       }),
               success: function(response) {
                 //console.log(response);
                 var res=JSON.parse(response);
                console.log(res.status);
                if(res.status === 'OK'){
                 window.location="http://localhost:3000/tasklist";
                }

               },
               error: function(xhr, resp, text) {
                   console.log(xhr, resp, text);
               }
           });
       }//if end_date
     }//function end
   getdetails(){
   //console.log("hi");
   if(this.state.user_id === this.props.match.params.mid){
   var leave=this.state.leave;
   leave.name=this.props.match.params.name;
   leave.uid=this.props.match.params.uid;
   leave.mid=this.props.match.params.mid;
   leave.subject=this.props.match.params.subject;
   leave.description=this.props.match.params.desc;
   leave.startdate=this.props.match.params.startdate;
   leave.enddate=this.props.match.params.enddate;
   this.setState({leave:leave},function(){
     console.log(this.state);
          });
        }
        else {
          alert("please login");
           localStorage.setItem("kran",window.location.href);
             window.location="http://localhost:3000/login";
        }
    }
    render(){
     return(

      <div className="container">
      <h2>leave request from {this.state.leave.name}</h2>
      <div className="panel panel-default">
        <div className="panel-heading">Subject:- {this.state.leave.subject}</div>
         <div className="panel-body">
         <div>Description:- {this.state.leave.description}</div>
         <div>Start Date:- {Moment(this.state.leave.startdate).format('LL')}</div>
         <div>End Date:- {Moment(this.state.leave.enddate).format('LL')}</div>
         </div>
        <div className="panel-footer">
        <span>
        <button type="button" className="btn btn-primary" ref="accept" id="accept" onClick={this.acceptleave}>Accept</button>
        <button type="button" className="btn btn-primary reject" ref="reject" id="reject" onClick={this.acceptleave}>Reject</button>
        </span>
        </div>
      </div>
      </div>

      );
   }
}
