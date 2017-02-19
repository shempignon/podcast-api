import React from 'react'
import { connect } from 'react-redux'
import { fetchPodcasts } from './actions'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'

const Podcasts = ({podcasts, status, fetchPodcasts}) => (
    <div>
        <RaisedButton primary="true" style={{margin: 12}} onClick={ fetchPodcasts }>Fetch</RaisedButton>
        <List>
            {podcasts.map(podcast =>
                <ListItem primaryText={podcast.name} />
            )}
        </List>
    </div>
)

export default connect(
    state => ({ podcasts: state.podcasts.list, status: state.podcasts.list }),
    { fetchPodcasts }
)(Podcasts)
