import React from 'react'
import { connect } from 'react-redux'
import { addPodcast, podcastFieldUpdated } from './actions'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import ActionGetApp from 'material-ui/svg-icons/action/get-app'

const AddPodcast = ({url, validationMessage, addPodcast, podcastFieldUpdated}) => (
    <form onSubmit={addPodcast}>
        <TextField
            hintText="Podcast URL"
            name="url"
            value={url}
            onChange={podcastFieldUpdated}
            errorText={validationMessage}
        />
        <FlatButton
            type="submit"
            icon={<ActionGetApp />}
        />
    </form>
)

export default connect(
    state => ({ url: state.addpodcast.url, validationMessage: state.addpodcast.errors.join(',') }),
    { addPodcast, podcastFieldUpdated }
)(AddPodcast)
