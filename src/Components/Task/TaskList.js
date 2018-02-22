import React, {Component } from 'react';
import {
//  BrowserRouter as Router,
//  Route,
  Link
} from 'react-router-dom';
import $ from "jquery";
import ShowPreviousTasks from './ShowPreviousTasks';
import ShowIndividualTasks from './ShowIndividualTasks';
 export default class Task extends Component {
   constructor(props){
     super(props);
     this.state={

       response:'',
       user_id:'',
       previous_tasks:[],
       software_engineer:[],
       senior_software_engineer:[],
       manager:[],
       software_engineer_tlead:[],
       current_sse_tasks:[],
       users_name:[],
       all_users_name:[],
       all_users:[],
       all_tasks:[],
       show_tasks:[],
       user:[],
       authen:[],
       designation:'',
       user_name:''

     };
     this.logout=this.logout.bind(this);
     this.getprevioustasks=this.getprevioustasks.bind(this);
     this.sort=this.sort.bind(this);
     this.taskwithname=this.taskwithname.bind(this);
     this.getname=this.getname.bind(this);
     this.namefilter=this.namefilter.bind(this);
    }

    componentDidMount(){
          this.setState({user_id:localStorage.id},function(){
          this.getprevioustasks();

        });
    }

    getprevioustasks(){
      if(localStorage.id){
        //console.log(localStorage.id);
    //    this.setState({user_id:localStorage.id});
        //
        $.ajax({
              url: "http://localhost:8080/ReactApp/user/getdetails.php",
              type: "POST",
              contentType: 'application/json',
              data: JSON.stringify({
                                       'id':this.state.user_id
                                      }),
              success: function(response) {
                //console.log(response);
                var res=JSON.parse(response);
               console.log(res);
               if(res.status === 'OK'){
                 this.setState({user:res.data[0],authen:res.authen[0],all_users:res.allusers});
                 console.log(this.state);
               }
               else{console.log("error");}
        //
              $.ajax({
                  url: "http://localhost:8080/ReactApp/task/getprevioustasks.php",
                  type: "POST",
                  contentType: "application/json",
                  data: JSON.stringify({
                                  'user_id':this.state.user_id
                                      }),
                  success: function(response) {


                //console.log(response);
                  var res=JSON.parse(response);
                  console.log(res.status);
                  if(res.status === 'OK'){
                   this.setState({all_tasks:res.data},function(){
                    console.log(this.state);
                              });

                    }
                  else{
                   console.log("error");

                    }
            //hierarchy api
                  if(res.status){
                   console.log("entered");
                     $.ajax({
                      url: "http://localhost:8080/ReactApp/task/hierarchy.php",
                      type: "POST",
                      contentType: "application/json",
                      data: JSON.stringify({
                                         'user_id':this.state.user_id
                                          }),
                      success: function(response) {

                    //console.log(response);
                      var hresponse=JSON.parse(response);

                       if(hresponse.status === 'OK'){
                        this.setState({designation:hresponse.designation});
                         console.log(hresponse.designation);
                             if(hresponse.designation === 'Software Engineer'){
                                //this.sort();
                                this.taskwithname();
                              }
                             else if (hresponse.designation === 'Senior Software Engineer') {
                              this.setState({software_engineer:hresponse.se},function(){
                                console.log(this.state.software_engineer);
                                if(this.state.software_engineer !== null){
                              var selength=this.state.software_engineer.length;
                              var i;
                                 for(i=0;i<selength;i++){
                                 this.state.all_tasks.push(this.state.software_engineer[i]);
                                 }
                               }
                                this.setState({all_tasks:this.state.all_tasks},function(){
                                 console.log(this.state);
                                  // this.sort();
                                  this.taskwithname();
                                        });

                                  });
                              }
                             else if (hresponse.designation === 'Team Lead') {
                             console.log(hresponse.designation);
                              this.setState({software_engineer_tlead:hresponse.se,
                                            senior_software_engineer:hresponse.sse,
                                            current_sse_tasks:hresponse.sse});

                                        console.log(this.state.all_tasks);
                                        var all_tasks=this.state.all_tasks;
                                        console.log(this.state.software_engineer_tlead);

                                        if(this.state.current_sse_tasks !== null){
                                          var cstlen,x;
                                          cstlen=this.state.current_sse_tasks.length;
                                          for(x=0;x<cstlen;x++){
                                            this.state.all_tasks.push(this.state.current_sse_tasks[x]);
                                          }
                                          this.setState({all_tasks:all_tasks});
                                        }

                                        if(this.state.software_engineer_tlead[0]){
                                        var selen=this.state.software_engineer_tlead.length;
                                        var a,b,iselen;
                                        for(a=0;a<selen;a++){
                                         iselen=this.state.software_engineer_tlead[a].length;
                                          for(b=0;b<iselen;b++){
                                            if(this.state.software_engineer_tlead[a][b].user_id){
                                              this.state.all_tasks.push(this.state.software_engineer_tlead[a][b]);
                                              }
                                             }
                                            }
                                         this.setState({all_tasks:all_tasks},function(){
                                          // this.sort();
                                          this.taskwithname();
                                          console.log(this.state);
                                           });
                                         }
                              }
                            else if (hresponse.designation === 'Manager') {
                            this.setState({all_tasks:hresponse.manager},function(){
                              //this.sort();
                              this.taskwithname();
                            console.log(this.state)});
                             }
                            else{}

                         }
                       else {
                       console.log(hresponse.data);
                       }


                           }.bind(this),
                           error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                              }
                              });
                        }//if end
            //hierarchy api  end

               }.bind(this),
              error: function(xhr, resp, text) {
                  console.log(xhr, resp, text);
              }
          });

        }.bind(this),
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
     }
     else {
       alert("session expired, please login");
         window.location="http://localhost:3000/login";
     }
   }//function end

    //
    logout(){
      localStorage.removeItem("id");
        window.location="http://localhost:3000/";
    }

// currentloggedinusername = ()=>{
//   var user_name=getname(localStorage.id);
//   this.setState({user_name:user_name});
// }

  sort(){
    var list=this.state.show_tasks;
    list.sort(function(a,b){
        var c = new Date(a.start_date);
        var d = new Date(b.start_date);
       return c-d;
        });
        this.setState({show_tasks:list});
     }

       getname(id){
         var myid=id;
        // console.log("inname");
        // console.log(id);
         var alluserslength=this.state.all_users.length;
         var p;
         for(p=0;p<alluserslength;p++){
           if(this.state.all_users[p].id === myid){
             return this.state.all_users[p].name;
           }
         }

       }

 taskwithname(){
  var temparray=[];
  var alltaskslength=this.state.all_tasks.length;
  var m;
    for(m=0;m<alltaskslength;m++){
      var temp={
        'user_id':this.state.all_tasks[m].user_id,
        'name':this.getname(this.state.all_tasks[m].user_id),
        'task_id':this.state.all_tasks[m].task_id,
        'task_title':this.state.all_tasks[m].task_title,
        'task_desc':this.state.all_tasks[m].task_desc,
        'start_date':this.state.all_tasks[m].start_date,
        'end_date':this.state.all_tasks[m].end_date,
        'status':this.state.all_tasks[m].status
      }
      temparray.push(temp);

    }

    this.setState({show_tasks:temparray},function(){
    //   console.log(this.state)
    this.sort();
    //this.setState({show_tasks:temparray});
    var staskslen=this.state.show_tasks.length;
    for(var k=0;k<staskslen;k++){
      this.state.all_users_name.push(this.state.show_tasks[k].name);
       }
       this.setState({all_users_name:this.state.all_users_name});
       this.setState({users_name:this.namefilter(this.state.all_users_name)},function(){console.log(this.state)});
     });
 }

     namefilter(arr){
      let unique_array = [];
      for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) === -1){
          unique_array.push(arr[i]);
        }
      }
      return unique_array;
     }

    render(){
     return(
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
    <div className="container-fluid">
       <div className="row">
       <div className="col-md-4">
       <p className="userinfo">Name:- {this.state.user.name}</p>
       <p className="userinfo">Email:- {this.state.authen.email}</p>
       <p className="userinfo">Designation:- {this.state.designation}</p>
       </div>
       <div className="col-md-6">

       </div>
       <div className="col-md-2">
       </div>
       </div>{/*first row end*/}
{/*f*/}

       <ShowIndividualTasks users_name={this.state.users_name} previous_tasks={this.state.show_tasks} name={this.state.user_name}/>
       <ShowPreviousTasks previous_tasks={this.state.show_tasks}/>





       <div className="row">
       <div className="col-md-2">
       </div>
       <div className="col-md-8">

       </div>
       <div className="col-md-2">
       </div>
       </div>{/*third row end*/}
      </div>{/*container end*/}
    </div>
      );
   }
}
