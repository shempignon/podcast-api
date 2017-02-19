import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPodcasts } from './actions'
import { List, ListItem } from 'material-ui/List'

class Podcasts extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchPodcasts()
    }

    render() {
        return (
            <List>
                {this.props.podcasts.map(podcast =>
                    <ListItem key={podcast.slug} primaryText={podcast.name} />
                )}
            </List>
        )
    }
}

export default connect(
    state => ({ podcasts: state.podcasts.list, status: state.podcasts.list }),
    { fetchPodcasts }
)(Podcasts)
