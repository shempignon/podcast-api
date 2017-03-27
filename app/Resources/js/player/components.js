import React from 'react'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AvPause from 'material-ui/svg-icons/av/pause'
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off'
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up'
import { play, pause, mute, unmute, updateVolume, setTime } from './actions'

const style = {
  slider: {
    marginTop: '0px',
    marginBottom: '0px'
  },
  input: {
    width: 'auto',
    marginTop: '24px',
    marginBottom: '24px'
  },
  player: {
    position: 'fixed',
    display: 'inline-flex',
    justifyContent: 'space-around',
    padding: '10px',
    bottom: 0,
    left: 0,
    right: 0
  }
}

function Player ({isPlaying, play, pause, muted, mute, unmute, volume, updateVolume, completed, setTime}) {
  return (
    <Paper zDepth={4} style={style.player}>
      <Checkbox
        checked={isPlaying}
        style={style.input}
        checkedIcon={<AvPause />}
        uncheckedIcon={<AvPlayArrow />}
        onCheck={(e, playing) => ((playing) ? play() : pause())}
      />
      <Checkbox
        checked={muted}
        style={style.input}
        checkedIcon={<AvVolumeOff />}
        uncheckedIcon={<AvVolumeUp />}
        onCheck={(e, muted) => ((muted) ? mute() : unmute())}
      />
      <Slider style={{ ...style.slider, width: '80%' }} sliderStyle={style.input} axis="x" value={completed} max={100} onChange={(e, newTime) => setTime(newTime)}/>
      <Slider style={{ ...style.slider, width: '10%' }} sliderStyle={style.input} axis="x" value={volume} onChange={(e, newVolume) => updateVolume(newVolume)} />
    </Paper>
  )
}

export default connect(
    state => ({ isPlaying: state.player.isPlaying, muted: state.player.muted, volume: state.player.volume, completed: state.player.completed }),
    { play, pause, mute, unmute, updateVolume, setTime }
)(Player)
