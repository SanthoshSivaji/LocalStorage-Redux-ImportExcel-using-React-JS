import React from 'react';
// import SelectSearch from 'react-select-search';
import Select from 'react-select';
import './select.css';
import './select1.css';
import axios from 'axios';
//Africa, Americas, Asia, Europe, Oceania
const Region = [
    { label : "Africa", value: "Africa" },
    { label : "Americas", value: "Americas" },
    { label : "Asia", value: "Asia" },
    { label : "Europe", value: "Europe" },
    { label : "Oceania", value: "Oceania" },
]

class API extends React.Component {   

    constructor(){
        super();
        this.state= {
            CapitalName : "",
            Flag : "",
            FillCountry : [],
        } 
    }    

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => console.log(response));
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
    
    OnSelectCountry = (e) => {
        console.log(e.value);
        axios.get('https://restcountries.eu/rest/v2/name/' + e.value + '?fullText=true')
            .then(response => { 
                    
                    response.data.map((data, ind)=> (this.setState({Flag : data.flag,CapitalName : data.capital })))
                }
            );
    }

    render(){
        return(
            <div> 
                <h1>API</h1>
                <div className="col-sm-4 floatleft">
                    <div className="control-label">Region</div>
                    <Select options={Region} onChange={this.OnSelectRegion} />
                </div>
                <div className="col-sm-4 floatleft">
                    <div className="control-label">Country Name</div>
                    <Select options={this.state.FillCountry} onChange={this.OnSelectCountry} />
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
        );
    }
}

export default API;