import React, { Component, PropTypes } from 'react';

export default class ProjectList extends Component {
    render() {
        const { Projects } = this.props;
        return (
            <div className="home__pj">
                <List insetSubheader={true}>
                {
                    Projects.map((project) => {
                        return (
                        <div className="pj__item" key={project.id}>
                            <ListProgress 
                                progressCls="pj__progress"
                                max={project.flow.max} 
                                value={project.flow.value}
                            />

                            <ListItem
                                onClick={this.handleClick.bind(this, project.id)}
                                leftAvatar={<Avatar icon={<FileFolder />} />}
                                primaryText={project.account.repo}
                            />
                        </div>
                        )
                    })
                }
                </List>
            </div>
        )
    }

}
