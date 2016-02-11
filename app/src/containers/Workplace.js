import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Workplace from '../pages/Workplace/Workplace';
import * as projectActions from '../actions/project';
import * as _ from 'lodash';

function mapStateToProps(state, props) {
    const {
        entities: {projects},
    } = state;

    const project = projects && projects[props.params.id] || {};
    let posts = project.resources && project.resources.db && project.resources.db.models.Post || [];
    posts = _.sortBy(posts, (post) => {
        return (new Date(post.date)).getTime()*(-1);
    });

    return {
        posts,
        project,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workplace);


