import React, { Component } from 'react'
import { Link } from 'react-router'
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
                {(this.props.podcasts.length == 0) ?
                    this.props.status :
                    this.props.podcasts.map(podcast =>
                        <ListItem key={podcast.slug} primaryText={podcast.name} containerElement={
                            <Link to={`/podcast/${podcast.slug}`} />
                        } />
                    )
                }
            </List>
        )
    }
}

export default connect(
    state => ({ podcasts: state.podcasts.list, status: state.podcasts.status }),
    { fetchPodcasts }
)(Podcasts)
