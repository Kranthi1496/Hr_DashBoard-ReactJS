import React, {Component } from 'react';
import Moment from 'moment';
export default class ShowPreviousTasks extends Component {
constructor(props){
  super(props);
  this.state={
   task:{
     emp_id:'',
     name:'',
     task_title:'',
     task_desc:'',
     start_date:'',
     end_date:'',
     status:''
   },
   emptasks:[],
   showResults:false,

  };
  //this.gettasks=this.gettasks.bind(this);
 }

   gettasks(name){
   var temparray=[];
   this.setState({emptasks:temparray,showResults:true});
   console.log(this.props.previous_tasks);
   var len=this.props.previous_tasks.length;
   var i,j;
    for(i=0;i<len;i++){
     if(this.props.previous_tasks[i].name == name){
        temparray.push(this.props.previous_tasks[i]);
     }
    }
    this.setState({emptasks:temparray},function(){console.log(this.state)});
  }

  render(){
    const divStyle = {
   color: 'blue'

    };
    const showResults=this.state.showResults;
      return(
        <div className="row">
         <div className="col-md-3">
          <h2 className="center">Members</h2>
          <div className="panel panel-default">



             {this.props.users_name.map((item,i)=>{

               return  <div  className="panel-body center fs pointer" key={i} onClick={this.gettasks.bind(this,item)}>{item}</div>
             })
             }
             </div>
         </div>
         <div className="col-md-9">
           <h2 className="center">Selected User</h2>
         <table className="table table-bordered">
          <thead>
           <tr>
           <th>Id</th>
           <th>Name</th>
           <th>Title</th>
           <th>Description</th>
           <th>Start_date</th>
           <th>End_date</th>
           <th>Status</th>
           </tr>
          </thead>
          <tbody>
          {this.state.emptasks.map((item,i)=>{

          return  <tr   key={i}>
          <td>{item.user_id}</td>
          <td>{item.name}</td>
          <td>{item.task_title}</td>
          <td>{item.task_desc}</td>
          <td>{Moment(item.start_date).format('LL')}</td>
          <td>{Moment(item.end_date).format('LL')}</td>
          <td>{item.status}</td></tr>
         })}

         </tbody>
       </table>
         </div>
        </div>

      );
    }
}
