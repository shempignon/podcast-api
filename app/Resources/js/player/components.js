import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvPause from 'material-ui/svg-icons/av/pause'
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off'
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up'
import { play, pause, mute, unmute, updateVolume } from './actions'

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
        const { isPlaying, play, pause, muted, mute, unmute, volume, updateVolume } = this.props

        return (
            <Paper zDepth={4} style={style.player}>
                <Checkbox
                    checked={isPlaying}
                    checkedIcon={<AvPause />}
                    uncheckedIcon={<AvPlayArrow />}
                    onCheck={(e, playing) => ((playing) ? play() : pause())}
                />
                <Checkbox
                    checked={muted}
                    checkedIcon={<AvVolumeOff />}
                    uncheckedIcon={<AvVolumeUp />}
                    onCheck={(e, muted) => ((muted) ? mute() : unmute())}
                />
                <Slider style={{width: 100}} axis="x" value={volume} onChange={(e, newVolume) => updateVolume(newVolume)} />
            </Paper>
        )
    }
}

export default connect(
    state => ({ isPlaying: state.player.isPlaying, muted: state.player.muted, volume: state.player.volume }),
    { play, pause, mute, unmute, updateVolume }
)(Player)
