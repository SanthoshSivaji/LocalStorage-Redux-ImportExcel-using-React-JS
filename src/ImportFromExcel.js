import React from 'react';
import {ExcelRenderer} from 'react-excel-renderer';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'; 

class ImportExcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            isFormInvalid: false,
            rows: null,
            cols: null
        }
        this.fileHandler = this.fileHandler.bind(this);
        this.renderFile = this.renderFile.bind(this);

    }

    renderFile = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err) {
            console.log(err);
          }
          else {
            this.setState({
              dataLoaded: true,
              cols: resp.cols,
              rows: resp.rows
            });
          }
          console.log(resp);
        }); 
    }
  
    fileHandler = (event) => {    
      if(event.target.files.length) {
        let fileObj = event.target.files[0];
        let fileName = fileObj.name;
  
        
        //check for file extension and pass only if it is .xlsx and display error message otherwise
        if(fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
          this.setState({
            uploadedFileName: fileName,
            isFormInvalid: false
          });
          this.renderFile(fileObj)
        }
        else{
          this.setState({
            isFormInvalid: true,
            uploadedFileName: ""
          })
        }
      }               
    }



    render() {
        return(
            <div>
                <h1>Import Data From Excel</h1>
                <br></br>
                <div className="col-sm-4">
                
                    <input type="file" placeholder="Browse &hellip;" onChange={this.fileHandler.bind(this)} onClick={(event)=> { event.target.value = null }} style={{"padding":"10px"}}  />
                </div>
                {this.state.dataLoaded && 
                <div>
                    {/* <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /> */}

                    <table border="1px" className="table table-bordered table-hover" id="tblname">                       
                        <thead  className="table-light">
                            
                            <tr>
                                {
                                this.state.rows[0].map((data, ind) => (
                                    
                                    <th>{data}</th>
                                ))
                                }
                            </tr>
                            
                        </thead> 
                        <tbody>
                            {
                                this.state.rows.map((data, ind) => {
                                    if(ind > 1) {
                                        return (
                                            <tr>
                                                {data.map(val => (
                                                    <td>{val}</td>
                                                ))}
                                            </tr>
                                        )
                                    }
                                })
                            }
                            
                        </tbody>                      
                    </table>
                </div>}

                <div>  
                    <ReactHTMLTableToExcel  className="btn btn-info"  table="tblname" filename="ReportExcel" sheet="Sheet1"  buttonText="Export excel" />                 
                </div> 
            </div>
            
        )
    }
}

export default ImportExcel;