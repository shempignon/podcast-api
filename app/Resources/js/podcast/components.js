import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPodcast } from './actions'
import { List, ListItem } from 'material-ui/List'

class Podcast extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.selectPodcast(this.props.routeParams.slug)
    }

    render() {
        return (
            <div>
                <List>
                    {(this.props.podcast.episodes.length == 0) ?
                        this.props.status :
                        this.props.podcast.episodes.map(episode =>
                        <ListItem key={episode.url}
                                  primaryText={episode.name}
                                  secondaryText={(new Date(episode.broadcastedOn)).toLocaleDateString()}
                        />
                    )}
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({ podcast: state.podcast.podcast, status: state.podcast.status }),
    { selectPodcast }
)(Podcast)
