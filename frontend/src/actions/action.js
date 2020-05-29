import axios from 'axios';

exports.loadEmpDropdown = ()  => {
    return (dispatch) => {
        return axios.get("http://localhost:4000/getAllEmpDetails").then((res) => {
            dispatch(getEmpDrodown(res.data));
        }).catch((e) => {
            console.log("err is occured", e);
        })
    }
}

exports.getSurveyData = (empName)  => {
    return (dispatch) => {
        let formData = new FormData();

        let entries = formData.entries();
        for (let pair of entries) {
            formData.delete(pair[0]);
        }

        formData.append('emp', empName);

        return axios.post("http://localhost:4000/getEmpDetails", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then((res) => {
            dispatch(getSurvey(res.data[0]));
            console.log("get survey data", res.data[0]);
        }).catch((e) => {
            console.log("err is occured", e);
        })
    }
}

// exports.addSuvey = (surveyName, empName) => {
//     return (dispatch) => {
//         let formData = new FormData();

//         let entries = formData.entries();
//         for (let pair of entries) {
//             formData.delete(pair[0]);
//         }

//         formData.append('emp', empName);
//         formData.append('survey', surveyName);

//         return axios.post("http://localhost:4000/updateEmpWithSurvey", formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//           ).then((res) => {
//             console.log("get add survey data", res.data.nModified);
//             if(res.data.nModified){
//                  getSurveyData(empName);
//             }
//           }).catch((e) => {
//             console.log("err is occured", e);
//           })
//     }
// }

// exports.removeSurvey = (surveyName , empName) => {
//     let formData = new FormData();

//     let entries = formData.entries();
//     for (let pair of entries) {
//       formData.delete(pair[0]);
//     }

//     formData.append('emp', empName);
//     formData.append('survey', surveyName);

//     return axios.post("http://localhost:4000/removeSurvey", formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }
//     ).then((res) => {
//       console.log("get survey data", res.data);
//       if(res.data.nModified){
//        getSurveyData(empName);
//       }
//     }).catch((e) => {
//       console.log("err is occured", e);
//     })


//   }

// exports.onsubmit =  (data)  => {
//     let formData = new FormData();

//     let entries = formData.entries();
//     for (let pair of entries) {
//       formData.delete(pair[0]);
//     }

//     formData.append('name', data.name);
//     formData.append('survey', data.survey);
//     formData.append('assignedSurvey', data.assignedSurvey);

//     return axios.post("http://localhost:4000/onsubmit", formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     }
//     ).then((res) => {
//       console.log("final submit result", res);
//     }).catch((e) => {
//       console.log("err is occured", e);
//     })

//   }

export function getSurvey(data) {
    console.log("get Emp Dropdown", data);
    return {
        type: "GET_SURVEY",
        payload: data
    }
}


export function getEmpDrodown(data) {
    console.log("get Emp Dropdown", data);
    return {
        type: "GET_EMP_DROPDOWN",
        payload: data
    }
}

