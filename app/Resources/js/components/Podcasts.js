import React from 'react'
import { connect } from 'react-redux'
import Podcast from './Podcast'
import { fetchPodcasts } from '../actions'

const Podcasts = ({podcasts, status, fetchPodcasts}) => (
    <div>
        <button onClick={ fetchPodcasts }>Fetch</button>
        <ul>
            {podcasts.map(podcast =>
                <Podcast key={podcast.slug} {...podcast} />
            )}
        </ul>
    </div>
)

export default connect(
    state => ({ podcasts: state.podcasts.list, status: state.podcasts.list }),
    { fetchPodcasts }
)(Podcasts)
