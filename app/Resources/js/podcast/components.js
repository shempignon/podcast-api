import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPodcast } from './actions'
import { List, ListItem } from 'material-ui/List'
import { closeDrawer } from '../layout/actions'
import { playSong } from '../player/actions'

class Podcast extends Component {
  componentDidMount () {
    if (this.props.podcast.name === '') {
      this.props.selectPodcast(this.props.routeParams.slug)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { routeParams, selectPodcast, closeDrawer } = this.props
    const newSlug = nextProps.routeParams.slug
    if (routeParams.slug !== newSlug) {
      selectPodcast(newSlug)
    }

    closeDrawer()
  }

  render () {
    const { podcast, playSong } = this.props

    return (
      <List>
        {podcast.episodes.map(episode =>
          <ListItem
            key={episode.url}
            primaryText={episode.name}
            secondaryText={(new Date(episode.broadcastedOn)).toLocaleDateString()}
            onTouchTap={() => playSong(episode.url)}
          />
        )}
      </List>
    )
  }
}

export default connect(
  state => ({ podcast: state.podcast.podcast, status: state.podcast.status }),
  { selectPodcast, closeDrawer, playSong }
)(Podcast)
