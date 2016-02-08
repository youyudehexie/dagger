import merge from 'lodash/merge'
import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as _ from 'lodash';

import projects from './projects';


function entities(state = { }, action) {
    if (action.response && action.response.entities) {
        return _.merge({}, state, action.response.entities);
    }

    return state;
}


const rootReducer = combineReducers({
    entities,
    projects,
    routing: routeReducer,
})


export default rootReducer
