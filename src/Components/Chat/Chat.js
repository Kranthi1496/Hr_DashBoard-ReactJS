import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import $ from "jquery";
import io from 'socket.io-client'
let socket = io.connect('http://localhost:3001');
class Chat extends Component {
  constructor(props){
    super(props);
    this.state={
      user_id:'',
      user_name:'',
      designation:'',
      socket:null,
      manager_name:'',
      users:[],
      message:'',
      show_message:[],
      show:false,
      all_users:[],
      empundermanager:[],
      idandname:[],
      show_filter_messages:[],
      receiver_name:'',
      nms:[]

    };


    this.handlemsg=this.handlemsg.bind(this);
    this.handleData=this.handleData.bind(this);

  }
  componentWillMount(){
    this.initSocket()
    this.setState({user_id:localStorage.id});
    this.getdetails()

  }
  componentDidMount() {

    socket.on('users', this.handleData);
    socket.on('show_message',this.handlemsg);
  }

handlemsg(show_message){
console.log(show_message);
var l,len,farray=[];
len=show_message.length;
for(l=0;l<len;l++){
  if(
(((this.state.user_name === show_message[l].sender ) ||
(this.state.user_name === show_message[l].receiver ))
&&
   ((this.state.receiver_name === show_message[l].receiver) ||
     (this.state.receiver_name === show_message[l].sender )))
){
  farray.push(show_message[l]);
}
}
      this.setState({nms:farray},function(){
        console.log(this.state);
      });
}

  handleData(users){

    this.setState({users},function(){
      console.log(this.state);
    });
  }

