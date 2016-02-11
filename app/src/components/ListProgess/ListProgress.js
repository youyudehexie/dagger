import React, { Component, PropTypes } from 'react';

export default class ListProgress extends Component {

    render() {
        const { max, value, progressCls } = this.props;
        const progress = (value/max);
        const width = `${progress.toFixed(2)*100}%`;
        const style = {
            position: 'absolute',
            height: '100%',
            width,
            opacity: max == value ? 0 : 0.75
        }

        return <div className={progressCls} style={style} ></div>
    }
}

ListProgress.propTypes = {
    max: PropTypes.number,
    progressCls: PropTypes.string,
    value: PropTypes.number,
}
