import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPodcast, updatePodcastField } from './actions'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import ActionGetApp from 'material-ui/svg-icons/action/get-app'

const AddPodcast = ({url, addPodcast, updatePodcastField}) => (
    <form onSubmit={addPodcast}>
        <TextField
            value={url}
            onChange={updatePodcastField}
            hintText="Podcast URL"
        />
        <FlatButton
            type="submit"
            icon={<ActionGetApp />}
        />
    </form>
)

export default connect(
    state => ({ url: state.addpodcast.url }),
    { addPodcast, updatePodcastField }
)(AddPodcast)
