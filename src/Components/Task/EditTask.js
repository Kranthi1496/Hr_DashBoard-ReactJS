import React, {Component } from 'react';
import $ from "jquery";
//import Moment from 'moment';
export default class EditTask extends Component {
  constructor(props){
    super(props);
    this.state={
      user_id:'',
      selectValue:'',
      updatetask:{

        title:'',
        description:'',
        startdate:'',
        enddate:''
      },
      date_error:'',
      task_id:''
    };
    this.edittask=this.edittask.bind(this);
    this.handleChange=this.handleChange.bind(this);
   }
   componentDidMount(){
     this.setState({user_id:this.props.selectedtask.emp_id,task_id:this.props.selectedtask.task_id});
     console.log(this.state);
     if(this.state.selectValue ===''){
       this.setState({selectValue:this.props.selectedtask.status});
     }
   }

   edittask(e){
     e.preventDefault();
     // this.setState({user_id:this.props.selectedtask.emp_id},function(){
     //   console.log(this.state);
     //   this.setState({task_id:this.props.selectedtask.task_id},function(){
     //     console.log(this.state);});
     // });
     var task=this.state.updatetask;
     task.title=this.refs.title.value;
     task.description=this.refs.description.value;
     task.startdate=this.refs.startdate.value;
     task.enddate=this.refs.enddate.value;

     if(task.startdate > task.enddate){
       var date_error=this.state.date_error;
       this.setState({date_error:"end date should be greater than start date"});
     }
     else{
       this.setState({date_error:''});
       this.setState({updatetask:task});

       console.log(this.state);

       if(this.state.task_id !== '' && this.state.user_id !=='' &&
          this.state.updatetask.title !=='' && this.state.updatetask.description !==''  &&
          this.state.updatetask.startdate !==''  && this.state.updatetask.enddate && this.state.selectValue !=='')
        {
          this.refs.title.value='';
          this.refs.description.value='';
          this.refs.startdate.value='';
          this.refs.enddate.value='';
          console.log("came");
          //console.log(this.props.selectedtask.task_id);
          $.ajax({
                url: "http://localhost:8080/ReactApp/task/edittask.php",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                                    'task_id':this.state.task_id,
                                    'user_id':this.state.user_id,
                                    'task_title':this.state.updatetask.title,
                                    'task_desc':this.state.updatetask.description,
                                    'start_date':this.state.updatetask.startdate,
                                    'end_date':this.state.updatetask.enddate,
                                    'status':this.state.selectValue
                                        }),
                success: function(response) {
                  //console.log(response);
                  var res=JSON.parse(response);
                 console.log(res.status);
                  this.setState({status:res.status});
                 //   this.getprevioustasks();
                 if(res.status === 'OK'){
                   window.location="http://localhost:3000/tasklist";
                 }
                }.bind(this),
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }//if end
     }//else end
   }//edit task end

   handleChange(e){
     e.preventDefault();
     this.setState({selectValue:e.target.value},function(){
       console.log(this.state);
        });
   }
    render(){
     return(
      <div className="row">
      <div className="col-md-12">

        <h2 className="center">EditTask</h2>
        <form  onSubmit={this.edittask}>
         <div className="form-group">
          <label> Task Title:</label>
          <input type="text" className="form-control" ref="title" defaultValue={this.props.selectedtask.task_title} required/>
         </div>
         <div className="form-group">
          <label> Description:</label>
          <input type="text" className="form-control" ref="description" defaultValue={this.props.selectedtask.task_desc} required/>
         </div>
         <div className="form-group">
          <label> Start Date:</label>
          <input type="date" className="form-control" ref="startdate" defaultValue={this.props.selectedtask.start_date} required/>
         </div>
         <div className="form-group">
          <label> End Date:</label>
          <input type="date" className="form-control" ref="enddate" defaultValue={this.props.selectedtask.end_date} required/>
          {this.state.date_error}
         </div>
         <div className="form-group">
          <label> Status:</label>
          <select onChange={this.handleChange} className="form-control" defaultValue={this.props.selectedtask.status} required>
           <option value="">Select</option>
           <option value="ASSIGNED">ASSIGNED</option>
           <option value="INPROGRESS">INPROGRESS</option>
           <option value="FINISHED">FINISHED</option>
          </select>
         </div>

         <button type="submit" className="btn btn-success" >Update</button>
        </form>


      </div>
      </div>
      );
   }
}
