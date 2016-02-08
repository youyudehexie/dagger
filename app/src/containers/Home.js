import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../pages/Home/Home';
import * as projectActions from '../actions/project';

function mapStateToProps(state) {
    const {
        entities,
        projects
    } = state;

    let Projects = projects.ids.map((project) => {
        return entities.projects[project];
    })

    console.log('hahah')
    console.log(Projects);
    console.log('hahah')

    return {
        Projects
    };
}


function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


