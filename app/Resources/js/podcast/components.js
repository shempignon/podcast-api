import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPodcast } from './actions'
import { playSong } from '../player/actions'
import { PodcastList } from '../podcastList'
import { closeDrawer } from '../layout/actions'

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
      <PodcastList
        episodes={podcast.episodes}
        playSong={playSong}
      />
    )
  }
}

export default connect(
  state => ({ podcast: state.podcast.podcast, status: state.podcast.status }),
  { selectPodcast, closeDrawer, playSong }
)(Podcast)
