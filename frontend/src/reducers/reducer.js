let initialState = {
    employeeDropdown: [],
    employeeSurvey: {}
}

const mainReducer = (state = initialState, action) => {
    console.log("mainreducer", action);
    if (action.type === "GET_EMP_DROPDOWN") {
        return {
            ...state,
            employeeDropdown: action.payload
        }

    }
    else if (action.type === "GET_SURVEY") {
        return{
            ...state,
            employeeSurvey : action.payload
        }
    }
    else {
        return {
            ...state
        }
    }
}

export default mainReducer;