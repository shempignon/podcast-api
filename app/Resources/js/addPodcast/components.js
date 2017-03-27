import React from 'react'
import { connect } from 'react-redux'
import { addPodcast, podcastFieldUpdated } from './actions'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import ActionGetApp from 'material-ui/svg-icons/action/get-app'

function AddPodcast({url, validationMessage, addPodcast, podcastFieldUpdated}) {
    return (
        <form onSubmit={addPodcast} style={{ display: 'flex' }}>
            <TextField
                style={{ paddingLeft: '16px' }}
                hintText="Podcast URL"
                name="url"
                value={url}
                onChange={podcastFieldUpdated}
                errorText={validationMessage}
            />
            <FlatButton
                style={{ position: 'absolute', right:'-20px', top: '4px' }}
                type="submit"
                hoverColor={'transparent'}
                icon={<ActionGetApp />}
            />
        </form>
    )
}
export default connect(
    state => ({ url: state.addpodcast.url, validationMessage: state.addpodcast.errors.join(',') }),
    { addPodcast, podcastFieldUpdated }
)(AddPodcast)
