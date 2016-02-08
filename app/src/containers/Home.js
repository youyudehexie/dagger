import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../pages/Home/Home';
import * as projectActions from '../actions/project';

function mapStateToProps(state) {
    return {
    };
}


function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


