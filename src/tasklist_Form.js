import React from 'react';
import tasklist_datatable from './tasklist_datatable';
import { Link, RouteComponentProps } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import tasklist_home from './tasklist_home';

class tasklistForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            taskid : 1,
            tasktitle : "",
            taskdate : "",
            taskdesc : "",
            status : true,
            TaskData : [],
        }
    }
    
    
    ChangeEvent = (e)=> {
        this.setState({[e.target.name]: e.target.value});        
    }

    CheckBoxChangeEvent = (e)=> {
        this.setState({[e.target.name]: e.target.checked});
    }

    ClearAllData = (e) => {
        let r = window.confirm(" Are you sure want to Delete ALL Data...! ");
        if(r) {
            localStorage.clear();
            alert("All Data cleared...!");

            this.setState({ TaskData: [] });
        }
    }

    componentDidMount() {
        if(localStorage.getItem('tasklistdata') != null) {
            this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
        }
    }

    ClearDefaultALL= (e) =>  {
        this.setState({ taskid : 0,tasktitle : "",taskdate : "",taskdesc: "",status : true });
    }

    Validate_Forms= (e) =>  {
        if(this.state.tasktitle == "" || this.state.taskdesc == "" || this.state.taskdate == "") {
            alert("Form fields should not be empty...!");

            return false;
        }

        return true;
    }

    deleteData = (e) => {
        let r = window.confirm("Do you want to delete this item");
        if (r === true) {
            let id = parseInt(e.target.id);
            console.log(e.target.id);
            if(localStorage.getItem('tasklistdata') != null) {
                this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
            }

            let filteredList = this.state.TaskData.filter(x => x.taskid !== id);

            console.log(this.state.TaskData);
            this.setState({ TaskData: filteredList });

            localStorage.setItem('tasklistdata',JSON.stringify(filteredList));

        }
      }
    
    UpdateData = (e) => {
        if(this.Validate_Forms()) {
            let r = window.confirm("Are you sure want to update...! ");
            if(r === true) {
                let id = parseInt(this.state.taskid);
                if(localStorage.getItem('tasklistdata') != null) {
                    this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
                }

                let toUpdateData = this.state.TaskData.map((item) => {    
                    if (item.taskid === this.state.taskid) {
                        item.tasktitle = this.state.tasktitle;
                        item.taskdate = this.state.taskdate;
                        item.taskdesc = this.state.taskdesc;
                        item.status = this.state.status;
                    }
                    return item;
                });

                this.setState({ TaskData: toUpdateData });
                
                localStorage.setItem('tasklistdata', JSON.stringify(this.state.TaskData));

                this.ClearDefaultALL();
            }
        }
    }

    EditFillData = (e) => {
        let r = true;
        if(r === true) {
            let id = parseInt(e.target.id);
            if(localStorage.getItem('tasklistdata') != null) {
                this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
            }

            let returnData;
            let filteredData = this.state.TaskData.map((item) => {    
                if (item.taskid === id) {
                    returnData = item;
                    return returnData;
                }
              });
            this.setState({ taskid : returnData.taskid,tasktitle : returnData.tasktitle,taskdate : returnData.taskdate,taskdesc: returnData.taskdesc, status : returnData.status,TaskData : this.state.TaskData });
        }
    }

    FormSubmitEvent = (e)=> {       

        if(this.Validate_Forms()) {
            let items = [...this.state.TaskData];

            let i = 1;
            if(localStorage.getItem('tasklistdata') != null) {
                this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
                i = this.state.TaskData.length + 1;
            }  

            items.push({
                    taskid : i,
                    tasktitle : this.state.tasktitle,
                    taskdate : this.state.taskdate,
                    taskdesc : this.state.taskdesc,
                    status : this.state.status,
            });

            this.setState({ TaskData: items });
            localStorage.setItem('tasklistdata', JSON.stringify(items));

            this.ClearDefaultALL();
        }

    }


    Show_All_Data = (e) => {
        if(localStorage.getItem('tasklistdata') != null) {
            this.setState({ TaskData : JSON.parse(localStorage.getItem('tasklistdata')) });
        }  
    }

    Show_Active_Data = (e) => {
        let listData = [];
        if(localStorage.getItem('tasklistdata') != null) {
            listData = JSON.parse(localStorage.getItem('tasklistdata'));
        }  

        let filteredList = listData.filter(x => x.status);
        this.setState({ TaskData: filteredList });
    }

    Show_InActive_Data = (e) => {
        let listData = [];
        if(localStorage.getItem('tasklistdata') != null) {
            listData = JSON.parse(localStorage.getItem('tasklistdata'));
        }  
        let filteredList = listData.filter(x => !x.status);
        this.setState({ TaskData: filteredList });
    }    

    render() {
        return(
            <div className="">
                <div className="col-sm-12">
                    <br />
                        <h1>Task Management</h1>
                    <br />
                </div>
                <div className="col-sm-12">
                    <div id="customerAction">
                        <div className="col-sm-2 float-left">
                            <label className="control-label">Task title *</label>
                            <input id="TaskName" type="text" className="form-control" name="tasktitle" autoComplete="off" value={this.state.tasktitle} onChange={this.ChangeEvent} />
                        </div>
                        <div className="col-sm-3 float-left">
                            <label>Date *</label>
                            <input id="TaskDate" type="datetime-local" className="form-control" name="taskdate" autoComplete="off" value={this.state.taskdate} onChange={this.ChangeEvent} />
                        </div>
                        <div className="col-sm-2 float-left">
                            <label>Task Description *</label>
                            <input id="TaskDescription" className="form-control" type="text" name="taskdesc" autoComplete="off"  value={this.state.taskdesc} onChange={this.ChangeEvent} />
                        </div>
                        <div className="col-sm-2 float-left">
                            <label>Task Status *</label>
                            <input type="checkbox" id="TaskStatus" name="status" checked={ this.state.status } onChange={this.CheckBoxChangeEvent}  />
                        </div>
                        <div className="col-sm-3 float-left mt-n1" style={{ "margin-top": "25px" }}>
                            <button className="btn btn-primary" onClick={this.FormSubmitEvent}>Add New</button>
                            &nbsp;
                            <button className="btn btn-success" onClick={this.UpdateData}>Update</button>
                            &nbsp;
                            <button className="btn btn-danger" onClick={this.ClearDefaultALL} >Cancel</button>                            
                        </div>
                        <br />
                        <br />
                        <div className="col-sm-12 float-left" >
                        <br />
                        
                            <button className="btn btn-warning" onClick={this.Show_All_Data} >Show All Records</button>
                            &nbsp;
                            <button className="btn btn-info" onClick={this.Show_Active_Data}>Show Active </button>
                            &nbsp;
                            <button className="btn btn-secondary" onClick={this.Show_InActive_Data} >Show In-active </button>
                            &emsp;
                            &emsp;
                            <button className="btn btn-danger" onClick={this.ClearAllData}>Clear ALL data</button>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div id="display" className="col-sm-12"> 
                            <table border="1px" className="table">
                                <thead className="table-light">
                                    <tr>
                                        <th>Id</th>
                                        <th>Task Title</th>
                                        <th>Task Date</th>
                                        <th>Task Desc</th>
                                        <th>Task Status</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.TaskData.map((data, ind) => (                                        
                                        <tr  border="1px">
                                            <td>{data.taskid}</td>
                                            <td>{data.tasktitle}</td>
                                            <td>{data.taskdate}</td>
                                            <td>{data.taskdesc}</td>
                                            <td>
                                                <input type="checkbox" id=""  checked={ data.status }  />
                                            </td>
                                            <td><span onClick={this.EditFillData} id={data.taskid}> Edit</span></td>
                                            <td><span onClick={this.deleteData} id={data.taskid}> Delete</span></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default tasklistForm;