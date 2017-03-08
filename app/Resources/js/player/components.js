import React, { Component } from 'react'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvPause from 'material-ui/svg-icons/av/pause'
import { play, pause, toggleSound, updateVolume } from './actions'

const style = {
    checkbox:{
        marginBottom: 16
    },
    player:{
        position: 'fixed',
        padding: '10',
        bottom: 0,
        left: 0,
        right: 0
    }
}

class Player extends Component {
    constructor(props) {
        super(props)
    }

    togglePlaying(playing) {
        const { play, pause } = this.props

        return (playing) ? play() : pause()
    }

    render() {
        const { isPlaying, muted, volume } = this.props
        return (
            <Paper zDepth={4} style={style.player}>
                <Checkbox
                    checked={isPlaying}
                    style={style.checkbox}
                    checkedIcon={<AvPause />}
                    uncheckedIcon={<AvPlayArrow />}
                    onCheck={(e, playing) => this.togglePlaying(playing)}
                />
            </Paper>
        )
    }
}

export default connect(
    state => ({ isPlaying: state.player.isPlaying, muted: state.player.muted, volume: state.player.volume  }),
    { play, pause, toggleSound, updateVolume }
)(Player)
