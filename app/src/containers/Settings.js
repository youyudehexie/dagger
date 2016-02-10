import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../pages/Settings/Settings';

function mapStateToProps(state, props) {
    const {
        entities: {projects},
    } = state;

    const project = projects && projects[props.params.id] || {};

    return {
        project
    };
}

export default connect(mapStateToProps, {
})(Settings);


