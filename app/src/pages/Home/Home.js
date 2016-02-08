import React, { Component, PropTypes } from 'react';

import List from 'material-ui/lib/lists/list'; import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import Colors from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FlatButton from 'material-ui/lib/flat-button';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RaisedButton from 'material-ui/lib/raised-button';

import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress';
import LinearProgress from 'material-ui/lib/linear-progress';


import TopNav from '../../components/TopNav/TopNav';
import PJMenu from '../../components/PJMenu/PJMenu';
import Project from '../../lib/Project';

import './Home.scss';

class ListProgress extends Component {

    render() {
        const { max, value } = this.props;
        const progress = (value/max);
        const width = `${progress.toFixed(2)*100}%`
        const style = {
            width,
            opacity: max == value ? 0 : 0.75
        }

        return <div className="pj__progress" style={style} ></div>
    }

}

ListProgress.propTypes = {
  max: PropTypes.number,
  value: PropTypes.number,
}


export default class Home extends Component {
    constructor(props) {
    super(props);

    this.state = {
        open: false,
        test: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleCreate = () => {
    this.setState({test: !this.state.test});
  };


  handleNewProject = (project) => {
      const {email, password, repo, path } = project;
      return this.props.projectActions.createProject(email, password, repo, path);
  };

  handleCreateCheck = (project) => {
      const {email, password, repo, path } = project;
      return this.props.projectActions.checkCreateEnv(email, password, repo, path);
  };

  render() {
    const { Projects } = this.props;
    console.log(Projects);

    return (
      <div className="home">
        <TopNav />
        <PJMenu onNewProject={this.handleNewProject} onCreateCheck={this.handleCreateCheck}/>
        <div className="home__pj">
            <List insetSubheader={true}>
            {
                Projects.map((project) => {
                    return (
                    <div className="pj__item" key={project.id}>
                        <ListProgress 
                            max={project.flow.max} 
                            value={project.flow.value}
                        />

                        <ListItem
                            leftAvatar={<Avatar icon={<FileFolder />} />}
                            rightIcon={<ActionInfo />}
                            primaryText={project.account.repo}
                        />
                    </div>
                    )
                })
            }
            </List>
        </div>
      </div>
    );
  }
} 

