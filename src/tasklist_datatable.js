import React from 'react';

class tasklist_datatable extends React.Component {
    render() {
        const items = this.props.TaskData;
        return(
            <table border="1px">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Task Title</th>
                        <th>Task Date</th>
                        <th>Task Desc</th>
                        <th>Task Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //console.log(this.state.TaskData)

                        items.map((data, ind) => (
                            
                            <tr  border="1px">
                                <td>{data.taskid}</td>
                                <td>{data.tasktitle}</td>
                                <td>{data.taskdate}</td>
                                <td>{data.taskdesc}</td>
                                <td>{data.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default tasklist_datatable;