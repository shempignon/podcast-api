import React from 'react'
import { connect } from 'react-redux'
import Podcast from './Podcast'

const Podcasts = ({podcasts}) => (
    <ul>
        {podcasts.map(podcast =>
            <Podcast key={podcast.id} {...podcast} />
        )}
    </ul>
)

export default connect(
    state => ({ podcasts: state.podcasts }),
    () => {}
)(Podcasts)
