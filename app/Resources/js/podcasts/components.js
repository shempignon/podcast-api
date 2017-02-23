import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchPodcasts } from './actions'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const Podcasts = ({podcasts, status, fetchPodcasts}) => {
    if (status != 'Loaded') {
        fetchPodcasts()
    }

    return (
        <List>
            <Subheader>Shows</Subheader>
            {podcasts.map(podcast =>
                <ListItem key={podcast.slug} primaryText={podcast.name} containerElement={
                    <Link to={`/podcast/${podcast.slug}`} />
                } />)}
        </List>
    )
}

export default connect(
    state => ({ podcasts: state.podcasts.list, status: state.podcasts.status }),
    { fetchPodcasts }
)(Podcasts)
