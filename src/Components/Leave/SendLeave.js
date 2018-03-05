import React, {Component } from 'react';
import $ from "jquery";
import {
  Link
} from 'react-router-dom';
export default class SendLeave extends Component {
    constructor(props){
      super(props);
      this.state={
        user_name:'',
        user_id:'',
        mail:{
          subject:'',
          description:'',
          start_date:'',
          end_date:''
        },
        manager_id:'',
        manager_not_exists:false

      };
      this.logout=this.logout.bind(this);
      this.sendmail=this.sendmail.bind(this);
      this.getdetails=this.getdetails.bind(this);
     }
     componentDidMount(){
       this.setState({user_id:localStorage.id},function(){
       this.getdetails();
     });


     }
     getdetails(){
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
                this.setState({manager_id:res.data[0].manager_id,user_name:res.name[0].name});
              }


             }.bind(this),
             error: function(xhr, resp, text) {
                 console.log(xhr, resp, text);
             }
         });
     }
     sendmail(e){
       e.preventDefault();
       var mail=this.state.mail;
       mail.subject=this.refs.subject.value;
       mail.description=this.refs.description.value;
       mail.start_date=this.refs.startdate.value;
       mail.end_date=this.refs.enddate.value;
       this.setState({mail:mail},function() {
         console.log(this.state);
       });
       if(this.state.mail.subject!== '' && this.state.mail.description!== ''
        && this.state.mail.start_date!== '' && this.state.mail.end_date!==''){
        this.refs.subject.value='';
        this.refs.description.value='';
        this.refs.startdate.value='';
        this.refs.enddate.value='';
          $.ajax({
                url: "http://localhost:8080/ReactApp/leave/addleave.php",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                                     'user_id':this.state.user_id,
                                     'manager_id':this.state.manager_id,
                                     'subject':this.state.mail.subject,
                                     'description':this.state.mail.description,
                                     'start_date':this.state.mail.start_date,
                                     'end_date':this.state.mail.end_date
                                        }),
                success: function(response) {
                  //console.log(response);
                  var res=JSON.parse(response);
                 console.log(res.status);
                  if(res.status === 'OK'){
                    $.ajax({
                          url: "http://localhost:8080/ReactApp/leave/sendmail.php",
                          type: "POST",
                          contentType: 'application/json',
                          data: JSON.stringify({
                                            'user_id':this.state.user_id,
                                            'user_name':this.state.user_name,
                                            'manager_id':this.state.manager_id,
                                            'subject':this.state.mail.subject,
                                            'description':this.state.mail.description,
                                            'start_date':this.state.mail.start_date,
                                            'end_date':this.state.mail.end_date

                                                  }),
                          success: function(response) {
                            //console.log(response);
                          //  var res=JSON.parse(response);
                          // console.log(res.status);
                        //   if(res.status === 'OK'){
                            alert("Leave Request Sent");
                        //  }
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                           }
                         });
                    }

                }.bind(this),
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
       }

     }
     logout(){
       localStorage.removeItem("id");
         window.location="http://localhost:3000/";
     }
    render(){


     return(
       <div>
       <nav className="navbar navbar-default">
       <ul className="nav navbar-nav">
        <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
        <li><Link to="/tasklist">TaskList</Link></li>
        <li><Link to="/addtask">AddTask</Link></li>
        <li><Link to="/leave">Leave</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><a className="pointer" onClick={this.logout}>Logout</a></li>
       </ul>


       </nav>
      <div className="container">
       <div className="row">
        <div className="col-md-12">
        <h1>Leave</h1>
        <form  onSubmit={this.sendmail}>
         <div className="form-group">
          <label> Subject:</label>
          <input type="text" className="form-control" ref="subject" required/>
         </div>
         <div className="form-group">
          <label> Description:</label>
          <input type="text" className="form-control" ref="description" required/>
         </div>
         <div className="form-group">
          <label> Start Date:</label>
          <input type="date" min="2018-03-02" className="form-control" ref="startdate" required/>
         </div>
         <div className="form-group">
          <label> End Date:</label>
          <input type="date" min="2018-03-02" className="form-control" ref="enddate"  required/>

         </div>


         <button type="submit" className="btn btn-primary" >Send</button>
        </form>
        </div>
       </div>

      </div>
      </div>
      );
   }
}
