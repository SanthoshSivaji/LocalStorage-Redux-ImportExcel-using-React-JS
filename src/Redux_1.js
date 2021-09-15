import React from 'react';
import {connect, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import './select.css';
import './select1.css';
import Select from 'react-select';

const Region = [
    { label : "Africa", value: "Africa" },
    { label : "Americas", value: "Americas" },
    { label : "Asia", value: "Asia" },
    { label : "Europe", value: "Europe" },
    { label : "Oceania", value: "Oceania" },
]

class Redux1 extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            CapitalName : "",
            Flag : "",
            FillCountry : [],
        } 
        //JSON.parse(props.data).data.map((data, ind)=> (this.setState({Flag : data.flag,CapitalName : data.capital })))
    }


    OnSelectRegion = (e) => {
        console.log(e.value);
        axios.get('https://restcountries.eu/rest/v2/region/'+ e.value)
            .then(
                response => 
                {
                    this.setState({FillCountry : []})
                    this.setState({FillCountry : response.data.map((data, ind)=> ({ label:data.name, value : data.name}))})
                }
            );
    }

    render() {
        return(           

            <div> 
                <h1> Redux Concepts 1 </h1>

                <div> 
                    <div className="col-sm-4 floatleft">
                        <div className="control-label">Region</div>
                        <Select options={Region} onChange={this.OnSelectRegion} />
                    </div>
                    <div className="col-sm-4 floatleft">
                        <div className="control-label">Country Name</div>
                        <Select options={this.state.FillCountry} onChange={(e) => this.props.validateGet(e)} />
                    </div>
                    <br></br>
                    <br></br>
                    <div className="col-sm-12 floatleft">
                        <label> Capital : <span> <b>{this.state.CapitalName}</b> </span> </label>
                        &emsp;
                        &emsp;
                        <img src={this.state.Flag} className="img" alt="Flag" height="100px" width="300px"></img>
                    </div>                
                </div>

                <br />
                <h1> Loading :  {this.props.loading ? "true" : "false"}</h1>
                <br />
                <p> Data :  {JSON.stringify(this.props.data)}</p>
                <br />
                <h1> Error :  {this.props.error}</h1>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("state");
    console.log(state);
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        validateGet : (e) => dispatch({type : "PUT", data : "India"})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Redux1);