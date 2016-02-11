import * as ActionTypes from '../../src/constants/action';

export default function projects(state = { ids: []}, action) {
    switch (action.type) {
        case ActionTypes.CREATE_PROJECT:
            if (state.ids.indexOf(action.response.result) == -1) {
                state.ids.push(action.response.result);
            }
            return Object.assign({}, state);
        default:
            return state;
    }
}


