import React, { Component } from 'react'
import { connect } from 'react-redux'
import { playSong } from '../player/actions'
import { fetchLatestEpisodes, key } from './actions'
import { PodcastList } from '../podcastList'

export class LatestPodcast extends Component {
  componentDidMount () {
    this.props.fetchLatestEpisodes()
  }

  render () {
    const { episodes, playSong } = this.props

    return (
      <PodcastList
        episodes={episodes}
        playSong={playSong}
      />
    )
  }
}

export default connect(
  state => ({ episodes: state[key].episodes }),
  { playSong, fetchLatestEpisodes }
)(LatestPodcast)
