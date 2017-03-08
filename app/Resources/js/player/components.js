import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvPause from 'material-ui/svg-icons/av/pause'
import { play, pause, toggleSound, updateVolume } from './actions'

const style = {
    player: {
        position: 'fixed',
        padding: '10px',
        bottom: 0,
        left: 0,
        right: 0
    }
}

class Player extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { isPlaying, muted, volume, play, pause } = this.props
        return (
            <Paper zDepth={4} style={style.player}>
                <Checkbox
                    checked={isPlaying}
                    checkedIcon={<AvPause />}
                    uncheckedIcon={<AvPlayArrow />}
                    onCheck={(e, playing) => ((playing) ? play() : pause())}
                />
            </Paper>
        )
    }
}

export default connect(
    state => ({ isPlaying: state.player.isPlaying, muted: state.player.muted, volume: state.player.volume  }),
    { play, pause, toggleSound, updateVolume }
)(Player)
