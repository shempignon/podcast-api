import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import { playSong } from '../player/actions'
import { fetchLatestEpisodes } from './actions'
import Avatar from 'material-ui/Avatar'

export class LatestPodcast extends Component {
  componentDidMount () {
    this.props.fetchLatestEpisodes()
  }

  render () {
    const { episodes, playSong } = this.props

    return (
      <List>
        {episodes.map(episode =>
          <ListItem
            key={episode.url}
            primaryText={episode.name}
            leftAvatar={<Avatar src={episode.feed.image} />}
            secondaryText={(new Date(episode.broadcastedOn)).toLocaleDateString()}
            onTouchTap={() => playSong(episode.url)}
          />
        )}
      </List>
    )
  }
}

export default connect(
  state => ({ episodes: state.latestEpisodes.episodes }),
  { playSong, fetchLatestEpisodes }
)(LatestPodcast)
