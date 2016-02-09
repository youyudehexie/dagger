import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Workplace from '../pages/Workplace/Workplace';
import * as projectActions from '../actions/project';

function mapStateToProps(state) {
    const {
        entities,
        projects,
    } = state;

    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    }
}

export default connect(mapStateToProps, {
})(Workplace);


