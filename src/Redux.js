import React from 'react';
import {connect } from 'react-redux';
import axios from 'axios'
import './select.css';
import './select1.css';
import Select from 'react-select';
import isEqual from "lodash/isEqual";



const Region = [
    { label : "Africa", value: "Africa" },
    { label : "Americas", value: "Americas" },
    { label : "Asia", value: "Asia" },
    { label : "Europe", value: "Europe" },
    { label : "Oceania", value: "Oceania" },
]



class Redux extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            CapitalName : "",
            Flag : "",
            FillCountry : [],
        } 
        //JSON.parse(props.data).data.map((data, ind)=> (this.setState({Flag : data.flag,CapitalName : data.capital })))
    }

    componentDidUpdate(prevProps) {
        //console.log(this.props);
        const { data } = this.props

        if (!isEqual(prevProps.data, this.props.data)) {
            console.log(this.props.data);
            console.log(this.props.data.capital)
            this.setState({ CapitalName : this.props.data.capital, Flag : this.props.data.flag})
        }
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
        const {state: { CapitalName }} = this;
        return(

            

            <div> 
                <h1> Redux Concepts </h1>

                <div> 
                    <div className="col-sm-4 floatleft">
                        <div className="control-label">Region</div>
                        <Select options={Region} onChange={this.OnSelectRegion} />
                    </div>
                    <div className="col-sm-4 floatleft">
                        <div className="control-label">Country Name</div>
                        <Select options={this.state.FillCountry} onChange={(e) => this.props.validate(e)} />
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

                {/* <button onClick={() => this.props.validate()} > Redux Click </button> */}
                {/* <div className="col-sm-12 floatleft">
                    <label> Capital : <span> <b>{this.state.CapitalName}</b> </span> </label>
                    &emsp;
                    &emsp;
                    <img src={this.state.Flag} className="img" alt="Flag" height="100px" width="300px"></img>
                </div> */}
            </div>
        )
    }
}

const Middleware = (e) => {
    return dispatch => { 
        dispatch({type : "START"});
        
        console.log(e.value);
        // fetch('https://restcountries.eu/rest/v2/name/' + e.value + '?fullText=true')
        // .then(response => {  console.log(response) })
        // .catch(err => dispatch({type : "FAIL", error : "ERROR" }))

        axios.get('https://restcountries.eu/rest/v2/name/' + e.value + '?fullText=true')
            .then(response => { 
                    let ss = JSON.stringify(response.data[0]);
                     //console.log(response.data);
                    dispatch({type : "PROCESS", data : response.data[0]});
                    //this.setState({FillCountry : JSON.parse(this.props.data).map((data, ind)=> ({ label:data.name, value : data.name}))})
                }
            ).catch(err => dispatch({type : "FAIL", error : "ERROR" }));
            
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        validate : (e) => dispatch(Middleware(e))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Redux);