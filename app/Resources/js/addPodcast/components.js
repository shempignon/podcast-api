import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPodcast } from './actions'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import ActionGetApp from 'material-ui/svg-icons/action/get-app'

class AddPodcast extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = e => {
        e.preventDefault()

        this.props.addPodcast(this.refs.url.getValue())
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    ref="url"
                    hintText="Podcast URL"
                />
                <FlatButton
                    type="submit"
                    icon={<ActionGetApp />}
                />
            </form>
        )
    }
}

export default connect(
    state => ({}),
    { addPodcast }
)(AddPodcast)
