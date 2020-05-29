import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // this.onFileChange = this.onFileChange.bind(this);

    this.state = {
      employeeDropdown: [],
      employeeSurvey: {}
    }
  }


  componentDidMount() {

    axios.get("http://localhost:4000/getAllEmpDetails").then((res) => {
      this.setState({ employeeDropdown: res.data });

    }).catch((e) => {
      // self.setState({ responseStatus: 200, loading: false });
      console.log("err is occured", e);
    })

  }

  getSurveyData(empName) {

    let formData = new FormData();

    let entries = formData.entries();
    for (let pair of entries) {
      formData.delete(pair[0]);
    }

    formData.append('emp', empName);

    axios.post("http://localhost:4000/getEmpDetails", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then((res) => {
      ;
      console.log("get survey data", res.data[0]);
      this.setState({ employeeSurvey : res.data[0] });
    }).catch((e) => {
      console.log("err is occured", e);
    })
  }

  addSuvey(surveyName , empName){
    let formData = new FormData();

    let entries = formData.entries();
    for (let pair of entries) {
      formData.delete(pair[0]);
    }

    formData.append('emp', empName);
    formData.append('survey', surveyName);

    axios.post("http://localhost:4000/updateEmpWithSurvey", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then((res) => {
      console.log("get survey data", res.data.nModified);
      if(res.data.nModified){
        this.getSurveyData(empName);
      }
    }).catch((e) => {
      console.log("err is occured", e);
    })


  }

  removeSurvey(surveyName , empName){
    let formData = new FormData();

    let entries = formData.entries();
    for (let pair of entries) {
      formData.delete(pair[0]);
    }

    formData.append('emp', empName);
    formData.append('survey', surveyName);

    axios.post("http://localhost:4000/removeSurvey", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then((res) => {
      console.log("get survey data", res.data);
      if(res.data.nModified){
        this.getSurveyData(empName);
      }
    }).catch((e) => {
      console.log("err is occured", e);
    })


  }

  onsubmit(data){
    let formData = new FormData();

    let entries = formData.entries();
    for (let pair of entries) {
      formData.delete(pair[0]);
    }

    formData.append('name', data.name);
    formData.append('survey', data.survey);
    formData.append('assignedSurvey', data.assignedSurvey);

    axios.post("http://localhost:4000/onsubmit", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then((res) => {
      console.log("final submit result", res);
    }).catch((e) => {
      console.log("err is occured", e);
    })

  }


  render() {

    let dropdown = '';
    if (this.state.employeeDropdown) {
      dropdown = this.state.employeeDropdown.map((i, index) => {
        return (
          <a href="#" key={index} onClick={() => this.getSurveyData(i.name)} className="dropdown-item">
            {i.name}
          </a>
        );
      })
    }

    let survey = '';
    if (this.state.employeeSurvey.survey) {
      survey = this.state.employeeSurvey.survey.map((i,index) => {
        return (
          <div>
          <p key={index}>{i}<button onClick={() => this.addSuvey(i,this.state.employeeSurvey.name)} className="button is-info is-light">Add</button></p><br></br>
          </div>
        )
      })
    }

    let assignedSurvey = '';
    if (this.state.employeeSurvey.assignedSurvey) {
      assignedSurvey = this.state.employeeSurvey.assignedSurvey.map((i,index) => {
        return (
          <div>
          <p key={index}>{i}<button onClick={() => this.removeSurvey(i,this.state.employeeSurvey.name)} className="button is-info is-light">Remove</button></p><br></br>
          </div>
        )
      })
    }

    return (

      <div id="center">

        <h1><center>Select Employee</center></h1><br></br>


        <div id="dropdown" className="dropdown is-hoverable" >
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-ui-actions">
              <span>Employee</span>
              <span className="icon is-small">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-ui-actions" role="menu">
            <div className="dropdown-content">
              {dropdown}
            </div>
          </div>
        </div><br></br><br></br><br></br>


        <div className="columns">
          <div className="column">
            <div className="card">
              <h2 className="subtitle">Survey</h2>
              {survey}
            </div>
          </div>
          <div className="column">
            <div className="card">
              <h2 className="subtitle">Assigned Survey</h2>
              {assignedSurvey}
            </div>
          </div>
        </div>

        <button onClick={() => this.onsubmit(this.state.employeeSurvey)} className="button is-success">Done</button>


      </div>


    );

  }
}


export default App;
