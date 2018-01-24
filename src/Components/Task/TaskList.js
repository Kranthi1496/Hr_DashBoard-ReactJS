import React, {Component } from 'react';
import {
//  BrowserRouter as Router,
//  Route,
  Link
} from 'react-router-dom';
import $ from "jquery";
import ShowPreviousTasks from './ShowPreviousTasks';
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
       all_tasks:[],
       user:[],
       authen:[],
       designation:''

     };
     this.logout=this.logout.bind(this);
     this.getprevioustasks=this.getprevioustasks.bind(this);
     this.sort=this.sort.bind(this);
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
                 this.setState({user:res.data[0],authen:res.authen[0]});
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
                                this.sort();
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
                                   this.sort();
                                        });

                                  });
                              }
                             else if (hresponse.designation === 'Team Lead') {
                             console.log(hresponse.designation);
                              this.setState({software_engineer_tlead:hresponse.se,
                                            senior_software_engineer:hresponse.sse,
                                            all_tasks:hresponse.sse});

                                        //console.log(this.state);
                                        var all_tasks=this.state.all_tasks;
                                        console.log(this.state.software_engineer_tlead);

                                        if(this.state.software_engineer_tlead[0]){
                                        var selen=this.state.software_engineer_tlead.length;
                                        var a,b,c,iselen;
                                        for(a=0;a<selen;a++){
                                         iselen=this.state.software_engineer_tlead[a].length;
                                          for(b=0;b<iselen;b++){
                                            if(this.state.software_engineer_tlead[a][b].user_id){
                                              this.state.all_tasks.push(this.state.software_engineer_tlead[a][b]);
                                              }
                                             }
                                            }
                                         this.setState({all_tasks:all_tasks},function(){
                                           this.sort();
                                          console.log(this.state);
                                           });
                                         }
                              }
                            else if (hresponse.designation === 'Manager') {
                            this.setState({all_tasks:hresponse.manager},function(){
                              this.sort();
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



  sort(){
    var list=this.state.all_tasks;
    list.sort(function(a,b){
        var c = new Date(a.start_date);
        var d = new Date(b.start_date);
       return c-d;
        });
        this.setState({all_tasks:list});
     }


    render(){
     return(
      <div>
      <nav className="navbar navbar-inverse">
       <ul className="nav navbar-nav">
        <li><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
        <li><Link to="/tasklist">TaskList</Link></li>
        <li><Link to="/addtask">AddTask</Link></li>
         <li><a className="pointer" onClick={this.logout}>Logout</a></li>
       </ul>
      </nav>
    <div className="container-fluid">
       <div className="row">
       <div className="col-md-4">
       <p className="userinfo">Name:-{this.state.user.name}</p>
       <p className="userinfo">Email:-{this.state.authen.email}</p>
       <p className="userinfo">Designation:-{this.state.designation}</p>
       </div>
       <div className="col-md-6">

       </div>
       <div className="col-md-2">
       </div>
       </div>{/*first row end*/}



       <ShowPreviousTasks previous_tasks={this.state.all_tasks}/>





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