  initSocket = ()=>{

		socket.on('connect', ()=>{
			console.log("Connected");
		})

		this.setState({socket})
  }
  sendmessage=(e)=>{
    var select=e.target.getAttribute('btn');
    //console.log(e.target.value);
    if (e.key === 'Enter' || select === 'btnclick') {
    if(this.state.user_name !==''){
      socket.emit('set user',this.state.user_name, function(data){
        console.log(data);
       if(data){

       }
       else{

       }

      });

    }
    let message=this.refs.message.value;
    if(message !== ''){
    this.setState({message:message},function(){
      //console.log(this.state);
      this.refs.message.value='';
        if(this.state.message !=='' && this.state.user_name !=='' && this.state.receiver_name !==''){
          socket.emit('send message',{msg:this.state.message,sender:this.state.user_name,receiver:this.state.receiver_name} );
         }
        });
      }
  }
}

getdetails=()=>{
 if(localStorage.id){
   $.ajax({
         url: "http://localhost:8080/ReactApp/chat/getalldetails.php",
         type: "POST",
         contentType: 'application/json',
         data: JSON.stringify({
                             'id':localStorage.id

                                 }),
         success: function(response) {
           //console.log(response);
           var res=JSON.parse(response);
          //console.log(res.status);
          if(res.status === 'OK'){
            this.setState({user_name:res.authen[0].name,
                           designation:res.designation[0].designation,
                           manager_id:res.designation[0].manager_id,
                           all_users:res.allusers},function(){
                             var x=this.getname(this.state.manager_id);
                             this.setState({manager_name:x});
                           });

          //console.log(this.state);
           if(this.state.designation !== 'Software Engineer'){
             $.ajax({
                   url: "http://localhost:8080/ReactApp/chat/getmembers.php",
                   type: "POST",
                   contentType: 'application/json',
                   data: JSON.stringify({
                                       'id':localStorage.id,
                                       'designation':this.state.designation
                                           }),
                   success: function(response) {
                     //console.log(response);
                     var res1=JSON.parse(response);
            //        console.log(res1.status);
                    if(res1.status === 'OK'){
              //        console.log(res1);
                      this.setState({empundermanager:res1.emp},function(){
                        console.log(this.state);
                        var temparray=[];
                        if(this.state.designation !== 'Manager'){
                        var tem={
                          'id':this.state.manager_id,
                          'name':this.getname(this.state.manager_id)

                        }
                        temparray.push(tem);
                        this.setState({receiver_name:temparray[0].name});
                       }
                        var empundermanagerlength=this.state.empundermanager.length;
                        var m;
                          for(m=0;m<empundermanagerlength;m++){
                            var temp={
                              'id':this.state.empundermanager[m].emp_id,
                              'name':this.getname(this.state.empundermanager[m].emp_id)

                            }
                            temparray.push(temp);

                          }
                          this.setState({idandname:temparray},function () {
                            console.log(this.state);
                          })
                      }

                      );
                    }

                   }.bind(this),
                   error: function(xhr, resp, text) {
                       console.log(xhr, resp, text);
                   }
               });
           }
           else{
             var temparr=[];
             var temp={
               'id':this.state.manager_id,
               'name':this.getname(this.state.manager_id)

                   }
             temparr.push(temp);
             var name=temparr[0].name;
             this.setState({receiver_name:name});
           }//else end
          }

         }.bind(this),
         error: function(xhr, resp, text) {
             console.log(xhr, resp, text);
         }
     });
 }
 else{
   alert("session expired, please login");
     window.location="http://localhost:3000/login";
 }

}//get details end

getname=(id)=>{
  var myid=id;
  var alluserslength=this.state.all_users.length;
  var p;
  for(p=0;p<alluserslength;p++){
    if(this.state.all_users[p].id === myid){
      return this.state.all_users[p].name;
    }
  }

}

startchat(name){
  this.setState({receiver_name:name,nms:[]});
  socket.emit('chathistory',{sender:this.state.user_name,receiver:this.state.receiver_name});
}
logout=()=>{
  localStorage.removeItem("id");
    window.location="http://localhost:3000/";
}
  render() {
    if(this.state.designation !== 'Software Engineer'){
      var p=  <div className="panel panel-default">
              {this.state.idandname.map((item,i)=>{

             return  <div  className="panel-body center fs pointer odd" key={i} onClick={this.startchat.bind(this,item.name)}>{item.name}</div>
           })
           }
           </div>;
    }
    else{
      var p=<div className="panel panel-default">

       <div  className="panel-body center fs pointer odd" onClick={this.startchat.bind(this,this.state.manager_name)}>{this.state.manager_name}</div>


           </div>;
    }

    return (
      <div>
      <nav className="navbar navbar-inverse">
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
       <div className="col-md-3">
       {p}
       </div>
        <div className="col-md-6">
         <div className="panel panel-info pb-chat-panel">
           <div className="panel panel-heading pb-chat-panel-heading">
             <a >
              <label id="support_label">Chat with {this.state.receiver_name}</label>
             </a>

           </div>


          <div className="panel-body">
            <form>

             {this.state.nms.map((item,i)=>{

              return  <div className={this.state.user_name === item.sender ?  'form-group pb-chat-labels-right' : 'form-group ' } key={i}>


                      <p className={this.state.user_name === item.sender ?  'text-right pb-chat-labels pb-chat-labels-primary ' : 'text-left pb-chat-labels pb-chat-labels-left ' }>
                      {item.message}</p>

                      <hr />
                      <div className="clearfix"></div>
                      </div>
             })}

            </form>
          </div>
          <div className="panel-footer">
            <div className="row">
             <div className="col-xs-10">
              <textarea className="form-control pb-chat-textarea" ref="message" onKeyPress={this.sendmessage} placeholder="Type your message here..."></textarea>
             </div>
             <div className="col-xs-2 pb-btn-circle-div">
               <button className="btn btn-primary btn-circle pb-chat-btn-circle" btn="btnclick"  onClick={this.sendmessage}><span className="fa fa-chevron-right"></span></button>
             </div>
            </div>
           </div>
          </div>

       </div>
       <div className="col-md-3">
       </div>
   </div>
 </div>
 </div>
    );
  }
}

export default Chat;
