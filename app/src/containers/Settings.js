import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../pages/Settings/Settings';

import * as projectActions from '../actions/project';

function mapStateToProps(state, props) {
    const {
        entities: {projects},
    } = state;

    const project = projects && projects[props.params.id] || {};

    return {
        project
    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);



