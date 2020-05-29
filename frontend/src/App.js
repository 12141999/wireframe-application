import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './App.css';
import {connect} from 'react-redux';
import * as actionCreators from './actions/action.js';

class App extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {

    const {loadEmpDropdown} = this.props;
    loadEmpDropdown();   

  }

  getSurveyData(empName) {

    const {getSurveyData} = this.props;
    getSurveyData(empName);

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

    // const {addSuvey} = this.props;
    // addSuvey(surveyName , empName);


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

    // const {removeSurvey} = this.props;
    // removeSurvey(surveyName , empName);


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

    // const {onsubmit} = this.props;
    // onsubmit(data);

  }


  render() {

    let dropdown = '';
    if (this.props.employeeDropdown) {
      dropdown = this.props.employeeDropdown.map((i, index) => {
        return (
          <a href="#" key={index} onClick={() => this.getSurveyData(i.name)} className="dropdown-item">
            {i.name}
          </a>
        );
      })
    }

    let survey = '';
    if (this.props.employeeSurvey.survey) {
      survey = this.props.employeeSurvey.survey.map((i,index) => {
        return (
          <div>
          <p key={index}>{i}<button onClick={() => this.addSuvey(i,this.props.employeeSurvey.name)} className="button is-info is-light">Add</button></p><br></br>
          </div>
        )
      })
    }

    let assignedSurvey = '';
    if (this.props.employeeSurvey.assignedSurvey) {
      assignedSurvey = this.props.employeeSurvey.assignedSurvey.map((i,index) => {
        return (
          <div>
          <p key={index}>{i}<button onClick={() => this.removeSurvey(i,this.props.employeeSurvey.name)} className="button is-info is-light">Remove</button></p><br></br>
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

        <button onClick={() => this.onsubmit(this.props.employeeSurvey)} className="button is-success">Done</button>


      </div>


    );

  }
}

const mapStateToProps = (state) => {
  return state;
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchProducts: fetchProductsAction
// }, dispatch)


export default connect(mapStateToProps , actionCreators)(App);
